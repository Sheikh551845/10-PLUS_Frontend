import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FadeLoader from "react-spinners/FadeLoader";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const Add_product = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();

    // Predefined dropdowns
    const [colorOptions, setColorOptions] = useState(["BLACK", "WHITE", "RED", "BLUE", "NAVY", "GREEN", "YELLOW", "ORANGE", "PURPLE", "GRAY", "BROWN", "PINK", "MAROON", "BEIGE", "CYAN"]);
    const sizeOptions = ["XS", "SM", "M", "L", "XL", "XXL", "XXXL"];
    const categoryOptions = ["Shirt", "Panjabi", "Trouser", "T-Shirt", "Polo", "Jersey"];

    const initialForm = {
        pid: "",
        Name: "",
        Category: categoryOptions[0],
        Price: "",
        Upload_on: new Date().toISOString().split("T")[0],
        Show_photo: "",
        Offer: "false",
        combo: "false",
        combo_quantity: "0",
        New_arrival: "true",
        details: {
            available_color_size: [{ color: "", size: [] }],
            Details_photo: [],
            Offer_price: "",
            Offer_percentage: "",
            description: "",   // 🔥 changed from object to string
            combo_product: ""
        }
    };

    const [form, setForm] = useState(initialForm);
    const [offerEnabled, setOfferEnabled] = useState(false);
    const [offerMode, setOfferMode] = useState("percentage"); // "percentage" or "amount"
    const [comboEnabled, setComboEnabled] = useState(false);
    const [mainUploading, setMainUploading] = useState(false);
    const [detailUploading, setDetailUploading] = useState(false);

    // Inside your component
    const [customColor, setCustomColor] = useState("");

    // Add custom color
    const handleAddCustomColor = () => {
        if (!customColor.trim()) {
            toast.error("Color name cannot be empty!");
            return;
        }
        const newColor = customColor.trim().toUpperCase();
        if (colorOptions.includes(newColor)) {
            toast.error("This color already exists!");
            return;
        }
        setColorOptions(prev => [...prev, newColor]);
        toast.success(`${newColor} added!`);
        setCustomColor("");
    };

    // Upload image to server via multer
    const uploadImageToServer = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await axiosSecure.post("/upload-image", formData);
            if (res.data.success && res.data.url) return res.data.url;
            toast.error("Image upload failed!");
            return null;
        } catch (err) {
            console.error(err);
            toast.error("Image upload error!");
            return null;
        }
    };

    // Handlers
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") setForm({ ...form, [name]: checked ? "true" : "false" });
        else setForm({ ...form, [name]: value });
    };

    // ✅ description handler
    const handleDescriptionChange = (e) => {
        setForm({
            ...form,
            details: { ...form.details, description: e.target.value }
        });
    };

    const handleOfferPercentageChange = (e) => {
        const value = e.target.value;
        setForm({
            ...form,
            details: {
                ...form.details,
                Offer_percentage: value + "%",
                Offer_price: Math.round((parseFloat(form.Price) * (parseFloat(value) || 0)) / 100).toString()
            }
        });
    };

    const handleOfferAmountChange = (e) => {
        const finalPrice = parseFloat(e.target.value) || 0;
        const originalPrice = parseFloat(form.Price) || 0;
        const discountAmount = originalPrice - finalPrice;
        const percentage = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;

        setForm({
            ...form,
            details: {
                ...form.details,
                Offer_percentage: percentage + "%",
                Offer_price: discountAmount.toString()
            }
        });
    };

    const handleColorSizeChange = (index, field, value) => {
        const updated = [...form.details.available_color_size];
        updated[index][field] = value;
        setForm({ ...form, details: { ...form.details, available_color_size: updated } });
    };

    const handleAddColorSize = () => {
        setForm({
            ...form,
            details: {
                ...form.details,
                available_color_size: [...form.details.available_color_size, { color: "", size: [] }]
            }
        });
    };

    // Multiple detail photo upload
    const handleDetailPhotoUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;


        setDetailUploading(true);

        try {
            const uploadPromises = files.map(file => uploadImageToServer(file));
            const urls = await Promise.all(uploadPromises);
            const validUrls = urls.filter(url => url !== null);

            setForm(prev => ({
                ...prev,
                details: { ...prev.details, Details_photo: [...prev.details.Details_photo, ...validUrls] }
            }));
        } catch (err) {
            console.error(err);
            toast.error("Some images failed to upload.");
        } finally {
            setDetailUploading(false);
        }
    };

    const handleRemoveDetailPhoto = (index) => {
        const updated = [...form.details.Details_photo];
        updated.splice(index, 1);
        setForm({ ...form, details: { ...form.details, Details_photo: updated } });
    };

    const handleMainPhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setMainUploading(true);
        const url = await uploadImageToServer(file);
        setMainUploading(false);
        if (url) setForm({ ...form, Show_photo: url });
    };

    // Mutation for adding
    const addMutation = useMutation({
        mutationFn: (newProduct) => axiosSecure.post("/AddProduct", newProduct),
        onSuccess: () => {
            toast.success("Product added successfully!");
            queryClient.invalidateQueries(["products"]);
            setForm(initialForm);
            setOfferEnabled(false);
            setComboEnabled(false);
        },
        onError: (error) => {
            const msg = error.response?.data?.message || "Failed to save product!";
            toast.error(msg);
        }
    });

    const handleSubmit = () => {
        if (mainUploading || detailUploading) return toast.error("Please wait until image upload completes.");
        if (!form.pid || !form.Name || !form.Price || !form.Category || !form.Show_photo) return toast.error("Please fill all required fields!");
        if (offerEnabled && !form.details.Offer_percentage) return toast.error("Please provide offer percentage!");
        if (comboEnabled && (!form.combo_quantity || !form.details.combo_product)) return toast.error("Please provide combo info!");

        const newProduct = {
            pid: form.pid,
            Name: form.Name,
            Category: form.Category,
            Price: form.Price,
            Upload_on: form.Upload_on,
            Update_on: "",
            Show_photo: form.Show_photo,
            New_arrival: "true",
            Offer: offerEnabled ? "true" : "false",
            combo: comboEnabled ? "true" : "false",
            combo_quantity: comboEnabled ? form.combo_quantity : "0",
            details: {
                available_color_size: form.details.available_color_size,
                Details_photo: form.details.Details_photo,
                Offer_price: offerEnabled ? (parseInt(form.Price) - parseInt(form.details.Offer_price)).toString() : "",
                Offer_percentage: offerEnabled ? form.details.Offer_percentage : "",
                description: form.details.description,   // ✅ now string
                combo_product: comboEnabled ? form.details.combo_product : ""
            }
        };

        addMutation.mutate(newProduct);
    };

    return (
        <div className="p-4 md:p-10">
            <Helmet><title>Add New Product</title></Helmet>
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

            <div className="space-y-6">
                {/* PID */}
                <div>
                    <label className="font-semibold">Product ID (pid):</label>
                    <input type="text" name="pid" value={form.pid} onChange={handleChange} className="input input-bordered w-full" />
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Name:</label>
                        <input type="text" name="Name" value={form.Name} onChange={handleChange} className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="font-semibold">Category:</label>
                        <select name="Category" value={form.Category} onChange={handleChange} className="select select-bordered w-full">
                            {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold">Price:</label>
                        <input type="number" name="Price" value={form.Price} onChange={handleChange} className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="font-semibold block">Upload on:</label>
                        <input type="text" value={form.Upload_on} className="input input-bordered w-full bg-gray-100 cursor-not-allowed" disabled />
                    </div>
                </div>

                {/* Main Photo */}
                <div>
                    <label className="font-semibold">Main Photo:</label>
                    <div className="flex items-center gap-4 mt-2">
                        {mainUploading ? (
                            <div className="w-24 h-24 flex justify-center items-center border">
                                <FadeLoader color="#B91C1C" />
                            </div>
                        ) : form.Show_photo ? (
                            <div className="relative">
                                <img src={form.Show_photo} className="w-24 h-24 object-cover border" />
                                <button type="button" onClick={() => setForm({ ...form, Show_photo: "" })} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                            </div>
                        ) : (
                            <input type="file" onChange={handleMainPhotoUpload} className="file-input file-input-bordered" />
                        )}
                    </div>
                </div>

                {/* Offer & Combo */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={offerEnabled} onChange={e => { setOfferEnabled(e.target.checked); handleChange({ target: { name: "Offer", checked: e.target.checked } }); }} /> Offer
                        </label>
                        {offerEnabled && (
                            <div className="mt-2 space-y-2">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setOfferMode("percentage")}
                                        className={`btn btn-xs ${offerMode === 'percentage' ? 'btn-primary' : 'btn-outline'}`}
                                    >
                                        Percentage (%)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOfferMode("amount")}
                                        className={`btn btn-xs ${offerMode === 'amount' ? 'btn-primary' : 'btn-outline'}`}
                                    >
                                        Direct Price (৳)
                                    </button>
                                </div>
                                {offerMode === "percentage" ? (
                                    <input
                                        type="number"
                                        placeholder="Offer %"
                                        value={parseInt(form.details.Offer_percentage) || ""}
                                        onChange={handleOfferPercentageChange}
                                        className="input input-bordered w-full mt-2"
                                    />
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Final Offer Price"
                                        value={parseFloat(form.Price) - parseFloat(form.details.Offer_price) || ""}
                                        onChange={handleOfferAmountChange}
                                        className="input input-bordered w-full mt-2"
                                    />
                                )}
                                {form.details.Offer_percentage && (
                                    <p className="text-xs text-blue-600">
                                        Calculated: {offerMode === 'percentage'
                                            ? `Final Price: ${parseFloat(form.Price) - parseFloat(form.details.Offer_price) || 0}৳`
                                            : `Discount: ${form.details.Offer_percentage}`}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={comboEnabled} onChange={e => { setComboEnabled(e.target.checked); handleChange({ target: { name: "combo", checked: e.target.checked } }); }} /> Combo
                        </label>
                        {comboEnabled && (
                            <>
                                <input type="number" name="combo_quantity" value={form.combo_quantity} onChange={handleChange} className="input input-bordered w-full mt-2" placeholder="Combo Quantity" />
                                <input type="text" name="combo_product" value={form.details.combo_product} onChange={e => setForm({ ...form, details: { ...form.details, combo_product: e.target.value } })} className="input input-bordered w-full mt-2" placeholder="Combo Product" />
                            </>
                        )}
                    </div>
                </div>

                {/* Colors & Sizes */}
                <div>
                    <label className="font-semibold">Available Colors & Sizes:</label>
                    {form.details.available_color_size.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-2 mt-2 items-start md:items-center">
                            {/* Color Buttons */}
                            <div className="flex gap-1 flex-wrap">
                                {colorOptions.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        className={`px-2 py-1 border rounded ${item.color === c ? "bg-blue-500 text-white" : ""}`}
                                        onClick={() => handleColorSizeChange(index, "color", c)}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>

                            {/* Size Buttons */}
                            <div className="flex gap-1 flex-wrap mt-2 md:mt-0">
                                {sizeOptions.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`px-2 py-1 border rounded ${item.size.includes(s) ? "bg-green-500 text-white" : ""}`}
                                        onClick={() => {
                                            const newSizes = item.size.includes(s)
                                                ? item.size.filter((sz) => sz !== s)
                                                : [...item.size, s];
                                            handleColorSizeChange(index, "size", newSizes);
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Add color-size row */}
                    <button onClick={handleAddColorSize} className="btn btn-sm mt-2">
                        + Add Color/Size
                    </button>

                    {/* Custom Color Input */}
                    <div className="flex gap-2 items-center mt-4">
                        <input
                            type="text"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            placeholder="Enter new color"
                            className="input input-bordered w-full"
                        />
                        <button onClick={handleAddCustomColor} className="btn btn-outline">
                            Add Color
                        </button>
                    </div>
                </div>

                {/* Details Photos */}
                <div>
                    <label className="font-semibold">Details Photos (Optional, Max 4):</label>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {form.details.Details_photo.map((url, i) => (
                            <div key={i} className="relative">
                                <img src={url} className="w-20 h-20 object-cover border" />
                                <button onClick={() => handleRemoveDetailPhoto(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                            </div>
                        ))}
                        {form.details.Details_photo.length < 4 && (
                            detailUploading ? <div className="w-20 h-20 flex justify-center items-center border"><FadeLoader color="#B91C1C" height={10} width={2} radius={2} margin={1} /></div> :
                                <input type="file" multiple onChange={handleDetailPhotoUpload} className="file-input file-input-bordered" />
                        )}
                    </div>
                </div>

                {/* ✅ New Description */}
                <div>
                    <label className="font-semibold">Description:</label>
                    <textarea
                        name="description"
                        value={form.details.description}
                        onChange={handleDescriptionChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter product description..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary w-full flex justify-center items-center gap-2"
                    disabled={mainUploading || detailUploading || addMutation.isLoading}
                >
                    {addMutation.isLoading ? (
                        <>
                            <FadeLoader color="#fff" height={8} width={2} radius={2} margin={1} />
                            <span>Adding...</span>
                        </>
                    ) : (
                        "Add Product"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Add_product;

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
    const colorOptions = ["BLACK", "WHITE", "RED", "BLUE", "NAVY", "GREEN", "YELLOW", "ORANGE", "PURPLE", "GRAY", "BROWN", "PINK", "MAROON", "BEIGE", "CYAN"];
    const sizeOptions = ["XS", "SM", "M", "L", "XL", "XXL", "XXXL"];
    const categoryOptions = ["Shirt", "Panjabi", "Trouser", "T-Shirt", "Polo"];
    const materialOptions = ["Cotton", "Polyester", "Linen", "Silk", "Wool"];
    const gsmOptions = ["120gsm", "140gsm", "160gsm", "180gsm", "200gsm"];
    const fitOptions = ["Regular", "Slim", "Loose"];

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
            description: { Material: materialOptions[0], GSM: gsmOptions[0], Fit: fitOptions[0], Care_instructions: "" },
            combo_product: ""
        }
    };

    const [form, setForm] = useState(initialForm);
    const [offerEnabled, setOfferEnabled] = useState(false);
    const [comboEnabled, setComboEnabled] = useState(false);
    const [mainUploading, setMainUploading] = useState(false);
    const [detailUploading, setDetailUploading] = useState(false);

    // Upload image helper


    const uploadImageToCloudinary = async (file) => {
        const cloudName = "djbjwoyza"; // your cloud name
        const unsignedPreset = "10_plus_fashion"; // your unsigned preset name

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", unsignedPreset);

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            if (data.secure_url) return data.secure_url;

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

    const handleDetailsChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            details: { ...form.details, description: { ...form.details.description, [name]: value } }
        });
    };

    const handleOfferPercentageChange = (e) => {
        const value = e.target.value;
        setForm({
            ...form,
            details: { ...form.details, Offer_percentage: value + "%", Offer_price: Math.round((parseFloat(form.Price) * value) / 100) }
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
            details: { ...form.details, available_color_size: [...form.details.available_color_size, { color: "", size: [] }] }
        });
    };

    // Multiple detail photo upload
    const handleDetailPhotoUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        // Don't allow more than 4 photos
        if (form.details.Details_photo.length + files.length > 4) {
            toast.error("Maximum 4 details photos allowed!");
            return;
        }

        setDetailUploading(true);

        try {
            const uploadPromises = files.map(file => uploadImageToCloudinary(file));
            const urls = await Promise.all(uploadPromises);

            const validUrls = urls.filter(url => url !== null);

            setForm(prev => ({
                ...prev,
                details: {
                    ...prev.details,
                    Details_photo: [...prev.details.Details_photo, ...validUrls]
                }
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
        const url = await uploadImageToCloudinary(file);
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
        if (form.details.Details_photo.length < 4) return toast.error("Please upload 4 details photos.");
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
                description: form.details.description,
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
                        {offerEnabled && <input type="number" placeholder="Offer %" value={parseInt(form.details.Offer_percentage)} onChange={handleOfferPercentageChange} className="input input-bordered w-full mt-2" />}
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
                            <div className="flex gap-1 flex-wrap">
                                {colorOptions.map(c => (
                                    <button key={c} type="button" className={`px-2 py-1 border rounded ${item.color === c ? "bg-blue-500 text-white" : ""}`} onClick={() => handleColorSizeChange(index, "color", c)}>{c}</button>
                                ))}
                            </div>
                            <div className="flex gap-1 flex-wrap mt-2 md:mt-0">
                                {sizeOptions.map(s => (
                                    <button key={s} type="button" className={`px-2 py-1 border rounded ${item.size.includes(s) ? "bg-green-500 text-white" : ""}`} onClick={() => handleColorSizeChange(index, "size", item.size.includes(s) ? item.size.filter(sz => sz !== s) : [...item.size, s])}>{s}</button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddColorSize} className="btn btn-sm mt-2">Add Color/Size</button>
                </div>

                {/* Details Photos */}
                <div>
                    <label className="font-semibold">Details Photos (1-4):</label>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {form.details.Details_photo.map((url, i) => (
                            <div key={i} className="relative">
                                <img src={url} className="w-20 h-20 object-cover border" />
                                <button onClick={() => handleRemoveDetailPhoto(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                            </div>
                        ))}
                        {form.details.Details_photo.length < 4 && (
                            detailUploading ? <div className="w-20 h-20 flex justify-center items-center border"><FadeLoader color="#B91C1C" height={10} width={2} radius={2} margin={1} /></div> :
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleDetailPhotoUpload}
                                    className="file-input file-input-bordered"
                                />

                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <label className="font-semibold">Material:</label>
                        <select name="Material" value={form.details.description.Material} onChange={handleDetailsChange} className="select select-bordered w-full">{materialOptions.map(m => <option key={m} value={m}>{m}</option>)}</select>
                    </div>
                    <div>
                        <label className="font-semibold">GSM:</label>
                        <select name="GSM" value={form.details.description.GSM} onChange={handleDetailsChange} className="select select-bordered w-full">{gsmOptions.map(g => <option key={g} value={g}>{g}</option>)}</select>
                    </div>
                    <div>
                        <label className="font-semibold">Fit:</label>
                        <select name="Fit" value={form.details.description.Fit} onChange={handleDetailsChange} className="select select-bordered w-full">{fitOptions.map(f => <option key={f} value={f}>{f}</option>)}</select>
                    </div>
                    <div className="md:col-span-3">
                        <label className="font-semibold">Care Instructions:</label>
                        <textarea name="Care_instructions" value={form.details.description.Care_instructions} onChange={handleDetailsChange} className="textarea textarea-bordered w-full" />
                    </div>
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

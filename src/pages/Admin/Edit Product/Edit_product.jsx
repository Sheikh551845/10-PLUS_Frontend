import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FadeLoader from "react-spinners/FadeLoader";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useLoaderData } from "react-router-dom";

const Edit_product = () => {
    const productData = useLoaderData();
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();

    // Predefined dropdowns
    const colorOptions = ["BLACK","WHITE","RED","BLUE","NAVY","GREEN","YELLOW","ORANGE","PURPLE","GRAY","BROWN","PINK","MAROON","BEIGE","CYAN"];
    const sizeOptions = ["XS","SM","M","L","XL","XXL","XXXL"];

    const [form, setForm] = useState({...productData});
    const [offerEnabled, setOfferEnabled] = useState(form.Offer === "true");
    const [comboEnabled, setComboEnabled] = useState(form.combo === "true");
    const [mainUploading, setMainUploading] = useState(false);
    const [detailUploading, setDetailUploading] = useState(false);
    const [customColor, setCustomColor] = useState("");

    // Add custom color
    const handleAddCustomColor = () => {
        if (!customColor.trim()) return toast.error("Color name cannot be empty!");
        const newColor = customColor.trim().toUpperCase();
        if (colorOptions.includes(newColor)) return toast.error("This color already exists!");
        colorOptions.push(newColor);
        toast.success(`${newColor} added!`);
        setCustomColor("");
    };

    // Image upload helper
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "10_plus_fashion");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/djbjwoyza/image/upload", {
                method: "POST",
                body: formData
            });
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
        if (type === "checkbox") setForm({...form, [name]: checked ? "true" : "false"});
        else setForm({...form, [name]: value});
    };

    const handleDescriptionChange = (e) => {
        setForm({...form, details: {...form.details, description: e.target.value}});
    };

    const handleOfferPercentageChange = (e) => {
        const value = e.target.value;
        setForm({
            ...form,
            details: {
                ...form.details,
                Offer_percentage: value + "%",
                Offer_price: Math.round((parseFloat(form.Price) * value) / 100)
            }
        });
    };

    const handleColorSizeChange = (index, field, value) => {
        const updated = [...form.details.available_color_size];
        updated[index][field] = value;
        setForm({...form, details: {...form.details, available_color_size: updated}});
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

    const handleDetailPhotoAdd = (url) => {
        if (form.details.Details_photo.length >= 4) return toast.error("Maximum 4 details photos allowed!");
        setForm({...form, details: {...form.details, Details_photo: [...form.details.Details_photo, url]}});
    };

    const handleRemoveDetailPhoto = (index) => {
        if (form.details.Details_photo.length <= 1) return toast.error("At least 1 details photo is required!");
        const updated = [...form.details.Details_photo];
        updated.splice(index, 1);
        setForm({...form, details: {...form.details, Details_photo: updated}});
    };

    const handleMainPhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setMainUploading(true);
        const url = await uploadImageToCloudinary(file);
        setMainUploading(false);
        if (url) setForm({...form, Show_photo: url});
    };

    const handleDetailPhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setDetailUploading(true);
        const url = await uploadImageToCloudinary(file);
        setDetailUploading(false);
        if (url) handleDetailPhotoAdd(url);
    };

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: (updatedData) => axiosSecure.patch(`/UpdateProduct/${form._id}`, updatedData),
        onSuccess: () => {
            toast.success("Product updated successfully!");
            queryClient.invalidateQueries(["products"]);
        },
        onError: () => toast.error("Failed to update product!")
    });

    const handleSubmit = () => {
        if (mainUploading || detailUploading) return toast.error("Please wait until image upload completes.");
        if (form.details.Details_photo.length < 4) return toast.error("Please upload 4 details photos.");
        if (offerEnabled && !form.details.Offer_percentage) return toast.error("Please provide offer percentage!");
        if (comboEnabled && (!form.combo_quantity || !form.details.combo_product)) return toast.error("Please provide combo info!");

        const updatedData = {
            pid: form.pid,
            Name: form.Name,
            Category: form.Category,
            Price: form.Price,
            Upload_on: form.Upload_on,
            Update_on: new Date().toISOString().split("T")[0],
            Show_photo: form.Show_photo,
            Offer: offerEnabled ? "true" : "false",
            combo: comboEnabled ? "true" : "false",
            combo_quantity: comboEnabled ? form.combo_quantity : "0",
            details: {
                available_color_size: form.details.available_color_size,
                Details_photo: form.details.Details_photo,
                Offer_price: offerEnabled ? (parseInt(form.Price) - parseInt(form.details.Offer_price)).toString() : "",
                Offer_percentage: offerEnabled ? form.details.Offer_percentage : "",
                description: form.details.description || "",
                combo_product: comboEnabled ? form.details.combo_product : ""
            }
        };

        updateMutation.mutate(updatedData);
    };

    return (
        <div className="p-4 md:p-10">
            <Helmet><title>Edit Product - {form.Name}</title></Helmet>
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

            <div className="space-y-6">
                {/* Product ID */}
                <div>
                    <label className="font-semibold">Product ID (pid):</label>
                    <input type="text" name="pid" value={form.pid} onChange={handleChange} className="input input-bordered w-full" disabled />
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Name:</label>
                        <input type="text" name="Name" value={form.Name} onChange={handleChange} className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="font-semibold">Category:</label>
                        <input type="text" name="Category" value={form.Category} onChange={handleChange} className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="font-semibold">Price:</label>
                        <input type="number" name="Price" value={form.Price} onChange={handleChange} className="input input-bordered w-full" />
                    </div>
                </div>

                {/* Main Photo */}
                <div>
                    <label className="font-semibold">Main Photo:</label>
                    <div className="flex items-center gap-4 mt-2">
                        {mainUploading ? (
                            <div className="w-24 h-24 flex justify-center items-center border"><FadeLoader color="#B91C1C" /></div>
                        ) : form.Show_photo ? (
                            <div className="relative">
                                <img src={form.Show_photo} alt="Show_photo" className="w-24 h-24 object-cover border" />
                                <button onClick={() => setForm({...form, Show_photo: ""})} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
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
                            <input type="checkbox" checked={offerEnabled} onChange={(e) => {setOfferEnabled(e.target.checked); handleChange({target:{name:"Offer",checked:e.target.checked}})}} /> Offer
                        </label>
                        {offerEnabled && <input type="number" placeholder="Offer %" value={parseInt(form.details.Offer_percentage)} onChange={handleOfferPercentageChange} className="input input-bordered w-full mt-2" />}
                    </div>

                    <div>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={comboEnabled} onChange={(e) => {setComboEnabled(e.target.checked); handleChange({target:{name:"combo",checked:e.target.checked}})}} /> Combo
                        </label>
                        {comboEnabled && (
                            <>
                                <input type="number" name="combo_quantity" value={form.combo_quantity} onChange={handleChange} className="input input-bordered w-full mt-2" placeholder="Combo Quantity" />
                                <input type="text" name="combo_product" value={form.details.combo_product || ""} onChange={(e)=>setForm({...form, details:{...form.details, combo_product:e.target.value}})} className="input input-bordered w-full mt-2" placeholder="Combo Product" />
                            </>
                        )}
                    </div>
                </div>

                {/* Colors & Sizes */}
                <div>
                    <label className="font-semibold">Available Colors & Sizes:</label>
                    {form.details.available_color_size.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-2 mt-2 items-start md:items-center">
                            <div className="flex gap-1 flex-wrap">{colorOptions.map(c=>(
                                <button key={c} type="button" className={`px-2 py-1 border rounded ${item.color===c?"bg-blue-500 text-white":""}`} onClick={()=>handleColorSizeChange(index,"color",c)}>{c}</button>
                            ))}</div>
                            <div className="flex gap-1 flex-wrap mt-2 md:mt-0">{sizeOptions.map(s=>(
                                <button key={s} type="button" className={`px-2 py-1 border rounded ${item.size.includes(s)?"bg-green-500 text-white":""}`} onClick={()=>{
                                    const newSizes = item.size.includes(s)? item.size.filter(sz=>sz!==s): [...item.size,s];
                                    handleColorSizeChange(index,"size",newSizes);
                                }}>{s}</button>
                            ))}</div>
                        </div>
                    ))}
                    <button onClick={handleAddColorSize} className="btn btn-sm mt-2">+ Add Color/Size</button>

                    {/* Custom Color */}
                    <div className="flex gap-2 items-center mt-4">
                        <input type="text" value={customColor} onChange={e=>setCustomColor(e.target.value)} placeholder="Enter new color" className="input input-bordered w-full"/>
                        <button onClick={handleAddCustomColor} className="btn btn-outline">Add Color</button>
                    </div>
                </div>

                {/* Detail Photos */}
                <div>
                    <label className="font-semibold">Details Photos (1-4):</label>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {form.details.Details_photo.map((url,i)=>(
                            <div key={i} className="relative">
                                <img src={url} className="w-20 h-20 object-cover border"/>
                                <button onClick={()=>handleRemoveDetailPhoto(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                            </div>
                        ))}
                        {form.details.Details_photo.length<4 && (
                            detailUploading ? <div className="w-20 h-20 flex justify-center items-center border"><FadeLoader color="#B91C1C" height={10} width={2} radius={2} margin={1} /></div> :
                            <input type="file" onChange={handleDetailPhotoUpload} className="file-input file-input-bordered"/>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="font-semibold">Description:</label>
                    <textarea name="description" value={form.details.description || ""} onChange={handleDescriptionChange} className="textarea textarea-bordered w-full" placeholder="Enter product description..." />
                </div>

                {/* Update Button */}
                <button onClick={handleSubmit} className="btn btn-primary w-full mt-6 flex justify-center items-center gap-2" disabled={mainUploading || detailUploading || updateMutation.isLoading}>
                    {updateMutation.isLoading ? <><FadeLoader color="#fff" height={10} width={2} radius={2} margin={1}/> Updating...</> : "Update Product"}
                </button>
            </div>
        </div>
    );
};

export default Edit_product;

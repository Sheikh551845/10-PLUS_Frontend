import React, { useEffect, useState } from "react";
import { axiosSecure } from "../../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

const BannerManage = () => {
  const [bannerPhotos, setBannerPhotos] = useState([]); // old banners {_id, img}
  const [loading, setLoading] = useState(false);

  // Load existing banners
  useEffect(() => {
    axiosSecure.get("/Banner")
      .then(res => setBannerPhotos(res.data))
      .catch(() => toast.error("Failed to load banners"));
  }, []);

  // Upload image to server via multer
  const uploadToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axiosSecure.post("/upload-image", formData);
      if (res.data.success && res.data.url) return res.data.url;
      return null;
    } catch (err) {
      console.error("Image upload error:", err);
      return null;
    }
  };


  // Handle new photo selection
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (bannerPhotos.length + files.length > 6) {
      return toast.error("You can only keep 6 banners");
    }

    setLoading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const url = await uploadToServer(file);
        uploaded.push({ img: url });
      }

      // Send to backend
      const res = await axiosSecure.post("/bannerUp", {
        banners: uploaded,
      });

      setBannerPhotos(prev => [...prev, ...res.data]); // backend returns saved banners with _id
      toast.success("Banners uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    }
    setLoading(false);
  };

  // Remove old banner photo
  const handleRemoveOld = async (id) => {
    try {
      await axiosSecure.delete(`/bannerDetele/${id}`);
      setBannerPhotos(prev => prev.filter(photo => photo._id !== id));
      toast.success("Banner removed");
    } catch {
      toast.error("Failed to remove banner");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Banner Photos</h2>
      <p className="text-sm text-gray-500 mb-4">
        Suggested size: 1200x400px | Format: JPG/PNG | Max 6 banners
      </p>

      {/* Existing Banners */}
      <h3 className="font-semibold mb-2">Current Banners</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {bannerPhotos.map((photo) => (
          <div key={photo._id} className="relative">
            <img src={photo.img} alt="banner" className="rounded-lg shadow-md" />
            <button
              onClick={() => handleRemoveOld(photo._id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Upload New Photos */}
      {bannerPhotos.length < 6 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Add New Banners</h3>
          {loading ? <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered"
            disabled
          /> : <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered"
          />}

        </div>
      )}

      {/* Spinner */}
      {loading && <div><FadeLoader color="#fff" height={8} width={2} radius={2} margin={1} />
        <span>Uploading...</span></div>}
    </div>
  );
};

export default BannerManage;

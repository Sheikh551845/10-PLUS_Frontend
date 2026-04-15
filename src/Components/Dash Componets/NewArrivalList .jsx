import React, { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const NewArrivalList = ({ products }) => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  // ✅ Local state for filtering after mutation
  const [localProducts, setLocalProducts] = useState(products || []);

  const removeNewMutation = useMutation({
    mutationFn: async (product) => {
      const updatedProduct = { ...product, New_arrival: "false" };
      await axiosSecure.patch(`/UpdateProduct/${product._id}`, updatedProduct);
    },
    onSuccess: (_, product) => {
      // ✅ remove from localProducts instantly
      setLocalProducts((prev) =>
        prev.filter((p) => p._id !== product._id)
      );

      Swal.fire("Updated!", "Product removed from New Arrivals.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update product.", "error");
    },
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 20;

  // ✅ Filter + Sort + Search (applied on localProducts instead of props)
  const filtered = useMemo(() => {
    let data = [...(localProducts || [])];

    if (search) {
      data = data.filter(
        (p) =>
          p.pid?.toLowerCase().includes(search.toLowerCase()) ||
          p.Name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      data.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
    } else if (sort === "high") {
      data.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
    } else if (sort === "date") {
      data.sort(
        (a, b) =>
          new Date(b.Upload_on).getTime() - new Date(a.Upload_on).getTime()
      );
    }

    return data;
  }, [localProducts, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleRemoveNew = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will no longer be marked as New Arrival!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) removeNewMutation.mutate(product);
    });
  };

  if (!localProducts || localProducts.length === 0)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-xl font-bold text-red-500">No New Arrivals!</p>
      </div>
    );

  return (
    <div className="w-[80vw] md:w-[85vw] mx-auto">
      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by PID or Name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="input input-bordered w-52"
        />

        <select
          className="select select-bordered w-40"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="date">Upload Date</option>
        </select>
      </div>

      {/* Cards (MOBILE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {paginated.map((p) => (
          <div
            key={p._id}
            className="card bg-gray-50 shadow-md border rounded w-[68vw] mx-auto"
          >
            <figure className="px-4 pt-4">
              <img
                src={p.Show_photo}
                alt={p.Name}
                className="rounded h-40 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg">{p.Name}</h2>
              <p className="text-sm">PID: {p.pid}</p>
              <p className="text-sm">Category: {p.Category}</p>
              <p className="font-semibold">{p.Price}৳</p>
              {p?.details?.Offer_price && p?.details?.Offer_percentage && (
                <p className="text-sm">
                  Offer Price: {p.details.Offer_price}৳ |{" "}
                  {p.details.Offer_percentage}
                </p>
              )}
              <p className="text-xs text-gray-500">Uploaded: {p.Upload_on}</p>
              <p className="text-xs">
                Colors: {p.details?.available_color_size?.map((c) => c.color).join(", ")}
              </p>
              <p className="text-xs">
                Sizes:{" "}
                {p.details?.available_color_size
                  ?.map((c) => c.size.join(","))
                  .join(" | ")}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/admin/Edit_Product/${p._id}`)}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveNew(p)}
                  className="btn btn-sm btn-warning"
                >
                  Remove New
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table (DESKTOP) */}
      <div className="overflow-x-auto hidden lg:block mt-8 w-[85vw]">
        <table className="table w-[85vw] border mx-auto">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th>Photo</th>
              <th>PID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Offer</th>
              <th>Colors</th>
              <th>Sizes</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={p.Show_photo}
                    alt={p.Name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td>{p.pid}</td>
                <td>{p.Name}</td>
                <td>{p.Category}</td>
                <td>{p.Price}৳</td>
                <td>
                  {p?.details?.Offer_price && p?.details?.Offer_percentage
                    ? `${p.details.Offer_price}৳ | ${p.details.Offer_percentage}`
                    : "—"}
                </td>
                <td>{p.details?.available_color_size?.map((c) => c.color).join(", ")}</td>
                <td>
                  {p.details?.available_color_size
                    ?.map((c) => c.size.join(","))
                    .join(" | ")}
                </td>
                <td>{p.Upload_on}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/Edit_Product/${p._id}`)}
                    className="btn btn-xs btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveNew(p)}
                    className="btn btn-xs btn-warning"
                  >
                    Remove New
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 w-fit mx-auto">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span className="btn btn-sm btn-ghost">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewArrivalList;

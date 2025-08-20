import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FadeLoader } from "react-spinners"; // Make sure you installed react-spinners

const TabProduct = ({ Category }) => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Fetch products
  const { data: products = [], isLoading, isFetching, error } = useQuery({
    queryKey: [`${Category}`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Category/${Category}`);
      return res.data;
    },
  });

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/Detele/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${Category}`]);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete product.", "error");
    },
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // ✅ Filter + Sort + Search
  const filtered = useMemo(() => {
    let data = [...(products || [])];

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
  }, [products, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  // ✅ Loader or empty state
  if (isLoading || isFetching)
    return (
                  <div className="flex justify-center items-center h-[80vh] w-[80vw]">
                    <FadeLoader color="rgba(185,28,28,0.7)" size={15} />
                  </div>
    );

  if (!products || products.length === 0)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-xl font-bold text-red-500">
          No Available {Category}
        </p>
      </div>
    );

  return (
    <div className="w-[80vw] mx-auto ">
      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        <div className="relative w-full md:w-1/2">
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
        </div>

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

      {/* Cards (MOBILE ONLY) */}
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
              <p className="text-xs text-gray-500">Uploaded: {p.Upload_on}</p>
              <p className="text-xs">
                Colors: {p.details?.available_color_size?.map(c => c.color).join(", ")}
              </p>
              <p className="text-xs">
                Sizes: {p.details?.available_color_size
                  ?.map(c => c.size.join(",")) // sizes per color
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
                  onClick={() => handleDelete(p._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table (DESKTOP ONLY) */}
      <div className="overflow-x-auto hidden lg:block mt-8 w-[85vw]">
        <table className="table w-[80vw] border mx-auto">
          <thead>
            <tr className="bg-gray-100">
              <th>Photo</th>
              <th>PID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
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
                  {p.details?.available_color_size
                    ?.map(c => c.color)
                    .join(", ")}
                </td>
                <td>
                  {p.details?.available_color_size
                    ?.map(c => c.size.join(",")) // sizes per color
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
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
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

export default TabProduct;

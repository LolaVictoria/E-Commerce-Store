import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";
import { NIGERIAN_STATES } from "../../constants/NigerianStates";
import { createSellerProfile } from "../../services/sellerApi";

const SellerProfileForm = () => {
  const navigate = useNavigate();

  const { setRole } = useAuth();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    businessDescription: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

   const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await createSellerProfile(form);

            localStorage.setItem("token", response.token);
            localStorage.setItem("role", "SELLER");

            setRole("SELLER");

            toast.success("Seller profile created successfully!");

            navigate("/seller-dashboard");
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ??
                "Unable to create seller profile."
            );
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8">
        Become a Seller
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          required
          name="businessName"
          placeholder="Business Name"
          value={form.businessName}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <textarea
          name="businessDescription"
          placeholder="Business Description"
          value={form.businessDescription}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <input
          name="address"
          placeholder="Business Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className="w-full border rounded p-3"
        >
          <option value="">
            Select State
          </option>

          {NIGERIAN_STATES.map((state) => (
            <option
              key={state}
              value={state}
            >
              {state.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        <button
            disabled={loading}
            className="bg-[#2ECF5A] text-black px-6 py-3 rounded w-full">
            {loading ? "Creating..." : "Become a Seller"}
        </button>
      </form>
    </div>
  );
};

export default SellerProfileForm;

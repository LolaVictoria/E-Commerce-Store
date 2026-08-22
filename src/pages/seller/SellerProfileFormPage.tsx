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

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label htmlFor="businessName" className="block text-sm font-medium mb-2">
            Business Name
          </label>
          <input
            id="businessName"
            required
            name="businessName"
            placeholder="e.g. Dami's Fashion Store"
            value={form.businessName}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label htmlFor="businessDescription" className="block text-sm font-medium mb-2">
            Business Description
          </label>
          <textarea
            id="businessDescription"
            name="businessDescription"
            placeholder="Tell customers a little about your business"
            value={form.businessDescription}
            onChange={handleChange}
            className="w-full border rounded p-3"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="e.g. 08012345678"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Business Address
          </label>
          <input
            id="address"
            name="address"
            placeholder="e.g. 12 Allen Avenue"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-2">
            City
          </label>
          <input
            id="city"
            name="city"
            placeholder="e.g. Lagos"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-2">
            State
          </label>
          <select
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          >
            <option value="">Select your state</option>

            {NIGERIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#2ECF5A] text-black px-6 py-3 rounded w-full"
        >
          {loading ? "Creating..." : "Become a Seller"}
        </button>

      </form>
    </div>
  );
};

export default SellerProfileForm;

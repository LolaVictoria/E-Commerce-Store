import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getMySellerProfile,
    updateSellerProfile,
    deleteSellerProfile,
} from "../../services/sellerApi";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const SellerProfile = () => {
    const navigate = useNavigate();
    

    const { setRole } = useAuth();

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [profile, setProfile] = useState({
        businessName: "",
        businessDescription: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getMySellerProfile();

            setProfile(data);
        } catch (err: any) {
            toast.error("Unable to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            await updateSellerProfile(profile);

            toast.success("Profile updated");

            setEditing(false);
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ??
                "Unable to update profile"
            );
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete seller profile?"))
            return;

        try {
            await deleteSellerProfile();

            localStorage.setItem("role", "USER");

            setRole("USER");

            toast.success("Seller profile deleted");

            navigate("/");
        } catch {
            toast.error("Unable to delete profile");
        }
    };

    if (loading)
        return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Seller Profile
            </h1>

            <div className="space-y-5">

                <input
                    name="businessName"
                    value={profile.businessName}
                    onChange={handleChange}
                    readOnly={!editing}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="businessDescription"
                    value={profile.businessDescription}
                    onChange={handleChange}
                    readOnly={!editing}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    readOnly={!editing}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    readOnly={!editing}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    readOnly={!editing}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="state"
                    value={profile.state}
                    readOnly
                    className="w-full border p-3 rounded bg-gray-100"
                />

                <div className="flex gap-4">

                    {!editing ? (
                        <>
                            <button
                                onClick={() => setEditing(true)}
                                className="bg-[#2ECF5A] px-6 py-3 rounded"
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-6 py-3 rounded"
                            >
                                Delete Profile
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleUpdate}
                            className="bg-[#2ECF5A] px-6 py-3 rounded"
                        >
                            Save Changes
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
};

export default SellerProfile;

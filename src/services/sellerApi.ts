import { SellerProfileRequest } from "../types/seller";
import api from "./api";

export const createSellerProfile = async (data: SellerProfileRequest) => {
    const response = await api.post("/seller-profile", data);
    return response.data;
};

export const getMySellerProfile = async () => {
    const response = await api.get("/seller-profile/me");
    return response.data;
};

export const updateSellerProfile = async (data: SellerProfileRequest) => {
    const response = await api.put("/seller-profile", data);
    return response.data;
};

export const deleteSellerProfile = async () => {
    await api.delete("/seller-profile");
};
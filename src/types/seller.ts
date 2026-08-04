export interface SellerProfileRequest {
    businessName: string;
    businessDescription: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
}

export interface SellerProfileResponse {
    id: number;
    businessName: string;
    businessDescription: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
}
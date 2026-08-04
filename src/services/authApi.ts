import { LoginRequest, LoginResponse, RegisterRequest} from "../types/auth";
import api from "./api";

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", data);

    return response.data;
};

export const Register = async (
    data: RegisterRequest
): Promise<LoginResponse> => {
    const response = await api.post("/auth/register", data);

    return response.data;
};
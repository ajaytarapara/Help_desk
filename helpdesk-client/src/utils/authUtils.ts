import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  exp?: number;
  sub?: string;
  email?: string;
  UserId?: string;
  FullName?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export const getToken = (): string | null => localStorage.getItem("token");

export const getUserRole = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return role || null;
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) return true;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};

export const getUserName = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const FullName = decoded.FullName;

    return FullName || null;
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
};

export const getUserId = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const UserId = decoded.UserId;

    return UserId || null;
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
};

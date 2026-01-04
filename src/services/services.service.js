"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getSingleService = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/services/${id}`, {
      cache: "no-store"
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return { success: false, data: null };
  }
};

export const getAllServices = async (searchParams = {}) => {
  try {
    const getParams = new URLSearchParams(searchParams).toString();
    const res = await fetch(
      `${API_URL}/api/services${getParams ? "?" + getParams : ""}`,
      { cache: "no-store" }
    );
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return { success: false, data: [] };
  }
};

import { LoginFormData, RegisterFormValues } from "@/schemas/auth.schemas";

export async function registerUser(data: RegisterFormValues) {
  const { terms, ...apiData } = data;
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      },
    );
    const responseData = await response.json();
    return responseData;
    
  } catch (error) {
    console.error("Register Error:", error);
    return { message: "Network error. Please check your internet connection." };
  }
}

export async function loginUser(data: LoginFormData) {
  const { rememberMe, ...apiData } = data;
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      },
    );
    const responseData = await response.json();
    return responseData;
    
  } catch (error) {
    console.error("Login Error:", error);
    return { message: "Network error. Please check your internet connection." };
  }
}
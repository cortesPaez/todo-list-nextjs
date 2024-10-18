"use client"

interface Body {
  email: string,
  password: string;
}

const login = async (body: Body) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    sessionStorage.setItem("token", result.token)
    return result
  } catch (error) {
    console.error("Error:", error);
  }
};

const register = async (body: Body) => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AuthService = {
  login,
  register
};

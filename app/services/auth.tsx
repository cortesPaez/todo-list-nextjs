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

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const result = await response.json();
    sessionStorage.setItem("token", result.token)
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

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AuthService = {
  login,
  register
};

"use client";

import React, { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import Form from "./components/Form";
import { AuthService } from "../services/auth";
import { useRouter } from "next/navigation";

interface Body {
  email: string;
  password: string;
}

const defaultAuthState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const [formAuth, setFormAuth] = useState<Body>(defaultAuthState);
  const [formType, setTypeForm] = useState<string>("login");
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormAuth({
      ...formAuth,
      [name]: value,
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formAuth.email || !formAuth.password) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (!emailPattern.test(formAuth.email)) {
      setError("El formato del email es incorrecto.");
      return;
    }

    setError("");

    if (formType === "login") {
      const response = await AuthService.login(formAuth);
      console.log(response)
      if (response.message === "invalid password") return setError("Contraseña invalida");
      if (response.message === "user not found") return setError("El usuario no existe");
      if (response.message === "successful") {
        setError("")
        router.push("/tasks");
      }
    }

    if (formType === "register") {
      const response = await AuthService.register(formAuth);
      if (response.message === "email already exist") return setError("El usuario ya existe");
      if (response.message === "successful") {
        setError("")
        setTypeForm("login");
        setFormAuth({...formAuth, password: ""})
      }
    }
  };

  return (
    <>
      <Form
        title={
          formType === "login"
            ? "Crea tu cuenta de usuario"
            : "Registrar cuenta"
        }
        description={
          formType === "login"
            ? "Ingresa al sistema para poder gestiar tus tareas"
            : "Podras crear el listado de tus tareas una vez registrado"
        }
        onSubmit={handleSubmit}
        authType={formType}
        buttonText={formType === "login" ? "Iniciar sesión" : "Registrarme"}
        changeFormType={setTypeForm}
      >
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="email"
            value={formAuth.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            value={formAuth.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </Form>
    </>
  );
};

export default LoginPage;

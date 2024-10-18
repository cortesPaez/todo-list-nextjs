import React, { Dispatch, DOMAttributes, ReactNode, SetStateAction } from "react";

interface Form extends DOMAttributes<HTMLFormElement> {
  title: string;
  description: string;
  buttonText: string;
  children: ReactNode;
  authType: string;
  changeFormType: Dispatch<SetStateAction<string>>;
}

const Form = ({
  title,
  description,
  buttonText,
  children,
  authType,
  changeFormType,
  ...props
}: Form) => {
  const redirectMap = new Map<string, string>([
    ["login", "Crear una cuenta y gestiona tus tareas"],
    ["register", "¿Ya tienes una cuenta? Inicia sesión aqui"],
  ]);

  return (
    <form
      className="mt-20 py-12 px-12 bg-white rounded shadow-xl w-[500px]"
      {...props}
    >
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer text-black">
          {title}
        </h1>
        <p className="text-center text-sm mb-8 font-semibold text-slate-800 tracking-wide cursor-pointer">
          {description}
        </p>
      </div>
      <div className="flex flex-col">{children}</div>
      <div className="text-center mt-8">
        <button
          className="w-full py-2 text-xl text-white bg-slate-950 rounded-lg hover:bg-slate-950 transition-all"
          type="submit"
        >
          {buttonText}
        </button>
        <p className="mt-4 text-sm text-black cursor-pointer" onClick={() => authType === "login" ? changeFormType("register") : changeFormType("login")}>
            {redirectMap.get(authType)}
        </p>
      </div>
    </form>
  );
};

export default Form;

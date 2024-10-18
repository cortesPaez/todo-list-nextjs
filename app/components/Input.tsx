import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

const Input = ({error, ...props}: InputProps) => {
  return (
    <>
      <input
        className="block text-black text-sm py-3 px-4 rounded-lg w-full border outline-slate-950"
        {...props}
      />
      {error && <div className="mb-5">{error}</div>}
    </>
  );
};

export default Input;

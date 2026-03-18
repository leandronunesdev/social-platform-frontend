import { UseFormRegister, FieldError } from "react-hook-form";
import Hide from "@/public/images/Hide.svg";
import Show from "@/public/images/Show.svg";
import Image from "next/image";
import { boolean } from "zod";
import { useState } from "react";

type InputProps = {
  label: string;
  type: string;
  placeholder?: string;
  id: string;
  paddingBottom?: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
};

const Input = ({
  label,
  type,
  placeholder,
  id,
  paddingBottom = "pb-6",
  register,
  error,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={paddingBottom}>
      <label
        htmlFor={id}
        className={error ? "text-red-600" : "text-primary-950"}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          id={id}
          {...(register ? register(id) : { name: id })}
          placeholder={placeholder}
          className={`w-full h-10 rounded-lg shadow-sm px-3 pr-10 focus:outline-none ${
            error ? "bg-red-50" : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={error?.message}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Image
              src={showPassword ? Hide : Show}
              alt={showPassword ? "Hide password" : "Show password"}
            />
          </button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;

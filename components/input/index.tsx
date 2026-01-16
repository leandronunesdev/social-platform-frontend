import { UseFormRegister, FieldError } from "react-hook-form";

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
  return (
    <div className={paddingBottom}>
      <label
        htmlFor={id}
        className={error ? "text-red-600" : "text-primary-950"}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...(register ? register(id) : { name: id })}
        placeholder={placeholder}
        className={`w-full h-10 rounded-lg shadow-sm px-3 focus:outline-none ${
          error ? "bg-red-50" : ""
        }`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;

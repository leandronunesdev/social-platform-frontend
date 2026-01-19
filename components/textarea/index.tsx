import { UseFormRegister, FieldError } from "react-hook-form";

type TextAreaProps = {
  label: string;
  id: string;
  placeholder?: string;
  rows?: number;
  paddingBottom?: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
};

const TextArea = ({
  label,
  id,
  placeholder,
  rows = 4,
  paddingBottom = "pb-6",
  register,
  error,
  required = false,
}: TextAreaProps) => {
  return (
    <div className={paddingBottom}>
      <label
        htmlFor={id}
        className={error ? "text-red-600" : "text-primary-950"}
      >
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        {...(register ? register(id) : { name: id })}
        placeholder={placeholder}
        required={required}
        className={`resize-none w-full rounded-lg shadow-sm px-3 py-2 focus:outline-none ${
          error && "border-2 border-red-500 bg-red-50"
        }`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="text-red-600 text-sm mt-1"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextArea;

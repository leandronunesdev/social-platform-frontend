type InputProps = {
  label: string;
  type: string;
  placeholder?: string;
  id: string;
  paddingBottom?: string;
};

const Input = ({
  label,
  type,
  placeholder,
  id,
  paddingBottom = "pb-6",
}: InputProps) => {
  return (
    <div className={paddingBottom}>
      <label htmlFor={id} className="text-primary-950">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="w-full h-10 rounded-lg shadow-sm px-3"
      />
    </div>
  );
};

export default Input;

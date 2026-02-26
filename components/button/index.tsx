type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  label: string;
  marginBottom?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  type,
  label,
  marginBottom = "mb-6",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-primary-950 text-primary-50 w-full rounded-lg py-2 ${marginBottom} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default Button;

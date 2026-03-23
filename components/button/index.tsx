type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
};

const baseClasses =
  "w-full rounded-lg py-2 transition-colors duration-200 focus:outline-none focus:ring-0 mb-6";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-950 text-primary-50 hover:bg-primary-800 focus:ring-primary-500",
  secondary:
    "bg-transparent text-primary-950 border border-primary-950 hover:bg-primary-100 focus:ring-primary-500",
};
const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

const Button = ({
  type = "button",
  label,
  disabled = false,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        baseClasses,
        variantClasses[variant],
        disabled ? disabledClasses : "",
        className,
      ].join(" ")}
    >
      {label}
    </button>
  );
};

export default Button;

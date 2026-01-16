type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  label: string;
  marginBottom?: string;
};

const Button = ({ type, label, marginBottom = "mb-6" }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-primary-950 text-primary-50 w-full rounded-lg py-2 ${marginBottom}`}
    >
      {label}
    </button>
  );
};

export default Button;

import Link from "next/link";

type BaseProps = {
  text: string;
  linkText: string;
  className?: string;
};

type HrefProps = BaseProps & {
  href: string;
  onClick?: never;
};

type ClickProps = BaseProps & {
  onClick: () => void;
  href?: never;
};

type AuthLinkProps = HrefProps | ClickProps;

const AuthLink = ({
  text,
  linkText,
  href,
  className,
  onClick,
}: AuthLinkProps) => {
  const linkClasses =
    "underline hover:text-primary-500 transition-colors duration-200";

  return (
    <div className={`text-center ${className}`}>
      <span className="text-primary-950">
        {text}{" "}
        {href ? (
          <Link href={href} className={linkClasses}>
            {linkText}
          </Link>
        ) : (
          <button type="button" onClick={onClick} className={linkClasses}>
            {linkText}
          </button>
        )}
      </span>
    </div>
  );
};

export default AuthLink;

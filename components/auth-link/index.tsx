import Link from "next/link";

type AuthLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

const AuthLink = ({ text, linkText, href }: AuthLinkProps) => {
  return (
    <div className="text-center">
      <span className="text-primary-950">
        {text}{" "}
        <Link
          href={href}
          className="underline hover:text-primary-500 transition-colors duration-200"
        >
          {linkText}
        </Link>
      </span>
    </div>
  );
};

export default AuthLink;

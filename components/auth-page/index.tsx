import Image from "next/image";
import SocialMediaLogo from "@/public/images/SocialMediaLogo.svg";

type AuthPageProps = {
  children: React.ReactNode;
};

const AuthPage = ({ children }: AuthPageProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-primary-100">
      <div className="w-full max-w-md space-y-8 text-primary-950">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-12 pb-2">
            <Image
              src={SocialMediaLogo}
              alt="SocialMediaLogo"
              width={239}
              height={48}
            />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default AuthPage;

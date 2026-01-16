import Link from "next/link";
import Image from "next/image";
import SocialMediaLogo from "@/public/images/SocialMediaLogo.svg";
import Input from "@/components/input";
import Button from "@/components/button";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-primary-100">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="relative">
            <Image
              src={SocialMediaLogo}
              alt="SocialMediaLogo"
              width={239}
              height={48}
            />
          </div>
        </div>

        <div>
          <Input
            label="email"
            type="email"
            id="email"
            placeholder="user@socialmedia.com"
          />

          <Input
            label="password"
            type="password"
            id="password"
            placeholder="*********"
            paddingBottom="pb-12"
          />

          <Button type="submit" label="sign in" marginBottom="mb-8" />

          <div className="text-center">
            <span className="text-primary-950">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="underline hover:text-primary-500 transition-colors duration-200"
              >
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import AuthLink from "@/components/auth-link";

export default function LoginPage() {
  return (
    <AuthPage>
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

        <AuthLink
          text={"Don't have an account?"}
          linkText="Sign up"
          href="/register"
        />
      </div>
    </AuthPage>
  );
}

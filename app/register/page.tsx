import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import AuthLink from "@/components/auth-link";

export default function LoginPage() {
  return (
    <AuthPage>
      <div>
        <Input label="name" type="text" id="name" placeholder="John Doe" />

        <Input
          label="username"
          type="text"
          id="username"
          placeholder="john.doe"
        />

        <Input
          label="email"
          type="email"
          id="email"
          placeholder="john.doe@email.com"
        />

        <Input
          label="password"
          type="password"
          id="password"
          placeholder="**********"
        />

        <Input
          label="confirm password"
          type="password"
          id="confirm-password"
          placeholder="**********"
          paddingBottom="pb-12"
        />

        <Button type="submit" label="sign up" marginBottom="mb-8" />

        <AuthLink
          text={"Already have an account?"}
          linkText="Sign in"
          href="/login"
        />
      </div>
    </AuthPage>
  );
}

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const signupMutation = api.auth.signup.useMutation({
    onSuccess: async (data, variables) => {
      const result = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });
      
      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    signupMutation.mutate({ email, password, name });
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white/10 p-8 backdrop-blur">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-[hsl(280,100%,70%)] hover:text-[hsl(280,100%,80%)]"
            >
              sign in to existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="relative block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-[hsl(280,100%,70%)] focus:outline-none focus:ring-[hsl(280,100%,70%)] sm:text-sm"
                placeholder="Name (optional)"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-[hsl(280,100%,70%)] focus:outline-none focus:ring-[hsl(280,100%,70%)] sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="relative block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-[hsl(280,100%,70%)] focus:outline-none focus:ring-[hsl(280,100%,70%)] sm:text-sm"
                placeholder="Password (min 6 characters)"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-900/50 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || signupMutation.isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[hsl(280,100%,70%)] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(280,100%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(280,100%,70%)] focus:ring-offset-2 disabled:opacity-50"
            >
              {loading || signupMutation.isPending ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => signIn("discord", { callbackUrl: "/" })}
              className="group relative flex w-full justify-center rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[hsl(280,100%,70%)] focus:ring-offset-2"
            >
              Sign up with Discord
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
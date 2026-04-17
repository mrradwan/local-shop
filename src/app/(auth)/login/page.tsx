"use client";
import Image from "next/image";
import { Clock, ShieldHalf, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaGoogle, FaLock, FaStar, FaUsers } from "react-icons/fa";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/auth.schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/password/password-input";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmitLogin(data: LoginFormData) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.ok) {
      router.push("/products");
      toast.success("Login successful!");
    } else {
      toast.error(response?.error || "Login failed.");
    }
  }

  return (
    <>
      <div className="container py-16 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="hidden lg:block">
            <div className="text-center space-y-6">
              <Image
                src="/image/login.png"
                alt="Login"
                width={400}
                height={300}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  FreshCart - Your One-Stop Shop for Fresh Products
                </h2>
                <p className="text-lg text-gray-600">
                  Join thousands of happy customers who trust FreshCart for
                  their daily grocery needs
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Truck className="text-green-600 mr-2" size={18} />
                    Free Delivery
                  </div>
                  <div className="flex items-center">
                    <ShieldHalf className="text-green-600 mr-2" size={18} />
                    Secure Payment
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-green-600 mr-2" size={18} />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-green-600">
                    Fresh<span className="text-gray-800">Cart</span>
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome Back!
                </h1>
                <p className="text-gray-600">
                  Sign in to continue your fresh shopping experience
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-black border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                >
                  <FaGoogle className="text-red-600" />
                  <span className="font-medium text-gray-700">
                    Continue with Google
                  </span>
                </Button>
                <Button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-black border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                >
                  <FaFacebookF className="text-blue-600" />
                  <span className="font-medium text-gray-700">
                    Continue with Facebook
                  </span>
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    OR CONTINUE WITH EMAIL
                  </span>
                </div>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmitLogin)}
                className="space-y-5"
              >
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="mohamed@example.com"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <PasswordInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-checked:border-green-600 data-checked:bg-green-600 data-checked:text-white dark:data-checked:bg-green-600 cursor-pointer"
                      />
                      <Label
                        htmlFor="rememberMe"
                        className="text-sm font-medium text-gray-600 cursor-pointer"
                      >
                        Keep me signed in
                      </Label>
                    </div>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors py-6 text-lg rounded-xl mt-4"
                >
                  {isSubmitting && <Spinner data-icon="inline-start" />}
                  <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
                </Button>
              </form>

              <div className="text-center mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-600">
                  New to FreshCart?
                  <Link
                    href="/register"
                    className="text-green-600 hover:text-green-700 ms-2 font-semibold cursor-pointer"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <FaLock className="mr-1 text-gray-500" size={12} />
                  SSL Secured
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-1 text-gray-500" size={12} />
                  50K+ Users
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-1 text-gray-500" size={12} />
                  4.9 Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

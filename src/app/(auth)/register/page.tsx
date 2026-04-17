"use client";

import { Star, UserRoundPlus } from "lucide-react";
import { FaTruckFast } from "react-icons/fa6";
import { FaFacebookF, FaGoogle, FaShieldAlt } from "react-icons/fa";
import ReviewCarousel from "@/components/reviews/review-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/schemas/auth.schemas";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PasswordInput } from "@/components/password/password-input";

export default function Register() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });
  const { isSubmitting } = form.formState;
  const watchPassword = form.watch("password", "");

  const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    if (!password) return score;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (passwordRegex.test(password))
      score = 4; // 'Very Strong'
    else if (password.length >= 8)
      score = 3; // 'Strong'
    else if (password.length >= 6)
      score = 2; // 'Weak'
    else if (password.length > 0) score = 1; // 'Very Weak'

    return score;
  };

  const strengthScore = calculatePasswordStrength(watchPassword);
  const strengthWords = ["", "Very Weak", "Weak", "Good", "Strong"];

  const strengthColors = [
    "bg-transparent",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-600",
  ];

  const strengthTextColors = [
    "",
    "text-red-600",
    "text-orange-600",
    "text-yellow-600",
    "text-green-700",
  ];
  async function onSubmit(data: RegisterFormValues) {
    const response = await registerUser(data);
    if (response.message === "success") {
      router.push("/login?registered=true");
      toast.success("Account created successfully!");
    } else {
      toast.error(response.message || "Registration failed. Please try again.");
    }
  }
  return (
    <>
      <main className="py-10">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-xl mt-2 mb-4">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
            <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
              <li>
                <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                  <Star className="fill-green-600" size={24} />
                </div>
                <div className="content">
                  <h2 className="text-lg font-semibold">Premium Quality</h2>
                  <p className="text-gray-600">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                  <FaTruckFast className="fill-green-600" size={24} />
                </div>
                <div className="content">
                  <h2 className="text-lg font-semibold">Fast Delivery</h2>
                  <p className="text-gray-600">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </li>
              <li>
                <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                  <FaShieldAlt className="fill-green-600" size={24} />
                </div>
                <div className="content">
                  <h2 className="text-lg font-semibold">Secure Shopping</h2>
                  <p className="text-gray-600">
                    Your personal and payment information is always protected.
                  </p>
                </div>
              </li>
            </ul>
            <div className="review bg-white shadow-sm p-4 rounded-md">
              <div className="author flex items-center gap-4 mb-4">
                <ReviewCarousel />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
            <h2 className="text-center text-3xl font-semibold mb-2">
              Create Your Account
            </h2>
            <p className="text-center">
              Start your fresh journey with us today
            </p>
            <div className="flex gap-2 *:grow my-10">
              <Button className="text-black bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                <FaGoogle className="me-2 text-red-600" />
                <span>Google</span>
              </Button>
              <Button className="text-black bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                <FaFacebookF className="me-2 text-blue-600" />
                <span>Facebook</span>
              </Button>
            </div>
            <div className="relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4">
              <span className="sr-only">or</span>
            </div>
            {/* Registration form can be added here */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Mohamed"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                    <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                    <PasswordInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                    />
                    {watchPassword.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-1.5 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          {[1, 2, 3, 4].map((bar) => (
                            <div
                              key={bar}
                              className={`h-full flex-1 rounded-full ${
                                strengthScore >= bar
                                  ? strengthColors[strengthScore]
                                  : "bg-transparent"
                              } transition-all duration-300`}
                            />
                          ))}
                        </div>
                        <p
                          className={`text-sm font-medium ${strengthTextColors[strengthScore]}`}
                        >
                          {strengthWords[strengthScore]}
                        </p>
                      </div>
                    )}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password*
                    </FieldLabel>
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
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="+12345678900"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="terms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-checked:border-green-600 data-checked:bg-green-600 data-checked:text-white dark:data-checked:bg-green-600 cursor-pointer"
                      />
                      <Label htmlFor="terms" className="ms-2">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-green-600 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-green-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        *
                      </Label>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
              >
                {isSubmitting ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <UserRoundPlus />
                )}
                <span>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </span>
              </Button>
            </form>
            <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
              Already have an account?
              <Link
                href="/login"
                className="text-green-600 hover:underline font-medium ms-2"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

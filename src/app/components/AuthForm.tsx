"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import getSchema from "@/lib/formSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();

  const schema = getSchema(mode);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      stayLoggedIn: true,
      password: "",
      ...(mode === "register" && {
        username: "",
        confirmPassword: "",
      }),
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const modeParam = mode === "login" ? "login" : "register";

      const res = await fetch(`/api/auth?mode=${modeParam}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(
          mode === "login"
            ? {
                email: values.email,
                password: values.password,
                stay_logged_in: values.stayLoggedIn,
              }
            : {
                username: values.username,
                email: values.email,
                password: values.password,
                confirm_password: values.confirmPassword,
                stay_logged_in: values.stayLoggedIn,
              }
        ),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(
            errorData.detail || errorData.error || "Upload failed"
          );
        } else {
          const fallbackText = await res.text();
          throw new Error(fallbackText || "Unknown error");
        }
      }

      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Authentication Error", err);
      toast.error("Authentication Error", {
        description: message || "Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full">
        <h2 className="text-[23px] font-bold text-[#121212]/90 mb-1">
          {mode === "login"
            ? "Sign In To Your Account"
            : "Sign Up To Create An Account"}
        </h2>
        <p className="text-black/80 mb-6 max-w-[50ch] text-[16px]">
          {mode === "login"
            ? "Log in to continue chatting with your documents."
            : "Unlock AI-powered PDF search, summaries, and chat."}
        </p>

        <div className="space-y-4">
          {mode === "register" && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      value={field.value as string}
                      className="auth-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    value={field.value as string}
                    className="auth-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    value={field.value as string}
                    className="auth-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {mode === "register" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Confirm Password</FormLabel> */}
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                      value={field.value as string}
                      className="auth-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="stayLoggedIn"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 mt-6 mb-8">
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    ref={field.ref}
                    className="shadow-none"
                  />
                </FormControl>
                <FormLabel className="mb-0">Stay logged in</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className={cn(
            "w-full py-5 px-4 text-white rounded-3xl cursor-pointer",
            authLoading ? "bg-primary/80" : "bg-primary"
          )}
        >
          {mode === "login" ? "Sign In" : "Sign Up"}
        </Button>

        <p className="mt-6 text-[15px] text-black/80">
          {mode === "register"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <Link
            href={`/${mode === "login" ? "register" : "login"}`}
            className="text-primary"
          >
            {mode === "register" ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </form>
    </Form>
  );
}

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AccountSettings() {
  const fetchWithAuth = useFetchWithAuth();
  const { setAccessToken } = useAuth();
  const router = useRouter();

  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [deletePasswordConfirm, setDeletePasswordConfirm] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  };

  const validatePasswords = (pass: string, confirmPass: string) => {
    if (!pass) return "Password is required";
    if (pass.length < 6) return "Password must be at least 6 characters";
    if (pass !== confirmPass) return "Passwords do not match";
    return "";
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordError("");
  };

  const onSaveEmail = async () => {
    const error = validateEmail(email);
    setEmailError(error);
    if (!error) {
      try {
        setEmailLoading(true);
        const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const res = await fetchWithAuth(
          `${API_BASE_URL}/auth/user/update/email/`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to update email.");
        }
        toast.success("Email updated!");
        setEmail("");
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast.error(message || "Failed to update email.");
      } finally {
        setEmailLoading(false);
      }
    }
  };
  const logoutUser = async () => {
    try {
      const res = await fetchWithAuth("/api/auth/logout/", { method: "POST" });

      const data: { message: string } = await res.json();

      setAccessToken(null);
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setAccessToken(null);
      return { data: null, error: message };
    }
  };

  const onSavePassword = async () => {
    const error = validatePasswords(password, confirmPassword);
    setPasswordError(error);
    if (!error) {
      try {
        setPasswordLoading(true);
        const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const res = await fetchWithAuth(
          `${API_BASE_URL}/auth/user/update/password/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
              confirm_password: confirmPassword,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to update password.");
        }

        const { data: logoutData, error: logoutError } = await logoutUser();

        if (logoutError || !logoutData)
          throw new Error(
            logoutError || "Something went wrong while logging out."
          );

        toast.success(data.message || "Password updated! Please log in again.");
        setPassword("");
        setConfirmPassword("");

        router.push("/login");
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast.error(message || "Failed to update password.");
      } finally {
        setPasswordLoading(false);
      }
    }
  };

  const onDeleteAccount = async () => {
    if (!deletePasswordConfirm) {
      setDeletePasswordError("Please enter your password to confirm.");
      return;
    }

    try {
      setDeleteLoading(true);
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetchWithAuth(`${API_BASE_URL}/auth/user/delete/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePasswordConfirm }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || data.details || "Failed to delete account."
        );
      }

      const { data: logoutData, error: logoutError } = await logoutUser();

      if (logoutError || !logoutData)
        throw new Error(
          logoutError || "Something went wrong while logging out."
        );

      toast.success(data.message || data.details || "Account deleted!");
      router.push("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message || "Failed to delete account.");
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <TabsContent value="accountSettings" className="mt-4 max-w-md space-y-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Update Email</CardTitle>
          <CardDescription>
            Change the email associated with your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <input
            type="email"
            placeholder="newemail@example.com"
            className={`w-full border rounded px-3 py-2 text-sm mb-1 ${
              emailError ? "border-destructive" : "border-border"
            }`}
            value={email}
            onChange={onEmailChange}
            disabled={emailLoading}
            aria-invalid={!!emailError}
            aria-describedby="email-error"
            aria-label="New email"
          />
          {emailError && (
            <p id="email-error" className="text-destructive text-xs">
              {emailError}
            </p>
          )}
          <div className="flex justify-end">
            <button
              onClick={onSaveEmail}
              disabled={emailLoading}
              className={`px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition cursor-pointer ${
                emailLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-busy={emailLoading}
            >
              {emailLoading ? "Saving..." : "Save Email"}
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            Choose a strong password and don’t reuse it elsewhere.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <input
            type="password"
            placeholder="New password"
            className={`w-full border rounded px-3 py-2 text-sm ${
              passwordError ? "border-destructive" : "border-border"
            }`}
            value={password}
            onChange={onPasswordChange}
            disabled={passwordLoading}
            aria-invalid={!!passwordError}
            aria-describedby="password-error"
            aria-label="New password"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className={`w-full border rounded px-3 py-2 text-sm ${
              passwordError ? "border-destructive" : "border-border"
            }`}
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            disabled={passwordLoading}
            aria-invalid={!!passwordError}
            aria-describedby="password-error"
            aria-label="Confirm new password"
          />
          {passwordError && (
            <p id="password-error" className="text-destructive text-xs">
              {passwordError}
            </p>
          )}
          <div className="flex justify-end">
            <button
              onClick={onSavePassword}
              disabled={passwordLoading}
              className={`px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition cursor-pointer ${
                passwordLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-busy={passwordLoading}
            >
              {passwordLoading ? "Saving..." : "Save Password"}
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently remove your account and all associated data. This action
            is irreversible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <input
            type="password"
            placeholder="Confirm your password"
            className={`w-full border rounded px-3 py-2 text-sm ${
              deletePasswordError ? "border-destructive" : "border-border"
            }`}
            value={deletePasswordConfirm}
            onChange={(e) => {
              setDeletePasswordConfirm(e.target.value);
              setDeletePasswordError("");
            }}
            disabled={deleteLoading}
            aria-invalid={!!deletePasswordError}
            aria-describedby="delete-password-error"
            aria-label="Confirm password to delete account"
          />
          {deletePasswordError && (
            <p id="delete-password-error" className="text-destructive text-xs">
              {deletePasswordError}
            </p>
          )}
          <div className="flex justify-end">
            <button
              onClick={onDeleteAccount}
              disabled={deleteLoading}
              className={`px-4 py-2 text-sm rounded border border-destructive text-destructive hover:bg-destructive/10 transition cursor-pointer ${
                deleteLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-busy={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

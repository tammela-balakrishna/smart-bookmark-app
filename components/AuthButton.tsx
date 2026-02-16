"use client";

import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";

export function AuthButton() {
  const { user, loading } = useAuth();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <button disabled className="btn-ghost">
        Checking session...
      </button>
    );
  }

  if (!user) {
    return (
      <button onClick={handleSignIn} className="btn-primary">
        <span className="mr-1.5 text-base">🔐</span>
        Continue with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="max-w-[160px] truncate rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
        {user.email}
      </span>
      <button onClick={handleSignOut} className="btn-ghost">
        Sign out
      </button>
    </div>
  );
}

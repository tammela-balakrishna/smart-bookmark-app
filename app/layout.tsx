import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { AuthProvider } from "../components/AuthContext";
import { AuthButton } from "../components/AuthButton";

export const metadata: Metadata = {
  title: "Smart Bookmark App",
  description: "Simple bookmark manager with Supabase and Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        <AuthProvider>
          <div className="flex min-h-screen justify-center px-4 py-10">
            <div className="glass-panel relative flex w-full max-w-4xl flex-col gap-6 px-6 pb-8 pt-6">
              <div className="pointer-events-none absolute inset-x-16 -top-10 -z-10 h-40 bg-gradient-to-br from-emerald-500/40 via-cyan-400/20 to-transparent blur-3xl" />
              <header className="flex flex-col gap-4 border-b border-slate-800/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Realtime bookmarks
                  </div>
                  <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Smart Bookmark App
                  </h1>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Save articles and links that matter, synced privately across your devices.
                  </p>
                </div>
                <div className="self-start sm:self-center">
                  <AuthButton />
                </div>
              </header>
              <main className="flex-1 pb-2">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../components/AuthContext";
import { Bookmark, BookmarkForm } from "../components/BookmarkForm";
import { BookmarkList } from "../components/BookmarkList";

export default function HomePage() {
  const { user, loading } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Load bookmarks when user becomes available
  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    let ignore = false;

    async function load() {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id, user_id, url, title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Error loading bookmarks", error);
        return;
      }

      if (!ignore && data) {
        setBookmarks(data as Bookmark[]);
        setInitialLoaded(true);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [user]);

  // Realtime updates for this user's bookmarks
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookmarks", filter: `user_id=eq.${user.id}` },
        (payload: { new: unknown }) =>
          setBookmarks((prev) => [payload.new as Bookmark, ...prev]),
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookmarks", filter: `user_id=eq.${user.id}` },
        (payload: { old: unknown }) =>
          setBookmarks((prev) => prev.filter((b) => b.id !== (payload.old as Bookmark).id)),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleDelete = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  if (loading) {
    return <p className="text-sm text-slate-400">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold">Welcome</h2>
        <p className="text-sm text-slate-300">
          Sign in with Google using the button in the header to start adding
          bookmarks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold">Add a bookmark</h2>
        <p className="mb-4 mt-1 text-xs text-slate-400">
          Bookmarks are private to your account and sync in real time.
        </p>
        <BookmarkForm
          onCreated={(b) => setBookmarks((prev) => [b, ...prev])}
        />
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold">Your bookmarks</h2>
        {!initialLoaded && (
          <p className="mt-2 text-sm text-slate-400">Loading bookmarks...</p>
        )}
        {initialLoaded && (
          <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} />
        )}
      </section>
    </div>
  );
}

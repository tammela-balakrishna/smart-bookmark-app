"use client";

import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";

export interface Bookmark {
  id: string;
  user_id: string;
  url: string;
  title: string;
  created_at: string;
}

interface Props {
  onCreated?: (bookmark: Bookmark) => void;
}

export function BookmarkForm({ onCreated }: Props) {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        user_id: user.id,
        url: url.trim(),
        title: title.trim() || url.trim(),
      })
      .select()
      .single();

    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data && onCreated) {
      onCreated(data as Bookmark);
    }

    setUrl("");
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="field-label">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/article"
          className="field-input"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="field-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Optional title"
          className="field-input"
        />
      </div>
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button type="submit" disabled={submitting} className="btn-primary">
        {submitting ? "Saving..." : "Add bookmark"}
      </button>
    </form>
  );
}

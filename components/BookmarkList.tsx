"use client";

import { Bookmark } from "./BookmarkForm";

interface Props {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
}

export function BookmarkList({ bookmarks, onDelete }: Props) {
  if (bookmarks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 px-4 py-3 text-sm text-slate-400">
        You have no bookmarks yet. Add your first one above.
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {bookmarks.map((b) => (
        <li
          key={b.id}
          className="group flex items-start justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-900/70 p-3 shadow-sm shadow-black/40 transition hover:border-emerald-500/60 hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-500/20"
        >
          <div className="space-y-1">
            <a
              href={b.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-emerald-400 hover:underline"
            >
              {b.title || b.url}
            </a>
            <p className="break-all text-xs text-slate-500">{b.url}</p>
          </div>
          <button
            onClick={() => onDelete(b.id)}
            className="btn-ghost opacity-0 transition group-hover:opacity-100"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

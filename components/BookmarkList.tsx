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
          onClick={() =>
            window.open(b.url, "_blank", "noopener,noreferrer")
          }
          className="group flex items-start justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-900/70 p-3 shadow-sm shadow-black/40 transition hover:border-emerald-500/60 hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(b.url, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/10 text-emerald-300 opacity-0 shadow-sm shadow-emerald-500/20 transition group-hover:opacity-100 hover:bg-emerald-500/20 hover:text-emerald-100"
              aria-label="Open bookmark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(b.id);
              }}
              className="btn-ghost opacity-0 transition group-hover:opacity-100"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

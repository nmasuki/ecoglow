"use client";

import { useEffect, useState } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    const res = await fetch("/api/admin/contacts");
    const data = await res.json();
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    });
    fetchContacts();
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (selected?._id === id) setSelected(null);
    fetchContacts();
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Contact Messages
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-muted">
                  From
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted">
                  Subject
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted">
                  Date
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => {
                    setSelected(c);
                    if (!c.isRead) markRead(c._id);
                  }}
                  className={`border-b border-border last:border-0 cursor-pointer transition-colors ${
                    selected?._id === c._id
                      ? "bg-brand-teal/5"
                      : "hover:bg-gray-50"
                  } ${!c.isRead ? "font-semibold" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {!c.isRead && (
                        <span className="w-2 h-2 rounded-full bg-brand-teal shrink-0" />
                      )}
                      <span className={c.isRead ? "text-muted" : "text-gray-900"}>
                        {c.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{c.subject}</td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {formatDate(c.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteContact(c._id);
                      }}
                      className="text-red-500 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-muted"
                  >
                    No messages yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-border p-5">
          {selected ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted mb-1">From</p>
                <p className="font-medium text-gray-900">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Email</p>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-sm text-brand-teal hover:underline"
                >
                  {selected.email}
                </a>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-xs text-muted mb-1">Phone</p>
                  <p className="text-sm">{selected.phone}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted mb-1">Subject</p>
                <p className="text-sm font-medium">{selected.subject}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Message</p>
                <p className="text-sm whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">
                  {formatDate(selected.createdAt)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted text-sm text-center py-8">
              Select a message to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

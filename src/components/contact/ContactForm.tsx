"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMessage(data.message);
        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error);
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please check your connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
            placeholder="0712 345 678"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
            Subject *
          </label>
          <select
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors bg-white"
          >
            <option>General Inquiry</option>
            <option>Product Information</option>
            <option>Bulk Order</option>
            <option>Partnership</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors resize-y"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto px-8 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-brand-leaf font-medium">{statusMessage}</p>
      )}
      {status === "error" && (
        <p className="text-red-600 font-medium">{statusMessage}</p>
      )}
    </form>
  );
}

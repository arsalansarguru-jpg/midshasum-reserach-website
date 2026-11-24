"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit enquiry.");
      setStatus("success");
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit enquiry.");
    }
  }

  return (
    <form onSubmit={submit} className="card-line p-7 md:p-10" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="text-xs text-white/60">Name<input name="name" required minLength={2} maxLength={100} className="mt-3 w-full border border-white/10 bg-[#0a0b0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c9a227]" /></label>
        <label className="text-xs text-white/60">Email<input name="email" type="email" required maxLength={254} className="mt-3 w-full border border-white/10 bg-[#0a0b0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c9a227]" /></label>
        <label className="text-xs text-white/60 md:col-span-2">Enquiry category<select name="category" required className="mt-3 w-full border border-white/10 bg-[#0a0b0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c9a227]"><option value="">Select a category</option><option>General institutional enquiry</option><option>Research collaboration</option><option>Technology partnership</option><option>Institutional relationship</option><option>Licensing opportunity</option><option>Media and editorial enquiry</option></select></label>
        <label className="text-xs text-white/60 md:col-span-2">Message<textarea name="message" required minLength={20} maxLength={5000} rows={6} className="mt-3 w-full resize-y border border-white/10 bg-[#0a0b0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c9a227]" /></label>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-gold mt-7 disabled:cursor-not-allowed disabled:opacity-60">{status === "sending" ? "Submitting..." : "Submit enquiry"}</button>
      {message && <p role="status" className={`mt-5 text-sm leading-7 ${status === "success" ? "text-[#d8b84f]" : "text-red-300"}`}>{message}</p>}
    </form>
  );
}

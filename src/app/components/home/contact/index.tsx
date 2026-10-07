"use client";
import pageData from "@/data/page-data.json";
import { FORM_ENDPOINT, STATEMENTS } from "@/data/site";
import { useEffect, useState } from "react";

const { contact } = pageData;

const reasons = {
  enquiry: { label: "General enquiry", subject: "Website enquiry" },
  cv: { label: "Request a PDF copy of the CV", subject: "CV request" },
};

type Reason = keyof typeof reasons;
type Status = "idle" | "sending" | "sent" | "error";

const initialState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  reason: "enquiry" as Reason,
  message: "",
  _honey: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<Status>("idle");

  // A link to #cv-request preselects the CV reason.
  useEffect(() => {
    const selectFromHash = () => {
      if (window.location.hash === "#cv-request") {
        setFormData((prev) => ({ ...prev, reason: "cv" }));
      }
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          reason: reasons[formData.reason].label,
          message: formData.message,
          _subject: reasons[formData.reason].subject,
          _template: "table",
          _captcha: "false",
          _honey: formData._honey,
        }),
      });
      const data = await res.json();
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message);
      setFormData(initialState);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const messageRequired = formData.reason === "enquiry";

  return (
    <section id="contact" aria-labelledby="contact-title" className="container pb-24 lg:pb-32">
      <div className="border-t-8 border-ink pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 bg-field px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="contact-title" className="m-0">
              Contact
            </h2>
            <p className="mt-6 mb-0 max-w-[46rem] text-lead">{STATEMENTS.contact}</p>
            <ul className="mt-8 mb-0 flex list-none flex-col gap-1 p-0 text-small">
              <li>
                <a href={`mailto:${contact.email}`} className="text-ink underline hover:text-ocean">
                  {contact.email}
                </a>
              </li>
              {contact.linkedin && (
                <li>
                  <a href={contact.linkedin} className="text-ink underline hover:text-ocean">
                    LinkedIn
                  </a>
                </li>
              )}
              <li>{contact.location}</li>
            </ul>
          </div>

      <form id="cv-request" onSubmit={handleSubmit} className="no-print flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
        <div>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            required
            className="input"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            required
            className="input"
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="label">
            Phone (optional)
          </label>
          <input
            className="input"
            id="phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="organization" className="label">
            Organization (optional)
          </label>
          <input
            className="input"
            id="organization"
            name="organization"
            autoComplete="organization"
            value={formData.organization}
            onChange={handleChange}
          />
        </div>
        <fieldset className="m-0 border-0 p-0">
          <legend className="label mb-2">Reason</legend>
          {(Object.keys(reasons) as Reason[]).map((key) => (
            <label key={key} className="flex items-baseline gap-3 py-1">
              <input
                type="radio"
                name="reason"
                value={key}
                checked={formData.reason === key}
                onChange={handleChange}
                className="accent-ink"
              />
              {reasons[key].label}
            </label>
          ))}
        </fieldset>
        <div>
          <label htmlFor="message" className="label">
            Message{messageRequired ? "" : " (optional)"}
          </label>
          <textarea
            required={messageRequired}
            className="input resize-y"
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="_honey">Leave this field empty</label>
          <input
            id="_honey"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            value={formData._honey}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="button disabled:cursor-wait"
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          <p aria-live="polite" className="mt-4 mb-0">
            {status === "sent" && "Thank you. Your message has been sent."}
            {status === "error" && (
              <>
                Sorry, your message could not be sent. Please email{" "}
                <a href={`mailto:${contact.email}`} className="text-ink underline hover:text-ocean">
                  {contact.email}
                </a>{" "}
                instead.
              </>
            )}
          </p>
        </div>
      </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

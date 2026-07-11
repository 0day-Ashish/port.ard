"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, AlertCircle, UploadCloud, FileText, Trash2 } from "lucide-react";

export default function PortfolioSubmitPage() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [instaHandle, setInstaHandle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [otherSocial, setOtherSocial] = useState("");
  const [projects, setProjects] = useState("");
  const [testimonials, setTestimonials] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [services, setServices] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    // Native validation check
    const form = e.currentTarget;
    if (!form.reportValidity()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("profession", profession);
      formData.append("instaHandle", instaHandle);
      formData.append("linkedin", linkedin);
      formData.append("otherSocial", otherSocial);
      formData.append("projects", projects);
      formData.append("testimonials", testimonials);
      formData.append("about", about);
      formData.append("skills", skills);
      formData.append("services", services);
      formData.append("phone", phone);
      if (resume) {
        formData.append("resume", resume);
      }

      const res = await fetch("/api/portfolio-apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus({
          type: "success",
          message: "Portfolio details submitted successfully! I'll review them shortly.",
        });
        // Clear all fields
        setName("");
        setProfession("");
        setInstaHandle("");
        setLinkedin("");
        setOtherSocial("");
        setProjects("");
        setTestimonials("");
        setAbout("");
        setSkills("");
        setServices("");
        setPhone("");
        setResume(null);
        setFormKey((prev) => prev + 1);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to submit. Please check your network connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white flex flex-col justify-between">
      {/* CSS Styling block for modern input validation (using :user-valid and :user-invalid) */}
      <style jsx global>{`
        .custom-input {
          width: 100%;
          background: transparent;
          color: #18181b;
          font-weight: 500;
          font-size: 1.125rem;
          padding: 1rem 0;
          border: 0;
          border-bottom: 1px solid #d4d4d8;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .custom-input:focus {
          outline: none;
          border-bottom-color: #18181b;
        }

        /* Initial/Default Error Message State: Hidden */
        .error-message {
          display: none;
          font-size: 0.875rem;
          color: #dc2626;
          margin-top: 0.5rem;
        }

        /* User-Valid Styling */
        .custom-input:user-valid {
          border-bottom-color: #16a34a;
        }

        /* User-Invalid Styling */
        .custom-input:user-invalid {
          border-bottom-color: #dc2626;
        }

        /* Show error message when input is user-invalid */
        .custom-input:user-invalid ~ .error-message {
          display: block;
        }
      `}</style>

      {/* Navigation Header */}
      <nav className="w-full px-6 md:px-12 py-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-zinc-900 hover:opacity-70 transition-opacity font-black text-lg tracking-[0.1em] uppercase flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>ard.dev</span>
        </Link>
        <div className="text-[10px] text-zinc-400 font-black tracking-[0.2em] uppercase">
          Build — Portfolio
        </div>
      </nav>

      {/* Main Content: Split Grid Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-[45%_50%] gap-12 lg:gap-24 items-start">
        {/* Left Column: Title and Description */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-8">
          <div>
            <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold block mb-2">
              Portfolio Setup
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-black tracking-tight leading-none text-zinc-900">
              Submit Your<br />Portfolio Details
            </h1>
          </div>

          <div className="flex flex-col gap-6 text-zinc-600 font-medium text-base md:text-lg leading-relaxed">
            <p>
              Complete this form to submit your professional profile details, projects, skills, and resume.
            </p>
            <p>
              Once submitted, your portfolio information will be securely saved and accessible in the admin workspace to build your custom showcase.
            </p>

            <div className="border-t border-zinc-100 pt-6 mt-2">
              <h3 className="text-zinc-900 font-black uppercase text-xs tracking-wider mb-3">Sections Checklist</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-sm md:text-base">
                <li>Personal Identity (Name, Profession, About, Phone).</li>
                <li>Social Connectivity (Instagram, LinkedIn, Extra Socials).</li>
                <li>Works & Capabilities (Projects, Skills, Services).</li>
                <li>Professional Verification (Resume/CV & Testimonials).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="bg-zinc-50 border border-zinc-200/60 p-6 md:p-10 rounded-2xl">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 mb-8 pb-4">
            Details Submission
          </h2>

          <form key={formKey} onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            {/* Name Input */}
            <div className="flex flex-col relative">
              <label htmlFor="name" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Your Name"
                className="custom-input"
              />
              <span className="error-message" aria-live="polite">
                Please enter your full name.
              </span>
            </div>

            {/* Profession Input */}
            <div className="flex flex-col relative">
              <label htmlFor="profession" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Profession or Passion
              </label>
              <input
                id="profession"
                type="text"
                required
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="e.g. Your Role"
                className="custom-input"
              />
              <span className="error-message" aria-live="polite">
                Please enter your profession or passion.
              </span>
            </div>

            {/* Social Links Header */}
            <div className="border-t border-zinc-150 pt-4">
              <h3 className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Social Links</h3>
            </div>

            {/* Instagram Input */}
            <div className="flex flex-col relative">
              <label htmlFor="insta" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Instagram Handle
              </label>
              <input
                id="insta"
                type="text"
                required
                value={instaHandle}
                onChange={(e) => setInstaHandle(e.target.value)}
                placeholder="e.g. @ashishhikr"
                className="custom-input"
              />
              <span className="error-message" aria-live="polite">
                Please enter your Instagram handle.
              </span>
            </div>

            {/* LinkedIn Input (Optional) */}
            <div className="flex flex-col relative">
              <label htmlFor="linkedin" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                LinkedIn Profile URL (Optional)
              </label>
              <input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="e.g. https://linkedin.com/in/username"
                className="custom-input"
              />
              <span className="error-message" aria-live="polite">
                Please enter a valid URL.
              </span>
            </div>

            {/* Extra Social Link Input (Optional) */}
            <div className="flex flex-col relative">
              <label htmlFor="otherSocial" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Other Social Profile Link (Optional)
              </label>
              <input
                id="otherSocial"
                type="url"
                value={otherSocial}
                onChange={(e) => setOtherSocial(e.target.value)}
                placeholder="e.g. GitHub, Twitter, or website URL"
                className="custom-input"
              />
              <span className="error-message" aria-live="polite">
                Please enter a valid URL.
              </span>
            </div>

            {/* Section Divider */}
            <div className="border-t border-zinc-150 pt-4">
              <h3 className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">About & Contact</h3>
            </div>

            {/* About Yourself Input */}
            <div className="flex flex-col relative">
              <label htmlFor="about" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                About Yourself
              </label>
              <textarea
                id="about"
                required
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write a brief intro about who you are, your journey, and your goals..."
                rows={4}
                className="custom-input resize-y min-h-[100px]"
              />
              <span className="error-message" aria-live="polite">
                Please write a short bio about yourself.
              </span>
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col relative">
              <label htmlFor="phone" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 1234567890"
                className="custom-input"
              />
              <span className="error-message" aria-live="polite">
                Please enter your phone number.
              </span>
            </div>

            {/* Section Divider */}
            <div className="border-t border-zinc-150 pt-4">
              <h3 className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">Works & Credentials</h3>
            </div>

            {/* Works/Projects Input */}
            <div className="flex flex-col relative">
              <label htmlFor="projects" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Works / Projects
              </label>
              <textarea
                id="projects"
                required
                value={projects}
                onChange={(e) => setProjects(e.target.value)}
                placeholder="Highlight your top projects or past works (include title, details, and URLs if any)..."
                rows={4}
                className="custom-input resize-y min-h-[100px]"
              />
              <span className="error-message" aria-live="polite">
                Please outline your works or projects.
              </span>
            </div>

            {/* Skills/Stacks Input */}
            <div className="flex flex-col relative">
              <label htmlFor="skills" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Skills / Stacks
              </label>
              <textarea
                id="skills"
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, Next.js, Node.js, Tailwind CSS, TypeScript, Figma..."
                rows={3}
                className="custom-input resize-y min-h-[80px]"
              />
              <span className="error-message" aria-live="polite">
                Please add your skills or stacks.
              </span>
            </div>

            {/* Services Offered Input */}
            <div className="flex flex-col relative">
              <label htmlFor="services" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Services You Offer
              </label>
              <textarea
                id="services"
                required
                value={services}
                onChange={(e) => setServices(e.target.value)}
                placeholder="e.g. Custom Website Development, UI/UX Design, Consultation..."
                rows={3}
                className="custom-input resize-y min-h-[80px]"
              />
              <span className="error-message" aria-live="polite">
                Please list the services you offer.
              </span>
            </div>

            {/* Testimonials (Optional) */}
            <div className="flex flex-col relative">
              <label htmlFor="testimonials" className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                Testimonials / Credibilities (Optional)
              </label>
              <textarea
                id="testimonials"
                value={testimonials}
                onChange={(e) => setTestimonials(e.target.value)}
                placeholder="Any recommendations, client reviews, or achievements you'd like to list..."
                rows={3}
                className="custom-input resize-y min-h-[80px]"
              />
            </div>

            {/* Resume Upload Input (Optional) */}
            <div className="flex flex-col relative">
              <label className="text-zinc-400 uppercase tracking-widest text-[10px] font-bold mb-2">
                Resume / CV (Optional)
              </label>
              
              <input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setResume(files[0]);
                  }
                }}
                className="hidden"
              />

              {!resume ? (
                <label
                  htmlFor="resume-file"
                  className="cursor-pointer border border-dashed border-zinc-300 hover:border-zinc-900 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors bg-white hover:bg-zinc-50"
                >
                  <UploadCloud className="text-zinc-400 mb-2" size={24} />
                  <span className="text-sm font-semibold text-zinc-900 block mb-0.5">
                    Click to upload resume
                  </span>
                  <span className="text-xs text-zinc-400">
                    PDF, DOCX up to 10MB
                  </span>
                </label>
              ) : (
                <div className="border border-zinc-200 rounded-xl p-4 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="text-zinc-500 shrink-0" size={20} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-zinc-900 truncate">
                        {resume.name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {(resume.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResume(null)}
                    className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Status Feedback Banner */}
            {status && (
              <div
                className={`p-4 rounded-xl flex gap-3 text-sm font-medium border ${
                  status.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {status.type === "success" ? (
                  <Check size={18} className="shrink-0 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
                )}
                <div>{status.message}</div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-zinc-900 text-white font-black uppercase text-sm tracking-widest py-5 px-6 rounded-xl hover:bg-zinc-800 transition-colors disabled:bg-zinc-400 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>{loading ? "Sending Details…" : "Submit Details"}</span>
              <span className="text-lg">→</span>
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-100 px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-medium tracking-wider uppercase">
        <span>© {new Date().getFullYear()} ard.dev</span>
        <span>Secure Submission</span>
      </footer>
    </div>
  );
}

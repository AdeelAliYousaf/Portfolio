"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaCheck, FaTimes, FaSpinner, FaPaperPlane, FaRedo } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "./emailjs.config";
// ...existing code...

const socialLinks = [
  { icon: <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />, label: "LinkedIn", url: "https://www.linkedin.com/in/adeelaliyousaf", color: "text-blue-500 hover:text-blue-400" },
  { icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />, label: "GitHub", url: "https://github.com/AdeelAliYousaf", color: "text-gray-300 hover:text-white" },
  { icon: <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Instagram", url: "https://instagram.com/adeelportfolio", color: "text-pink-400 hover:text-pink-300" },
  { icon: <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Facebook", url: "https://facebook.com/adeelstopshate", color: "text-blue-600 hover:text-blue-500" },
];

// ...existing code...
const services = [
  "Static Website Development",
  "Dynamic Web Application",
  "E-commerce Solutions",
  "Custom Plugin/Extension Development",
  "Website Maintenance & Performance Optimization",
  "UI/UX Design & Consulting",
  "SEO & Analytics Implementation",
  "Content Migration & Data Management",
  "Mobile Application Development",
  "AI & Automation Solutions",
  "Data Visualization Dashboards",
  "Cloud Deployment & DevOps",
  "Security Audits & Implementation",
  "Code Review & Technical Consulting",
  "Technical Documentation & Training"
];

export default function ModernContactPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    service: "", 
    message: "", 
    images: [] 
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [lastSubmission, setLastSubmission] = useState(0);

  // Rate limiting
  const RATE_LIMIT_DELAY = 60000;

  function validateForm(formData) {
  const errs = {};

    // Name validation
    if (!formData.name.trim()) {
      errs.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      errs.name = "Name contains invalid characters.";
    }
    // Email validation
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    // Message validation
    if (formData.message.trim() && formData.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters if provided.";
    }
    
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmission < RATE_LIMIT_DELAY && attempts > 0) {
      errs.general = `Please wait ${Math.ceil((RATE_LIMIT_DELAY - (now - lastSubmission)) / 1000)} seconds before submitting again.`;
    }
    
    return errs;
  }

  function handleInputChange(e) {
    const { name, value, files } = e.target;
    if (name === "image" && files && files.length > 0) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      let validFiles = [];
      let previews = [];
      let error = undefined;
      for (let file of files) {
        if (!allowedTypes.includes(file.type)) {
          error = "Only JPEG, PNG, GIF, and WebP images are allowed.";
          break;
        }
        if (file.size > maxSize) {
          error = "Each image must be less than 5MB.";
          break;
        }
        validFiles.push(file);
        previews.push(URL.createObjectURL(file));
      }
      if (error) {
        setErrors(prev => ({ ...prev, image: error }));
        return;
      }
      setForm(prev => ({ ...prev, images: validFiles }));
      setImagePreviews(previews);
      setErrors(prev => ({ ...prev, image: undefined }));
    } else {
      // Sanitize input
      const sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      setForm(prev => ({ ...prev, [name]: sanitizedValue }));
      setErrors(prev => ({ ...prev, [name]: undefined, general: undefined }));
    }
  }

  async function sendEmail(formData) {
    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      service: formData.service || 'Not specified',
      message: formData.message || 'No message provided',
      // You can add more fields as needed, and configure your template in EmailJS dashboard
    };

    // Note: EmailJS does not support file attachments from the browser for free plans.
    // You can send image URLs or a note about attached images if needed.

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      return { success: true, result };
    } catch (error) {
      throw new Error(error?.text || "Failed to send email. Please try again.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const errs = validateForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    
    setSubmitting(true);
    setErrors({});
    
    try {
      await sendEmail(form);
      setSubmitted(true);
      setAttempts(prev => prev + 1);
      setLastSubmission(Date.now());
      
      // Clear form
  setForm({ name: "", email: "", service: "", message: "", images: [] });
  // Clean up all image preview URLs
  imagePreviews.forEach(url => URL.revokeObjectURL(url));
  setImagePreviews([]);
      
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  function handleSendAnother() {
    setSubmitted(false);
    setErrors({});
  }

  // Clean up image preview URL on component unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <div className="min-h-screen mb-16 flex flex-col items-center px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-16 text-center drop-shadow-2xl">
          Get In Touch
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Social Links */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Connect With Me
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link.color} p-3 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-start sm:justify-center group hover:scale-105 hover:shadow-lg border border-white/5 hover:border-white/20`}
                    aria-label={link.label}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <span className="text-sm sm:text-base font-medium">{link.label}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
          {/* Map (mobile last) */}
          <div className="lg:col-span-1 order-3 lg:order-none">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-64 relative">
                <iframe
                  title="Sialkot, Pakistan"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107699.22030302057!2d74.4599965885885!3d32.48337210613782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eea5674db6cfd%3A0xa8d03983946d4744!2sSialkot%2C%20Pakistan!5e0!3m2!1sen!2s!4v1759957657143!5m2!1sen!2s"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                {!submitted ? (
                  <div className="animate-in slide-in-from-right duration-500">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                      <FaPaperPlane className="text-blue-400" />
                      Send Message
                    </h2>
                    
                    {errors.general && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
                        <FaTimes />
                        {errors.general}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-white/90 font-medium flex items-center gap-2">
                            Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white border transition-all duration-300 placeholder-white/50 focus:outline-none focus:ring-2 focus:scale-105 ${
                              errors.name 
                                ? 'border-red-400 focus:ring-red-400/50' 
                                : 'border-white/20 focus:ring-blue-400/50 focus:border-blue-400'
                            }`}
                            maxLength={100}
                          />
                          {errors.name && (
                            <p className="text-red-400 text-sm flex items-center gap-2">
                              <FaTimes className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-white/90 font-medium flex items-center gap-2">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white border transition-all duration-300 placeholder-white/50 focus:outline-none focus:ring-2 focus:scale-105 ${
                              errors.email 
                                ? 'border-red-400 focus:ring-red-400/50' 
                                : 'border-white/20 focus:ring-blue-400/50 focus:border-blue-400'
                            }`}
                            maxLength={255}
                          />
                          {errors.email && (
                            <p className="text-red-400 text-sm flex items-center gap-2">
                              <FaTimes className="w-3 h-3" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-white/90 font-medium">Service Interested In</label>
                        <div className="relative">
                          <select
                            name="service"
                            value={form.service}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 focus:scale-105 max-h-56 overflow-y-auto"
                            style={{ maxHeight: '14rem' }}
                          >
                            <option value="">Select a service (optional)</option>
                            {services.map((service, i) => (
                              <option key={i} value={service} className="bg-slate-800">
                                {service}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-white/90 font-medium">Message</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleInputChange}
                          rows={5}
                          placeholder="Tell me about your project or inquiry..."
                          className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white border transition-all duration-300 placeholder-white/50 focus:outline-none focus:ring-2 focus:scale-105 resize-none ${
                            errors.message 
                              ? 'border-red-400 focus:ring-red-400/50' 
                              : 'border-white/20 focus:ring-blue-400/50 focus:border-blue-400'
                          }`}
                          maxLength={1000}
                        />
                        {errors.message && (
                          <p className="text-red-400 text-sm flex items-center gap-2">
                            <FaTimes className="w-3 h-3" />
                            {errors.message}
                          </p>
                        )}
                        <div className="text-right text-white/40 text-sm">
                          {form.message.length}/1000
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-white/90 font-medium">Attachments (Optional, you can select multiple images)</label>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          multiple
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                        {errors.image && (
                          <p className="text-red-400 text-sm flex items-center gap-2">
                            <FaTimes className="w-3 h-3" />
                            {errors.image}
                          </p>
                        )}
                        {imagePreviews.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-3">
                            {imagePreviews.map((url, idx) => (
                              <Image
                                key={idx}
                                src={url}
                                alt={`Preview ${idx+1}`}
                                className="max-h-32 rounded-xl border border-white/20 shadow-lg"
                                width={128}
                                height={128}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                          submitting
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl active:scale-95'
                        } text-white shadow-lg`}
                      >
                        {submitting ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-12 animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <FaCheck className="text-white text-2xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Message Sent Successfully! 🎉
                    </h2>
                    <p className="text-white/80 mb-8 text-lg">
                      Thank you for reaching out! I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={handleSendAnother}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
                    >
                      <FaRedo />
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
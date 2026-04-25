"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CircleHelp, Clock, Headset, Phone, Send } from "lucide-react";
import { FaEnvelope } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";

// UI Components
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// Shared Components
import PageHeader from "@/components/shared/PageHeader";

export default function Contact() {
  const [pending, setPending] = useState(false);

  /**
   * Simulate form submission with a fake delay
   * @param e - Form event
   */
  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    setTimeout(() => {
      setPending(false);
      toast.success("Success! Your message has been sent.");
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  /**
   * Unified page header configuration
   */
  const pageDetails = {
    title: "Contact Us",
    parentName: "",
    parentLink: "",
    image: null,
    icon: <Headset size={28} className="text-white" />,
    description: "We'd love to hear from you. Get in touch with our team.",
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* 1. Page Header Component */}
      <PageHeader details={pageDetails} hasFilters={false} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 2. Sidebar: Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <ContactInfoCard
              icon={<Phone size={18} className="text-green-600" />}
              title="Phone"
              content={
                <a
                  href="tel:+18001234567"
                  className="text-green-600 font-medium hover:underline"
                >
                  +1 (800) 123-4567
                </a>
              }
              subtext="Mon-Fri from 8am to 6pm"
            />

            <ContactInfoCard
              icon={<FaEnvelope className="text-green-600 text-lg" />}
              title="Email"
              content={
                <a
                  href="mailto:support@freshcart.com"
                  className="text-green-600 font-medium hover:underline"
                >
                  support@freshcart.com
                </a>
              }
              subtext="We'll respond within 24 hours"
            />

            <ContactInfoCard
              icon={<FaLocationDot className="text-green-600 text-lg" />}
              title="Office"
              content={
                <p className="text-gray-500 text-sm">
                  123 Commerce Street <br /> New York, NY 10001 <br /> United
                  States
                </p>
              }
            />

            <ContactInfoCard
              icon={<Clock size={18} className="text-green-600" />}
              title="Business Hours"
              content={
                <p className="text-gray-500 text-sm">
                  Monday - Friday: 8am - 6pm <br /> Saturday: 9am - 4pm <br />{" "}
                  Sunday: Closed
                </p>
              }
            />

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex items-center gap-3">
                <SocialIcon href="#" icon={<FaFacebookF />} />
                <SocialIcon href="#" icon={<FaTwitter />} />
                <SocialIcon href="#" icon={<FaInstagram />} />
                <SocialIcon href="#" icon={<FaLinkedinIn />} />
              </div>
            </div>
          </div>

          {/* 3. Main Column: Message Form and Help Center */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Headset size={18} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Fill out the form and we&apos;ll get back to you
                  </p>
                </div>
              </div>

              <form onSubmit={handleFakeSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field>
                    <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                    <Input
                      id="full-name"
                      placeholder="John Doe"
                      required
                      className="rounded-xl h-12"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="rounded-xl h-12"
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel>Subject</FieldLabel>
                  <Select required>
                    <SelectTrigger className="rounded-xl h-12">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="shipping">
                          Shipping Question
                        </SelectItem>
                        <SelectItem value="returns">
                          Returns & Refunds
                        </SelectItem>
                        <SelectItem value="product">
                          Product Information
                        </SelectItem>
                        <SelectItem value="feedback">
                          Feedback & Suggestions
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
                  <Textarea
                    id="textarea-message"
                    placeholder="How can we help you?"
                    required
                    className="min-h-37 rounded-xl"
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={pending}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                >
                  {pending ? (
                    <Spinner className="w-4 h-4" />
                  ) : (
                    <Send size={18} />
                  )}
                  {pending ? "Sending..." : "Submit Message"}
                </Button>
              </form>
            </div>

            {/* Support/Help Center Link Section */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <CircleHelp size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Looking for quick answers?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Check out our Help Center for frequently asked questions
                    about orders, shipping, returns, and more.
                  </p>
                  <Link
                    href="/help"
                    className="text-green-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Visit Help Center →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable card component for contact information
 */
function ContactInfoCard({
  icon,
  title,
  content,
  subtext,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  subtext?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          {subtext && <p className="text-gray-500 text-sm mb-2">{subtext}</p>}
          {content}
        </div>
      </div>
    </div>
  );
}

/**
 * Circular social media icon button
 */
function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-colors"
    >
      {icon}
    </a>
  );
}

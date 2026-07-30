"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: "Email",
    value: "hello@venuze.com",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+44 20 1234 5678",
  },
  {
    icon: MapPinIcon,
    label: "Address",
    value: "123 Venue Street, London, UK",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    reset();
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-dark-brown py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Have a question or want to work together? We&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-dark-brown mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-button bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm text-dark-brown/60">{info.label}</p>
                      <p className="font-medium text-dark-brown">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-accent-beige rounded-card">
                <h3 className="font-semibold text-dark-brown mb-2">
                  Office Hours
                </h3>
                <p className="text-sm text-dark-brown/60">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-sm text-dark-brown/60">
                  Saturday: 10:00 AM - 4:00 PM
                </p>
                <p className="text-sm text-dark-brown/60">
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">✓</span>
                      </div>
                      <h3 className="text-xl font-semibold text-dark-brown mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-dark-brown/60 mb-6">
                        Thank you for reaching out. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => setSubmitted(false)}
                      >
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label="Name"
                          placeholder="Your name"
                          error={errors.name?.message}
                          {...register("name")}
                        />
                        <Input
                          label="Email"
                          type="email"
                          placeholder="your@email.com"
                          error={errors.email?.message}
                          {...register("email")}
                        />
                      </div>
                      <Input
                        label="Subject"
                        placeholder="How can we help?"
                        error={errors.subject?.message}
                        {...register("subject")}
                      />
                      <div>
                        <label className="block text-sm font-medium text-dark-brown mb-1">
                          Message
                        </label>
                        <textarea
                          rows={5}
                          placeholder="Tell us more about your inquiry..."
                          className="w-full rounded-button border border-gray-300 bg-white px-3 py-2 text-dark-brown placeholder-gray-400 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          {...register("message")}
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.message.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full sm:w-auto"
                        isLoading={isSubmitting}
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

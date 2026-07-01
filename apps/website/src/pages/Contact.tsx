import { useState } from "react";
import { Mail, MapPin, Linkedin, Globe, Send, CheckCircle } from "lucide-react";
import { useSubmitContact, useSubscribeNewsletter } from "@workspace/api-client";
import { useToast } from "@/hooks/use-toast";
import SectionHeader from "@/components/SectionHeader";

export default function Contact() {
  const submitContact = useSubmitContact();
  const subscribeNewsletter = useSubscribeNewsletter();
  const { toast } = useToast();

  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate(
      { data: contactForm },
      {
        onSuccess: () => {
          setContactSuccess(true);
          setContactForm({ name: "", email: "", subject: "", message: "" });
          toast({ title: "Message sent!", description: "We'll get back to you within 48 hours." });
        },
        onError: () => toast({ title: "Error", description: "Could not send message. Please try again.", variant: "destructive" }),
      }
    );
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeNewsletter.mutate(
      { data: { email: newsletterEmail, name: newsletterName || undefined } },
      {
        onSuccess: () => {
          setNewsletterSuccess(true);
          setNewsletterEmail("");
          setNewsletterName("");
          toast({ title: "Subscribed!", description: "Welcome to the MEDX community." });
        },
        onError: () => toast({ title: "Error", description: "Could not subscribe. Try again.", variant: "destructive" }),
      }
    );
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Get in Touch</div>
          <h1 className="text-5xl font-bold font-serif mb-6 text-primary-foreground leading-tight">
            We'd Love to
            <br />
            <span className="text-secondary italic">Hear From You</span>
          </h1>
          <p className="text-xl text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Questions about our programs, partnerships, or how to get involved? Reach out and a member of our team will respond within 48 hours.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background" data-testid="section-contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-primary font-serif mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">Email</div>
                    <a href="mailto:info@medx.org" className="text-muted-foreground text-sm hover:text-secondary transition-colors" data-testid="link-contact-email">
                      info@medx.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">Based In</div>
                    <p className="text-muted-foreground text-sm">Toronto, Ontario, Canada<br />Operating globally across 12 countries</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Linkedin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">LinkedIn</div>
                    <a href="https://linkedin.com/company/medx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-secondary transition-colors" data-testid="link-contact-linkedin">
                      linkedin.com/company/medx
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">Response Time</div>
                    <p className="text-muted-foreground text-sm">We typically respond within 24–48 hours during business days.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-muted/40 rounded-xl border border-border">
                <h3 className="font-bold text-primary mb-2 text-sm uppercase tracking-wide">Looking to Partner?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We welcome partnerships with medical schools, hospitals, research institutions, and health organizations. Reach out to discuss collaboration opportunities.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {contactSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-12 text-center" data-testid="contact-success">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600">Thank you for reaching out. We'll get back to you within 48 hours.</p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="mt-6 text-sm text-green-700 underline hover:no-underline"
                    data-testid="button-send-another"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Dr. Jane Smith"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="jane@example.com"
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Program inquiry, partnership, general question..."
                      data-testid="input-contact-subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder="Tell us how we can help..."
                      data-testid="input-contact-message"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitContact.isPending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    data-testid="button-submit-contact"
                  >
                    {submitContact.isPending ? "Sending..." : (<><Send className="h-4 w-4" /> Send Message</>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-muted/30 border-t border-border" data-testid="section-newsletter-contact">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <SectionHeader
            eyebrow="Stay Connected"
            title="Subscribe to Our Newsletter"
            subtitle="Monthly updates on events, programs, research opportunities, and student success stories from the MEDX community."
          />
          {newsletterSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center" data-testid="newsletter-success">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-green-800 mb-1">You're Subscribed!</h3>
              <p className="text-green-600 text-sm">Welcome to the MEDX community. Watch your inbox for our next update.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="space-y-4" data-testid="form-newsletter">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  data-testid="input-newsletter-name"
                />
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  data-testid="input-newsletter-email"
                />
              </div>
              <button
                type="submit"
                disabled={subscribeNewsletter.isPending}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                data-testid="button-newsletter-subscribe"
              >
                {subscribeNewsletter.isPending ? "Subscribing..." : "Subscribe to Newsletter"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

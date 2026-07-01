import { Link } from "wouter";
import { Mail, Linkedin, Globe, Heart } from "lucide-react";
import medxLogo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={medxLogo} alt="MEDX Logo" className="h-12 w-12 object-contain rounded-full bg-white/10" />
              <div>
                <div className="font-bold text-xl">MEDX</div>
                <div className="text-primary-foreground/70 text-sm">Medical Education & Development Exchange</div>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
              A student-led organization dedicated to advancing medical research literacy, education, and student empowerment across the globe.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="mailto:info@medx.org" className="text-primary-foreground/60 hover:text-secondary transition-colors" data-testid="link-footer-email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors" data-testid="link-footer-linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors" data-testid="link-footer-website">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-secondary mb-4">Navigate</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/programs", label: "Programs" },
                { href: "/events", label: "Events" },
                { href: "/team", label: "Team" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-secondary transition-colors" data-testid={`link-footer-${link.label.toLowerCase()}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-secondary mb-4">Programs</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {["Research Mentorship", "Medical Education", "Student Empowerment", "Global Health", "Academic Writing", "Peer Mentorship"].map((p) => (
                <li key={p}>
                  <Link href="/programs" className="hover:text-secondary transition-colors">{p}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} MEDX — Medical Education and Development Exchange. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-secondary fill-secondary" /> by medical students, for medical students
          </p>
        </div>
      </div>
    </footer>
  );
}

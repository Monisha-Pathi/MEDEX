import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import medxLogo from "@assets/Screenshot_2026-06-01_at_10.03.10_PM_1780639590051.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center text-primary-foreground px-4">
      <div className="text-center">
        <img src={medxLogo} alt="MEDX Logo" className="h-20 w-20 object-contain mx-auto mb-8 rounded-full ring-4 ring-secondary/30" />
        <div className="text-secondary font-bold text-8xl font-serif mb-4">404</div>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-primary-foreground/60 mb-8 max-w-sm mx-auto">This page does not exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          data-testid="link-back-home"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

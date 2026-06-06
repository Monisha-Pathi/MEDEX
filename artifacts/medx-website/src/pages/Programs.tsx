import { BookOpen, FlaskConical, Users, Globe, Award, GraduationCap, CheckCircle } from "lucide-react";
import { useListPrograms } from "@workspace/api-client-react";
import SectionHeader from "@/components/SectionHeader";
import { Link } from "wouter";

const iconMap: Record<string, React.ElementType> = {
  FlaskConical, BookOpen, Users, Globe, Award, GraduationCap,
  PenLine: BookOpen,
  HandshakeIcon: Users,
};

const categoryLabels: Record<string, string> = {
  education: "Education",
  research: "Research",
  mentorship: "Mentorship",
  empowerment: "Empowerment",
  outreach: "Global Outreach",
};

const categoryColors: Record<string, string> = {
  education: "bg-blue-100 text-blue-800 border-blue-200",
  research: "bg-purple-100 text-purple-800 border-purple-200",
  mentorship: "bg-green-100 text-green-800 border-green-200",
  empowerment: "bg-amber-100 text-amber-800 border-amber-200",
  outreach: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function Programs() {
  const { data: programsData, isLoading } = useListPrograms();
  const programs = Array.isArray(programsData) ? programsData : [];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Programs & Initiatives</div>
          <h1 className="text-5xl font-bold font-serif mb-6 text-primary-foreground leading-tight">
            Programs Designed to
            <br />
            <span className="text-secondary italic">Transform</span> Your Career
          </h1>
          <p className="text-xl text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Six structured programs spanning research, education, mentorship, empowerment, and global health — each one built by students who know what you need.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 bg-background" data-testid="section-programs-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl border border-card-border bg-card p-8 animate-pulse">
                  <div className="w-12 h-12 rounded-lg bg-muted mb-4" />
                  <div className="h-6 bg-muted rounded mb-3 w-2/3" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program) => {
                const Icon = iconMap[program.icon || "BookOpen"] || BookOpen;
                return (
                  <div
                    key={program.id}
                    className="bg-card rounded-xl border border-card-border p-8 hover:shadow-lg transition-all group"
                    data-testid={`card-program-${program.id}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
                      </div>
                      <div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[program.category] || "bg-muted text-muted-foreground border-border"}`}>
                          {categoryLabels[program.category] || program.category}
                        </span>
                        <h3 className="text-xl font-bold text-primary mt-2 group-hover:text-secondary transition-colors">{program.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">{program.description}</p>
                    {program.benefits && program.benefits.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">What You Get</h4>
                        <ul className="space-y-2">
                          {program.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`benefit-${program.id}-${i}`}>
                              <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">No programs available.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30 border-t border-border" data-testid="section-programs-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary font-serif mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Join MEDX today and gain access to all our programs, events, and community resources.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              data-testid="link-programs-apply"
            >
              Apply Now
            </Link>
            <Link
              href="/events"
              className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              data-testid="link-programs-events"
            >
              See Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from "wouter";
import { ArrowRight, Users, Calendar, BookOpen, Globe, ChevronRight } from "lucide-react";
import {
  useGetStats,
  useListUpcomingEvents,
  useListPrograms,
  useListLeadership,
  useSubscribeNewsletter,
} from "@workspace/api-client";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import medxLogo from "@/assets/logo.png";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const categoryColors: Record<string, string> = {
  workshop: "bg-amber-100 text-amber-800",
  seminar: "bg-blue-100 text-blue-800",
  webinar: "bg-purple-100 text-purple-800",
  competition: "bg-red-100 text-red-800",
  social: "bg-green-100 text-green-800",
  conference: "bg-primary/10 text-primary",
};

export default function Home() {
  const { data: stats } = useGetStats();
  const { data: upcomingEventsData } = useListUpcomingEvents();
  const { data: programsData } = useListPrograms();
  const { data: leadershipData } = useListLeadership();
  const upcomingEvents = Array.isArray(upcomingEventsData) ? upcomingEventsData : [];
  const programs = Array.isArray(programsData) ? programsData : [];
  const leadership = Array.isArray(leadershipData) ? leadershipData : [];
  const subscribeNewsletter = useSubscribeNewsletter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeNewsletter.mutate(
      { data: { email } },
      {
        onSuccess: () => {
          toast({ title: "Subscribed!", description: "You're now on the MEDX mailing list." });
          setEmail("");
        },
        onError: () => toast({ title: "Error", description: "Could not subscribe. Try again.", variant: "destructive" }),
      }
    );
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, hsl(46 65% 52%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(46 65% 52%) 0%, transparent 40%)",
          }}
        />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <img
            src={medxLogo}
            alt="MEDX Logo"
            className="h-28 w-28 object-contain mx-auto mb-8 rounded-full ring-4 ring-secondary/30"
            data-testid="img-hero-logo"
          />
          <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Medical Education & Development Exchange</div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6 font-serif">
            Empowering the Next
            <br />
            <span className="text-secondary italic">Generation</span> of Physicians
          </h1>
          <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            A student-led organization dedicated to advancing medical research literacy, education, and professional development for students worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold text-base hover:opacity-90 transition-all hover:shadow-lg"
              data-testid="link-hero-programs"
            >
              Explore Programs <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary-foreground/30 text-primary-foreground rounded-lg font-semibold text-base hover:bg-primary-foreground/10 transition-all"
              data-testid="link-hero-about"
            >
              Our Mission <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/40">
          <div className="w-px h-12 bg-primary-foreground/20 animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="py-16 bg-secondary/10 border-y border-border" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Members", value: stats.totalMembers || "500+", icon: Users },
                { label: "Events Hosted", value: stats.totalEvents || "50+", icon: Calendar },
                { label: "Programs", value: stats.totalPrograms || "6", icon: BookOpen },
                { label: "Countries", value: stats.totalCountries || "12", icon: Globe },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2" data-testid={`stat-${stat.label.toLowerCase().replace(" ", "-")}`}>
                  <stat.icon className="h-6 w-6 text-secondary" />
                  <div className="text-4xl font-bold text-primary font-serif">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="py-24 bg-background" data-testid="section-upcoming-events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Events"
            title="Upcoming Opportunities"
            subtitle="Join workshops, seminars, and competitions designed to accelerate your growth as a medical student and future physician."
          />
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {upcomingEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="bg-card rounded-xl border border-card-border p-6 hover:shadow-lg transition-shadow group"
                  data-testid={`card-event-${event.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[event.category] || "bg-muted text-muted-foreground"}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(event.date)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{event.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
                  <div className="text-xs text-muted-foreground font-medium">{event.location}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">No upcoming events at this time.</div>
          )}
          <div className="text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all"
              data-testid="link-view-all-events"
            >
              View All Events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-muted/30" data-testid="section-programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Offer"
            title="Programs & Initiatives"
            subtitle="From research mentorship to global health outreach, MEDX offers structured programs designed to complement your medical education."
          />
          {programs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {programs.slice(0, 6).map((program, i) => (
                <div
                  key={program.id}
                  className="bg-card rounded-xl border border-card-border p-6 hover:shadow-md hover:border-secondary/40 transition-all group"
                  data-testid={`card-program-${program.id}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{program.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{program.description}</p>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">{program.category}</div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all"
              data-testid="link-view-all-programs"
            >
              Explore All Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative" data-testid="section-mission">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 70% 50%, hsl(46 65% 52%) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Our Mission</div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                Bridging the Gap Between Education and Excellence
              </h2>
              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-6">
                MEDX was founded on the belief that every medical student deserves access to high-quality research mentorship, educational resources, and a supportive community of peers and professionals.
              </p>
              <p className="text-primary-foreground/70 leading-relaxed mb-8">
                We operate across 12 countries, connecting students with opportunities that would otherwise be out of reach — from their first research project to presenting at international conferences.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-secondary text-secondary rounded-lg font-medium hover:bg-secondary hover:text-secondary-foreground transition-all"
                data-testid="link-learn-more-about"
              >
                Learn Our Story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Student-Led", desc: "Run by medical students who understand your challenges firsthand." },
                { label: "Research-Focused", desc: "Building research literacy from day one of medical school." },
                { label: "Globally Connected", desc: "A network spanning 12 countries and growing." },
                { label: "Outcome-Driven", desc: "Measurable impact through publications, presentations, and careers." },
              ].map((item) => (
                <div key={item.label} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-5 hover:bg-primary-foreground/10 transition-colors">
                  <div className="text-secondary font-bold text-sm mb-2">{item.label}</div>
                  <div className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Snapshot */}
      {leadership.length > 0 && (
        <section className="py-24 bg-background" data-testid="section-leadership">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Leadership"
              title="Meet the Team"
              subtitle="MEDX is led by passionate medical students and faculty committed to transforming student medical education."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {leadership.slice(0, 4).map((member) => (
                <div key={member.id} className="text-center group" data-testid={`card-leader-${member.id}`}>
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-secondary/30 flex items-center justify-center mx-auto mb-4 group-hover:border-secondary transition-colors">
                    <Users className="h-8 w-8 text-primary/40" />
                  </div>
                  <h3 className="font-bold text-primary text-base mb-1">{member.name}</h3>
                  <p className="text-sm text-secondary font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                data-testid="link-view-full-team"
              >
                Full Team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 bg-secondary/10 border-y border-border" data-testid="section-newsletter">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">Stay Updated</div>
          <h2 className="text-3xl font-bold text-primary font-serif mb-4">Join the MEDX Community</h2>
          <p className="text-muted-foreground mb-8">Get updates on events, programs, research opportunities, and more — delivered directly to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="input-newsletter-email"
            />
            <button
              type="submit"
              disabled={subscribeNewsletter.isPending}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              data-testid="button-newsletter-subscribe"
            >
              {subscribeNewsletter.isPending ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

import { Calendar, MapPin, ExternalLink, Clock } from "lucide-react";
import { useListEvents, useListUpcomingEvents } from "@workspace/api-client";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  workshop: "bg-amber-100 text-amber-800 border-amber-200",
  seminar: "bg-blue-100 text-blue-800 border-blue-200",
  webinar: "bg-purple-100 text-purple-800 border-purple-200",
  competition: "bg-red-100 text-red-800 border-red-200",
  social: "bg-green-100 text-green-800 border-green-200",
  conference: "bg-primary/10 text-primary border-primary/20",
};

const categories = ["all", "workshop", "seminar", "webinar", "competition", "social", "conference"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
}

function EventCard({ event, upcoming = false }: { event: any; upcoming?: boolean }) {
  return (
    <div
      className={`bg-card rounded-xl border p-6 hover:shadow-lg transition-all group ${upcoming ? "border-secondary/30" : "border-card-border"}`}
      data-testid={`card-event-${event.id}`}
    >
      {upcoming && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          Upcoming
        </div>
      )}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors leading-tight">{event.title}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${categoryColors[event.category] || "bg-muted text-muted-foreground border-border"}`}>
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{event.description}</p>
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-secondary" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-secondary" />
          <span>{formatTime(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-secondary" />
          <span>{event.location}</span>
        </div>
      </div>
      {event.registrationUrl && (
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
          data-testid={`link-register-${event.id}`}
        >
          Register Now <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

export default function Events() {
  const { data: allEventsData, isLoading } = useListEvents();
  const { data: upcomingEventsData } = useListUpcomingEvents();
  const [filter, setFilter] = useState("all");

  const allEvents = Array.isArray(allEventsData) ? allEventsData : [];
  const upcomingEvents = Array.isArray(upcomingEventsData) ? upcomingEventsData : [];
  const pastEvents = allEvents.filter((e) => !e.isUpcoming);
  const filteredUpcoming = upcomingEvents.filter((e) => filter === "all" || e.category === filter);
  const filteredPast = pastEvents.filter((e) => filter === "all" || e.category === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Events</div>
          <h1 className="text-5xl font-bold font-serif mb-6 text-primary-foreground leading-tight">
            Workshops, Conferences,
            <br />
            <span className="text-secondary italic">& More</span>
          </h1>
          <p className="text-xl text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
            From hands-on research workshops to our flagship annual conference, MEDX hosts events that accelerate your medical career.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-background border-b border-border sticky top-16 z-40" data-testid="section-filter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
                data-testid={`button-filter-${cat}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-background" data-testid="section-upcoming">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Don't Miss Out" title="Upcoming Events" centered={false} />
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-card-border bg-card p-6 animate-pulse">
                  <div className="h-5 bg-muted rounded mb-3 w-3/4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcoming.map((event) => (
                <EventCard key={event.id} event={event} upcoming />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-border">
              No upcoming events match this filter.
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {filteredPast.length > 0 && (
        <section className="py-16 bg-muted/30 border-t border-border" data-testid="section-past">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Archive" title="Past Events" centered={false} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
              {filteredPast.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

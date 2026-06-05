import { BookOpen, Globe, Users, Award, Target, Lightbulb, Shield, Heart } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import medxLogo from "@assets/Screenshot_2026-06-01_at_10.03.10_PM_1780639590051.png";

const values = [
  { icon: Target, title: "Excellence", desc: "We hold ourselves to the highest academic and professional standards in everything we do." },
  { icon: Heart, title: "Empathy", desc: "We understand the pressures of medical school and design every program with student wellbeing in mind." },
  { icon: Globe, title: "Inclusivity", desc: "MEDX is open to all medical students regardless of background, institution, or specialty interest." },
  { icon: Lightbulb, title: "Innovation", desc: "We continually evolve our programs to meet the changing landscape of medical education." },
  { icon: Shield, title: "Integrity", desc: "We uphold rigorous standards of academic integrity and ethical conduct across all activities." },
  { icon: Users, title: "Community", desc: "We believe the best medical education happens in connection with peers, mentors, and the wider profession." },
];

const milestones = [
  { year: "2019", event: "MEDX founded by a group of motivated medical students at the University of Toronto." },
  { year: "2020", event: "Launched our first Research Mentorship Program, pairing 20 students with faculty researchers." },
  { year: "2021", event: "Expanded internationally, welcoming members from 5 countries across 3 continents." },
  { year: "2022", event: "Hosted first annual conference with over 200 attendees and 80 research presentations." },
  { year: "2023", event: "Launched the Global Health Outreach program and Student Empowerment Initiative." },
  { year: "2024", event: "Reached 12 countries and 500+ active members. Launched Academic Writing Workshop Series." },
  { year: "2025", event: "Partnered with 15 medical schools to formally integrate MEDX programming." },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={medxLogo} alt="MEDX Logo" className="h-20 w-20 object-contain mx-auto mb-6 rounded-full ring-4 ring-secondary/30" />
          <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">About MEDX</div>
          <h1 className="text-5xl font-bold font-serif mb-6 text-primary-foreground leading-tight">
            A Community Built by Students,
            <br />
            <span className="text-secondary italic">for Students</span>
          </h1>
          <p className="text-xl text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
            MEDX is a student-led medical research, education, and student empowerment organization that believes every medical student deserves the tools to thrive.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background" data-testid="section-mission-vision">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">Mission</div>
              <h2 className="text-3xl font-bold text-primary font-serif mb-4">Why We Exist</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                MEDX exists to close the gap between medical education as it is and as it should be. Too many medical students graduate without ever conducting meaningful research, without ever experiencing structured mentorship, or without the professional networks that open doors to leadership.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We build the programs, community, and experiences that give every medical student — regardless of their institution or background — the foundation to become not just a competent clinician, but a leader in medicine.
              </p>
            </div>
            <div>
              <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">Vision</div>
              <h2 className="text-3xl font-bold text-primary font-serif mb-4">Where We're Going</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We envision a world where every medical student, anywhere on earth, has access to the mentorship, research skills, and professional community they need to reach their full potential.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                MEDX will grow into a globally recognized standard of student medical education — a network of thousands of students, physicians, and researchers working together to advance medicine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our Core Values"
            subtitle="Every program we build, every event we host, and every member we support is guided by these principles."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-xl border border-card-border p-6 hover:shadow-md transition-shadow" data-testid={`card-value-${v.title.toLowerCase()}`}>
                <v.icon className="h-8 w-8 text-secondary mb-4" />
                <h3 className="font-bold text-primary text-base mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background" data-testid="section-timeline">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Journey"
            title="MEDX Through the Years"
            subtitle="From a small group of students with a big idea to a global network of future physicians."
          />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex gap-8 items-start" data-testid={`timeline-item-${i}`}>
                  <div className="relative z-10 w-16 flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-secondary border-2 border-background shadow-sm mx-auto" />
                  </div>
                  <div className="pb-2">
                    <div className="text-secondary font-bold text-sm mb-1">{m.year}</div>
                    <p className="text-muted-foreground leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes MEDX Unique */}
      <section className="py-24 bg-primary text-primary-foreground" data-testid="section-unique">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why MEDX" title="What Makes Us Different" light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "100% Student-Led", desc: "Every program, event, and initiative is designed and delivered by medical students who know exactly what their peers need." },
              { icon: BookOpen, title: "Evidence-Based Approach", desc: "We apply the same rigor to program design that we promote in research — every initiative is evaluated for impact and continuously improved." },
              { icon: Award, title: "Real Outcomes", desc: "Our members publish papers, present at conferences, win awards, and match into competitive residencies at higher rates." },
            ].map((item) => (
              <div key={item.title} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-8" data-testid={`card-unique-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <item.icon className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-primary-foreground">{item.title}</h3>
                <p className="text-primary-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

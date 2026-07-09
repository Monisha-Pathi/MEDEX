import { Users, Mail, Linkedin, User } from "lucide-react";
import { useListTeamMembers, useListLeadership } from "@workspace/api-client";
import SectionHeader from "@/components/SectionHeader";

const departmentColors: Record<string, string> = {
  Leadership: "bg-primary/10 text-primary",
  Research: "bg-purple-100 text-purple-800",
  Education: "bg-blue-100 text-blue-800",
  Operations: "bg-amber-100 text-amber-800",
  Communications: "bg-green-100 text-green-800",
  General: "bg-muted text-muted-foreground",
};

const globalOfficersData = [
  {
    group: "Founder & CEO",
    members: [
      { name: "Sangeen Khan", role: "CEO & Founder MEDX", affiliation: "Bolan Medical College, Quetta Balochistan" },
    ],
  },
  {
    group: "Mentors",
    members: [
      { name: "Dr. Bisma Bashir", role: "Mentor for SRMA & Co-Lead LTE", affiliation: "People University, Sindh" },
      { name: "Dr. Sasha Zaki", role: "Mentor for LTE", affiliation: "JSMU, House Officer" },
      { name: "Dr. Abdul Moiz", role: "Mentor for SRMA & MEDX Media Face", affiliation: "LUMHS Jamshoro" },
      { name: "Dr. Zohaib Hassan", role: "Mentor for SRMA", affiliation: "PMC Faisalabad" },
    ],
  },
  {
    group: "External Affairs & Partnerships",
    members: [
      { name: "Aditya Amarjeet Singh", role: "Chief Officer & MEDX Media Face", affiliation: "Allen High School, USA" },
      { name: "Dr. Sheikh Mohammed Kamil", role: "Director", affiliation: "IHSM Kyrgyzstan" },
      { name: "Dr. Syeda Momina", role: "Head", affiliation: "KMU Peshawar" },
    ],
  },
  {
    group: "Educationist",
    members: [
      { name: "Fahima Hussain Muna", role: "", affiliation: "Dhaka University, Bangladesh" },
      { name: "Soham Biren Katlariwala", role: "", affiliation: "Institute of Technology, Madras India" },
    ],
  },
  {
    group: "Advanced Researchers",
    members: [
      { name: "Dr. Tarooba Khan", role: "Chief Officer", affiliation: "JSMU Karachi" },
      { name: "Sana Tibrewal", role: "Director", affiliation: "Allen High School, USA" },
      { name: "Dr. Amna Ahmed", role: "Head", affiliation: "RMU Rawalpindi" },
    ],
  },
  {
    group: "Web-Developers",
    members: [
      { name: "Shanmuka", role: "Chief Technology Officer", affiliation: "USA" },
      { name: "Monisha", role: "Manager Tech & Web Development", affiliation: "USA" },
    ],
  },
  {
    group: "Supervisors",
    members: [
      { name: "Smyan Reddy", role: "Chief Advisor", affiliation: "USA" },
      { name: "Dr. Anshika Jaiswal", role: "Director Graphic Design & Social Impact", affiliation: "" },
    ],
  },
];

function OfficerCard({ officer }: { officer: { name: string; role: string; affiliation: string } }) {
  return (
    <div className="bg-card rounded-xl border border-card-border p-5 hover:shadow-md hover:border-secondary/40 transition-all text-center">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-secondary/20 border-2 border-secondary/30 flex items-center justify-center mx-auto mb-3">
        <User className="h-6 w-6 text-primary/50" />
      </div>
      <h3 className="font-bold text-primary text-sm leading-tight mb-1">{officer.name}</h3>
      {officer.role && (
        <p className="text-xs text-secondary font-medium mb-0.5">{officer.role}</p>
      )}
      {officer.affiliation && (
        <p className="text-xs text-muted-foreground">{officer.affiliation}</p>
      )}
    </div>
  );
}

function MemberCard({ member, featured = false }: { member: any; featured?: boolean }) {
  return (
    <div
      className={`bg-card rounded-xl border border-card-border p-6 hover:shadow-md transition-all group ${featured ? "text-center" : ""}`}
      data-testid={`card-member-${member.id}`}
    >
      <div className={`w-20 h-20 rounded-full bg-primary/10 border-2 border-secondary/20 flex items-center justify-center ${featured ? "mx-auto mb-4" : "mb-4"} group-hover:border-secondary transition-colors`}>
        <Users className="h-8 w-8 text-primary/40" />
      </div>
      <div className={`${featured ? "" : "flex items-start justify-between gap-2"} mb-2`}>
        <div>
          <h3 className="font-bold text-primary text-base">{member.name}</h3>
          <p className="text-sm text-secondary font-medium">{member.role}</p>
        </div>
        {!featured && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${departmentColors[member.department] || "bg-muted text-muted-foreground"}`}>
            {member.department}
          </span>
        )}
      </div>
      {featured && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-3 ${departmentColors[member.department] || "bg-muted text-muted-foreground"}`}>
          {member.department}
        </span>
      )}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
      <div className={`flex items-center gap-3 ${featured ? "justify-center" : ""}`}>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="text-muted-foreground hover:text-secondary transition-colors"
            data-testid={`link-email-${member.id}`}
          >
            <Mail className="h-4 w-4" />
          </a>
        )}
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-secondary transition-colors"
            data-testid={`link-linkedin-${member.id}`}
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Team() {
  const { data: leadershipData, isLoading: loadingLeadership } = useListLeadership();
  const { data: allMembersData, isLoading: loadingAll } = useListTeamMembers();

  const leadership = Array.isArray(leadershipData) ? leadershipData : [];
  const allMembers = Array.isArray(allMembersData) ? allMembersData : [];
  const nonLeadership = allMembers.filter((m) => !m.isLeadership);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Our People</div>
          <h1 className="text-5xl font-bold font-serif mb-6 text-primary-foreground leading-tight">
            The People Behind
            <br />
            <span className="text-secondary italic">MEDX</span>
          </h1>
          <p className="text-xl text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Every member of the MEDX team is a medical student or faculty member committed to advancing student success in medicine.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-background" data-testid="section-leadership">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Leadership Team"
            title="Meet Our Leaders"
            subtitle="Our leadership team brings together the energy of student life with the wisdom of experienced medical professionals."
          />
          {loadingLeadership ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-card-border p-6 animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4" />
                  <div className="h-5 bg-muted rounded mb-2 w-2/3 mx-auto" />
                  <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : leadership && leadership.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((member) => (
                <MemberCard key={member.id} member={member} featured />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">No leadership members found.</div>
          )}
        </div>
      </section>

      {/* Global Main Officers */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20 border-t border-border" data-testid="section-global-officers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Announcement</div>
            <h2 className="text-4xl font-bold font-serif text-primary mb-6 leading-tight">
              Global Main Officers
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Team MEDX R&amp;Ed proudly announce the selection of following
              {" "}<span className="text-primary font-semibold">"Global Main Officers"</span>
              {" "}and looking forward to work with you.
            </p>
          </div>

          {globalOfficersData.map((section) => (
            <div key={section.group} className="mb-14 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-border" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{section.group}</h3>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.members.map((member) => (
                  <OfficerCard key={member.name} officer={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Members */}
      {nonLeadership.length > 0 && (
        <section className="py-24 bg-muted/30 border-t border-border" data-testid="section-members">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="The Team"
              title="Committee Members"
              subtitle="Our committees are where the work happens. Each member brings specialist expertise and unmatched dedication to their area."
            />
            {loadingAll ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-xl border border-card-border p-6 animate-pulse">
                    <div className="h-5 bg-muted rounded mb-2 w-2/3" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nonLeadership.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Join the Team */}
      <section className="py-20 bg-primary text-primary-foreground" data-testid="section-join-team">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Get Involved</div>
          <h2 className="text-3xl font-bold font-serif mb-4">Want to Join the MEDX Team?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
            We're always looking for passionate medical students to join our committees and help shape the future of medical education.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            data-testid="link-join-team"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

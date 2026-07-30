import { Card, CardContent } from "@/components/ui/Card";

const stats = [
  { label: "Venues Listed", value: "1,200+" },
  { label: "Happy Customers", value: "15,000+" },
  { label: "Events Hosted", value: "8,500+" },
  { label: "Cities Covered", value: "50+" },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Passionate about creating memorable experiences through unique venues.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Building technology that connects people with perfect spaces.",
  },
  {
    name: "Emma Williams",
    role: "Head of Design",
    bio: "Crafting beautiful interfaces that make venue discovery effortless.",
  },
  {
    name: "James Brown",
    role: "Head of Operations",
    bio: "Ensuring every event runs smoothly from booking to execution.",
  },
];

const values = [
  {
    title: "Curated Quality",
    description:
      "Every venue on our platform is carefully vetted to ensure it meets our high standards for quality and service.",
  },
  {
    title: "Customer First",
    description:
      "We put our customers at the heart of everything we do, from platform design to customer support.",
  },
  {
    title: "Innovation",
    description:
      "We constantly innovate to make venue discovery and booking as seamless as possible.",
  },
  {
    title: "Community",
    description:
      "We build strong relationships with venue owners and event planners to create a thriving community.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-dark-brown py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            About Venuze
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We&apos;re on a mission to revolutionize how people find and book
            venues for their special occasions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-500">
                  {stat.value}
                </p>
                <p className="text-dark-brown/60 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-16 bg-accent-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-dark-brown mb-6">
              Our Story
            </h2>
            <p className="text-dark-brown/70 leading-relaxed mb-4">
              Venuze was born from a simple frustration: finding the perfect
              venue for an event shouldn&apos;t be harder than planning the
              event itself. In 2024, our founders experienced firsthand the
              challenges of venue discovery scattered across countless websites,
              outdated listings, and unreliable information.
            </p>
            <p className="text-dark-brown/70 leading-relaxed">
              We built Venuze to be the solution &mdash; a single platform
              where venue owners can showcase their spaces and event planners
              can discover, compare, and book the perfect venue with confidence.
              Today, we&apos;re proud to connect thousands of hosts with unique
              spaces across the UK and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-dark-brown text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent>
                  <h3 className="text-lg font-semibold text-dark-brown mb-2">
                    {value.title}
                  </h3>
                  <p className="text-dark-brown/60">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16 bg-accent-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-dark-brown text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-500">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-dark-brown">{member.name}</h3>
                  <p className="text-sm text-primary-500 mb-2">{member.role}</p>
                  <p className="text-sm text-dark-brown/60">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

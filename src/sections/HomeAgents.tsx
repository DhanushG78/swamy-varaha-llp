import Link from "next/link";
import { getAllAgents } from "@/lib/api";

interface Agent {
  uid: string;
  name: string;
  photo?: { url: string };
  specialization: string;
  bio: string;
}

const HomeAgents = async ({ searchParams }: { searchParams?: any }) => {
  const agents = (await getAllAgents(searchParams)) as Agent[];

  if (!agents || agents.length === 0) return null;

  // Show up to 3 agents on homepage
  const displayAgents = agents.slice(0, 3);

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl font-medium" style={{ color: "#343a40" }}>
            Our Agents
          </h2>
          <Link
            href="/agents"
            className="text-sm font-medium hidden md:inline-block transition-colors duration-200"
            style={{ color: "#e63946" }}
          >
            View all agents &rarr;
          </Link>
        </div>

        {/* Agent Cards - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayAgents.map((agent) => (
            <div
              key={agent.uid}
              className="bg-white border border-gray-200 p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Circular Avatar */}
              <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-2 border-gray-100">
                <img
                  src={agent.photo?.url || "/fallback-property.jpg"}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name as link */}
              <h3 className="text-base font-medium mb-1">
                <Link
                  href="/agents"
                  className="transition-colors duration-200 hover:underline"
                  style={{ color: "#e63946" }}
                >
                  {agent.name}
                </Link>
              </h3>

              {/* Role */}
              <p className="text-xs mb-3" style={{ color: "#6c757d" }}>
                {agent.specialization || "Real Estate Agent"}
              </p>

              {/* Bio */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6c757d" }}
              >
                {agent.bio?.length > 120
                  ? agent.bio.substring(0, 120) + "..."
                  : agent.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/agents"
            className="text-sm font-medium"
            style={{ color: "#e63946" }}
          >
            View all agents &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAgents;

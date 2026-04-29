import { getAllAgents } from "@/lib/api";
import Link from "next/link";

interface Agent {
  uid: string;
  name: string;
  photo?: { url: string };
  specialization: string;
  bio: string;
}

export default async function AgentsPage() {
  const agents = (await getAllAgents()) as Agent[];

  return (
    <main>
      {/* Page Header */}
      <div style={{ backgroundColor: "#1e1e1e" }} className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className="font-medium text-white"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2rem)" }}
          >
            Our Agents
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {agents.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-300">
            <h2 className="text-xl font-medium" style={{ color: "#343a40" }}>
              Our agents are currently offline
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.uid}
                className="bg-white border border-gray-200 p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Circular Avatar */}
                <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-2 border-gray-100">
                  <img
                    src={agent.photo?.url || "/fallback-property.jpg"}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h2 className="text-base font-medium mb-1">
                  <Link
                    href="/agents"
                    className="transition-colors duration-200 hover:underline"
                    style={{ color: "#e63946" }}
                  >
                    {agent.name}
                  </Link>
                </h2>

                {/* Role */}
                <p className="text-xs mb-3" style={{ color: "#6c757d" }}>
                  {agent.specialization || "Real Estate Agent"}
                </p>

                {/* Bio */}
                <p className="text-sm leading-relaxed" style={{ color: "#6c757d" }}>
                  {agent.bio}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

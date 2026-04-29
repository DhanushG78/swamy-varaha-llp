import { getAllAgents } from "@/lib/api";

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
    <main className="px-8 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">
        Our Agents
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <div
            key={agent.uid}
            className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow-lg hover:border-gray-600 transition"
          >
            <img
              src={agent.photo?.url || "/fallback-agent.jpg"}
              alt={agent.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-semibold">
              {agent.name}
            </h2>

            <p className="text-accent font-medium mt-1">
              {agent.specialization}
            </p>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {agent.bio}
            </p>
          </div>
        ))}
      </div>
      {agents.length === 0 && (
        <p className="text-gray-400 mt-10">Our agents are currently offline. Please check back later.</p>
      )}
    </main>
  );
}

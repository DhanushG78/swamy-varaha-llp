import Link from "next/link";

const AgentRecruitBanner = () => {
  return (
    <section style={{ backgroundColor: "#e63946" }}>
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-xl md:text-2xl font-medium text-white text-center md:text-left">
          Be a part of our growing real estate agents
        </h2>
        <Link
          href="/sell"
          className="inline-block px-8 py-3 bg-white font-medium text-sm transition-colors duration-200 hover:bg-gray-100 whitespace-nowrap"
          style={{ color: "#e63946" }}
        >
          Apply for Real Estate agent
        </Link>
      </div>
    </section>
  );
};

export default AgentRecruitBanner;

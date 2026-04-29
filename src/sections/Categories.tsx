const Categories = () => {
  const categories = [
    { title: "Buy", count: "1,200+ Properties", icon: "🏠" },
    { title: "Rent", count: "800+ Properties", icon: "🔑" },
    { title: "Sell", count: "Valuation Tool", icon: "💰" },
  ];

  return (
    <section className="section-padding bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">What are you looking for?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((item) => (
            <div
              key={item.title}
              className="group relative bg-[#151515] h-52 flex flex-col items-center justify-center rounded-2xl border border-[#222] hover:border-[#c5a358]/50 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c5a358]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">{item.icon}</span>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 group-hover:text-gray-300 transition-colors">{item.count}</p>
              
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <span className="text-[#c5a358] text-sm font-semibold uppercase tracking-widest">Get Started</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

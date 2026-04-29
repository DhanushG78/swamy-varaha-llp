export default function SellPage() {
  return (
    <main>
      {/* Page Header */}
      <div style={{ backgroundColor: "#1e1e1e" }} className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className="font-medium text-white"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2rem)" }}
          >
            Sell Your Property
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed mb-8" style={{ color: "#6c757d" }}>
            Want to list your premium property with us? Our experts will help you
            find the right buyers and handle the entire process for you.
          </p>

          <form className="space-y-5">
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "#343a40" }}
              >
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 text-sm border border-gray-200 outline-none transition-colors duration-200 focus:border-gray-400"
                style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
              />
            </div>

            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "#343a40" }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. john@example.com"
                className="w-full px-4 py-3 text-sm border border-gray-200 outline-none transition-colors duration-200 focus:border-gray-400"
                style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
              />
            </div>

            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "#343a40" }}
              >
                Property Type
              </label>
              <input
                type="text"
                placeholder="e.g. Luxury Mansion, Apartment"
                className="w-full px-4 py-3 text-sm border border-gray-200 outline-none transition-colors duration-200 focus:border-gray-400"
                style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
              />
            </div>

            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "#343a40" }}
              >
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your property..."
                className="w-full px-4 py-3 text-sm border border-gray-200 outline-none resize-none transition-colors duration-200 focus:border-gray-400"
                style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium text-white transition-colors duration-200 mt-2"
              style={{ backgroundColor: "#e63946" }}
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

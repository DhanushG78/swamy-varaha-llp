export default function SellPage() {
  return (
    <main className="px-8 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Sell Your Property
      </h1>

      <div className="bg-[#111] p-8 rounded-xl max-w-2xl border border-gray-800 shadow-xl">
        <p className="mb-6 text-gray-300">
          Want to list your premium property with us?
          Our experts will help you find the right buyers and handle the entire process for you.
        </p>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full p-4 rounded-lg bg-black border border-gray-700 focus:border-white transition outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              className="w-full p-4 rounded-lg bg-black border border-gray-700 focus:border-white transition outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Property Type</label>
            <input
              type="text"
              placeholder="e.g. Luxury Mansion, Apartment"
              className="w-full p-4 rounded-lg bg-black border border-gray-700 focus:border-white transition outline-none"
            />
          </div>

          <button className="w-full bg-white text-black px-6 py-4 rounded-lg font-bold hover:bg-gray-200 transition mt-4">
            Submit Inquiry
          </button>
        </form>
      </div>
    </main>
  );
}

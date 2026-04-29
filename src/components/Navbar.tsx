import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center px-8 py-6 bg-black/80 backdrop-blur-lg text-white border-b border-white/5">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
          Luxury<span className="text-gray-400 font-light">Estates</span>
        </h1>
      </Link>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0 text-xs md:text-sm font-medium uppercase tracking-widest text-gray-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <Link href="/about" className="hover:text-white transition">About</Link>
        <Link href="/search" className="hover:text-white transition">Search</Link>
        <Link href="/properties" className="hover:text-white transition">Properties</Link>
        <Link href="/agents" className="hover:text-white transition">Agents</Link>
        <Link href="/buy" className="hover:text-white transition">Buy</Link>
        <Link href="/rent" className="hover:text-white transition">Rent</Link>
        <Link href="/sell" className="hover:text-white transition">Sell</Link>
      </div>
    </nav>
  );
};

export default Navbar;

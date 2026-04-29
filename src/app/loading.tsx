export default function Loading() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-black text-white px-8">
      <div className="relative flex items-center justify-center">
        {/* Animated loader ring */}
        <div className="w-16 h-16 border-2 border-gray-800 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
        </div>
      </div>
      <h1 className="text-xl md:text-2xl font-bold mt-8 tracking-widest uppercase">
        Loading Luxury Experience
      </h1>
      <p className="text-gray-500 mt-2 animate-pulse">Establishing connection to estates...</p>
    </main>
  );
}

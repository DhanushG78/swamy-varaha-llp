export default function Loading() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-white px-6">
      <div className="relative flex items-center justify-center">
        <div
          className="w-14 h-14 border-2 border-gray-200 rounded-full animate-spin"
          style={{ borderTopColor: "#1e1e1e" }}
        />
      </div>
      <p className="text-sm mt-6 animate-pulse" style={{ color: "#6c757d" }}>
        Loading...
      </p>
    </main>
  );
}

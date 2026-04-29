import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Swamy Varaha LLP - Premium Real Estate",
  description:
    "Discover the world's most exceptional properties. Buy, rent, or sell luxury homes with Swamy Varaha LLP.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        {/* pt-16 offsets the fixed navbar height */}
        <div className="flex-1 pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

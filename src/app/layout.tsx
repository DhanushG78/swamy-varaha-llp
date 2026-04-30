import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllCategories } from "@/lib/api";

export const metadata = {
  title: "Swamy Varaha LLP - Premium Real Estate",
  description:
    "Discover the world's most exceptional properties. Buy, rent, or sell luxury homes with Swamy Varaha LLP.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories() || [];

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar categories={categories} />
        {/* pt-16 offsets the fixed navbar height */}
        <div className="flex-1 pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

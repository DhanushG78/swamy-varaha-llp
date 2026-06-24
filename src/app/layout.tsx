import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllCategories } from "@/lib/api";
import LivePreviewInit from "@/components/LivePreviewInit";
import "@/lib/livePreview";
import PersonalizeInitializer from "@/components/personalize/PersonalizeInitializer";

export const dynamic = "force-dynamic";

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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-59NT8ZBJ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-59NT8ZBJ"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <LivePreviewInit />
        <PersonalizeInitializer />
        <Navbar categories={categories} />
        {/* pt-16 offsets the fixed navbar height */}
        <div className="flex-1 pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

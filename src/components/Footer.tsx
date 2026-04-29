import { getGlobalSettings } from "@/lib/api";

const Footer = async () => {
  const settings = await getGlobalSettings();

  if (!settings) return null;

  return (
    <footer className="bg-black text-white px-8 py-16 mt-20 border-t border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4 tracking-tight">Company</h2>
          <p className="text-gray-400 font-medium">{settings.company_name}</p>
          <p className="text-gray-500 leading-relaxed">{settings.footer_address || settings.address}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4 tracking-tight">Contact</h2>
          <p className="text-gray-400">Email: <span className="text-gray-300">{settings.email}</span></p>
          <p className="text-gray-400">Phone: <span className="text-gray-300">{settings.phone}</span></p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4 tracking-tight">Quick Links</h2>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/properties" className="hover:text-white transition">Properties</a></li>
            <li><a href="/agents" className="hover:text-white transition">Agents</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4 tracking-tight">Social</h2>
          <ul className="space-y-3 text-gray-400">
            {settings.instagram_link && (
              <li><a href={settings.instagram_link} className="hover:text-white transition">Instagram</a></li>
            )}
            {settings.linkedin_link && (
              <li><a href={settings.linkedin_link} className="hover:text-white transition">LinkedIn</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-900 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} {settings.company_name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

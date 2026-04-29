import { getGlobalSettings } from "@/lib/api";

const Footer = async () => {
  const settings = await getGlobalSettings();

  if (!settings) return null;

  return (
    <footer style={{ backgroundColor: "#111111" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Column */}
          <div>
            <h3
              className="text-sm font-bold text-white uppercase tracking-wider mb-5 inline-block px-3 py-1"
              style={{ backgroundColor: "#343a40" }}
            >
              Contact
            </h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-400">
                {settings.footer_address || settings.address}
              </p>
              {settings.phone && (
                <p className="text-sm text-gray-400">{settings.phone}</p>
              )}
              {settings.email && (
                <p className="text-sm text-gray-400">
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {settings.email}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Sources Column */}
          <div>
            <h3
              className="text-sm font-bold text-white uppercase tracking-wider mb-5 inline-block px-3 py-1"
              style={{ backgroundColor: "#343a40" }}
            >
              Sources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/about" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  About us
                </a>
              </li>
              <li>
                <a href="/properties" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Vision
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Mission
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h3
              className="text-sm font-bold text-white uppercase tracking-wider mb-5 inline-block px-3 py-1"
              style={{ backgroundColor: "#343a40" }}
            >
              Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/about" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Our Vision
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  About us
                </a>
              </li>
              <li>
                <a href="/agents" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Contact us
                </a>
              </li>
              {settings.instagram_link && (
                <li>
                  <a
                    href={settings.instagram_link}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {settings.linkedin_link && (
                <li>
                  <a
                    href={settings.linkedin_link}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} {settings.company_name || "Swamy Varaha LLP"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

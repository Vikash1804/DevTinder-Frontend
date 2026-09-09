import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-slate-900 to-slate-800 text-slate-200 border-t border-slate-700/50 mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">DT</span>
              </div>
              <h3 className="text-lg font-bold text-white">DevTinder</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting developers with opportunities
            </p>
          </div>

          {/* Services */}
          <nav>
            <h6 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Services
            </h6>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition"
                >
                  Branding
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition"
                >
                  Design
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition"
                >
                  Marketing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition"
                >
                  Advertisement
                </a>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav>
            <h6 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Company
            </h6>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition"
                >
                  About us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition"
                >
                  Press kit
                </a>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <nav>
            <h6 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Social
            </h6>
            <div className="flex gap-4">
              {/* Twitter */}
              <a 
                href="#" 
                className="text-slate-400 hover:text-blue-400 transition hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s-3 .5-5 1.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="#" 
                className="text-slate-400 hover:text-red-400 transition hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.54c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02v-6.04l5.75 3.02-5.75 3.02z" />
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="#" 
                className="text-slate-400 hover:text-blue-600 transition hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a6 6 0 00-6 6v9a2 2 0 002 2h3v-4h-3v-4a2 2 0 012-2h3V4a2 2 0 00-2-2z" />
                  <rect x="2" y="2" width="4" height="20" />
                </svg>
              </a>
            </div>
          </nav>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-700/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            &copy; 2024 DevTinder. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-slate-500 hover:text-slate-300 text-xs transition"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-slate-500 hover:text-slate-300 text-xs transition"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-slate-500 hover:text-slate-300 text-xs transition"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
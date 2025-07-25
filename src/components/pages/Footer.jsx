import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-white.png";

const socialLinks = [
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "https://www.instagram.com/youthiapamachaao/?hl=en",
    color: "from-pink-500 via-red-500 to-yellow-500",
    hover: "hover:scale-110 hover:shadow-[0_0_20px_#e1306c88]",
  },
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/youthiapamachaao/",
    color: "from-blue-600 to-blue-400",
    hover: "hover:scale-110 hover:shadow-[0_0_20px_#1877f288]",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    url: "https://twitter.com/Youthiapa",
    color: "from-sky-400 to-blue-500",
    hover: "hover:scale-110 hover:shadow-[0_0_20px_#1da1f288]",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    url: "https://youtube.com/Youthiapa",
    color: "from-red-600 to-red-400",
    hover: "hover:scale-110 hover:shadow-[0_0_20px_#ff000088]",
  },
];
const email = "contact@youthiapa.com";
const phone = "+91 9876543210";
const address = "Delhi, India";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black py-0 px-0 mt-16 shadow-inner border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col gap-0">
        {/* Top Modern Row: Brand + Menu + Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-b-3xl shadow-2xl">
          {/* Brand Name with Logo */}
          <div className="flex items-center gap-3">
            <Link to='/' className="w-40">
              <img className="w-full h-full object-cover" src={logo} alt="" />
            </Link>
          </div>
          {/* Menu Links */}
          <nav className="flex flex-wrap gap-6 md:gap-10 font-montserrat text-base md:text-lg">
            <NavLink className="hover:scale-110 hover:text-yellow-400 duration-300 transition-all" to="/">Home</NavLink>
            <NavLink className="hover:scale-110 hover:text-yellow-400 duration-300 transition-all" to="/shop">Shop</NavLink>
            <NavLink className="hover:scale-110 hover:text-yellow-400 duration-300 transition-all" to="/About">About</NavLink>
            <NavLink className="hover:scale-110 hover:text-yellow-400 duration-300 transition-all" to="/About">Contact</NavLink>
          </nav>
          {/* Newsletter Signup */}
          <form
            className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 shadow-md border border-gray-700"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="bg-transparent outline-none text-gray-200 placeholder-gray-400 px-2 py-1 w-40 md:w-56"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white px-4 py-1 rounded-full font-semibold hover:scale-105 transition-all duration-200 shadow"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-0" />
        {/* Middle Row: Social + Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-8">
          {/* Social Icons */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className={`group transition-transform duration-200 ${link.hover}`}
              >
                <span
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${link.color} text-white text-2xl shadow-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-125`}
                  style={{
                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.22)",
                    transition: "box-shadow 0.3s, transform 0.2s",
                  }}
                >
                  {link.icon}
                </span>
              </a>
            ))}
          </div>
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400 text-xl" />
              <a
                href={`mailto:${email}`}
                className="font-montserrat text-gray-300 hover:text-blue-400 underline underline-offset-2 transition-colors duration-200"
              >
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-400 text-xl" />
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="font-montserrat text-gray-300 hover:text-green-400 underline underline-offset-2 transition-colors duration-200"
              >
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400 text-xl" />
              <span className="font-montserrat text-gray-300">{address}</span>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-0" />
        {/* Bottom Row: Copyright + Quick Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4">
          <div className="text-center text-gray-500 text-sm font-montserrat tracking-wide">
            &copy; {new Date().getFullYear()} <span className="font-bold text-white">Youthiapa</span>. All rights reserved.
          </div>
          <div className="flex gap-4 text-xs font-montserrat text-gray-400">
            <NavLink to="/privacy" className="hover:text-yellow-400 transition-colors duration-200">Privacy Policy</NavLink>
            <span className="text-gray-600">|</span>
            <NavLink to="/terms" className="hover:text-yellow-400 transition-colors duration-200">Terms of Service</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
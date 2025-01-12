import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo & Description */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">AstaFlow</h2>
                        <p className="text-sm">Your ultimate anime streaming platform</p>
                        <div className="flex space-x-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="h-6 w-6 hover:text-white cursor-pointer" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="h-6 w-6 hover:text-white cursor-pointer" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="h-6 w-6 hover:text-white cursor-pointer" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-white">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Email: info@astaflow.com</li>
                            <li>Phone: (555) 123-4567</li>
                            <li>Address: Tokyo, Japan</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
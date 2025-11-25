import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Plane, Phone, Mail, Globe, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer id="contact" className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Plane className="w-8 h-8 text-sky-400" />
                            <span className="text-2xl font-bold">TravelHub</span>
                        </div>
                        <p className="text-gray-400">
                            Your trusted partner for unforgettable travel experiences around the world.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/about" className="hover:text-sky-400 transition-colors">About Us</Link></li>
                            <li><a href="#" className="hover:text-sky-400 transition-colors">Destinations</a></li>
                            <li><a href="#" className="hover:text-sky-400 transition-colors">Services</a></li>
                            <li><a href="#" className="hover:text-sky-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                +91 6289656387
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                info@travelhub.com
                            </li>
                            <li className="flex items-center">
                                <Globe className="w-4 h-4 mr-2" />
                                www.travelhub.com
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-gray-800" />

                <div className="text-center text-gray-400">
                    <p>&copy; 2024 TravelHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
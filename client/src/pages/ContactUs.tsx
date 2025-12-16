import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Github, Linkedin, MessageCircle } from 'lucide-react';

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="John"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    placeholder="Your message here..."
                                    className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                                Send Message
                            </Button>
                        </form>
                    </Card>

                    {/* Contact Info & Social Media */}
                    <div className="space-y-8">
                        <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Email</p>
                                        <p className="text-gray-600">contact@indietours.tech</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Phone</p>
                                        <p className="text-gray-600">+91 8787878787</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Address</p>
                                        <p className="text-gray-600">College Street, Kolkata-700009, West Bengal</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Follow Us</h2>
                            <p className="text-gray-600 mb-6">Stay connected and follow us on social media for the latest updates and travel tips.</p>
                            <div className="flex space-x-6">
                                <a
                                    href="https://github.com/hunter87ff"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition duration-300 group"
                                >
                                    <Github className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/yourprofile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition duration-300 group"
                                >
                                    <Linkedin className="w-6 h-6 text-blue-600 group-hover:text-blue-800" />
                                </a>
                                <a
                                    href="https://discord.gg/yourinvite"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-indigo-100 hover:bg-indigo-200 rounded-full flex items-center justify-center transition duration-300 group"
                                >
                                    <MessageCircle className="w-6 h-6 text-indigo-600 group-hover:text-indigo-800" />
                                </a>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
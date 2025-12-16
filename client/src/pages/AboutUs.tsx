import { Users, Globe, Award, Heart, MapPin, Clock, Shield, Star } from 'lucide-react'

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-linear-to-b from-sky-50 to-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-linear-to-r from-sky-600 to-blue-700 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
                    <div className="space-y-6 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                            About indietours
                        </h1>
                        <p className="text-xl md:text-2xl text-sky-100 max-w-3xl mx-auto">
                            Crafting unforgettable journeys and creating memories that last a lifetime
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Founded in 2020, indietours was born from a passion for exploration and a desire to make
                                world-class travel experiences accessible to everyone. What started as a small team of
                                travel enthusiasts has grown into a trusted platform serving thousands of adventurers worldwide.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We believe that travel is more than just visiting new places—it's about immersing yourself
                                in different cultures, creating meaningful connections, and discovering parts of yourself
                                you never knew existed.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-linear-to-br from-sky-500 to-blue-600 p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-transform">
                                <Globe className="w-12 h-12 mb-4" />
                                <h3 className="text-3xl font-bold mb-2">150+</h3>
                                <p className="text-sky-100">Destinations</p>
                            </div>
                            <div className="bg-linear-to-br from-purple-500 to-pink-600 p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-transform mt-8">
                                <Users className="w-12 h-12 mb-4" />
                                <h3 className="text-3xl font-bold mb-2">50K+</h3>
                                <p className="text-purple-100">Happy Travelers</p>
                            </div>
                            <div className="bg-linear-to-br from-orange-500 to-red-600 p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-transform">
                                <Award className="w-12 h-12 mb-4" />
                                <h3 className="text-3xl font-bold mb-2">25+</h3>
                                <p className="text-orange-100">Awards Won</p>
                            </div>
                            <div className="bg-linear-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-transform mt-8">
                                <Star className="w-12 h-12 mb-4" />
                                <h3 className="text-3xl font-bold mb-2">4.9/5</h3>
                                <p className="text-green-100">Average Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            These principles guide everything we do and shape the experiences we create
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Heart className="w-8 h-8 text-sky-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Passion</h3>
                            <p className="text-gray-600">
                                We're driven by our love for travel and our commitment to sharing that passion with you.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Shield className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trust</h3>
                            <p className="text-gray-600">
                                Your safety and satisfaction are our top priorities. We're with you every step of the way.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <MapPin className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Adventure</h3>
                            <p className="text-gray-600">
                                We curate unique experiences that take you off the beaten path and into the extraordinary.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Clock className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
                            <p className="text-gray-600">
                                We strive for perfection in every detail, ensuring your journey exceeds expectations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-linear-to-br from-sky-500 to-blue-600 p-12 rounded-3xl text-white shadow-2xl">
                            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                                <Award className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-lg text-sky-50 leading-relaxed">
                                To inspire and enable people to explore the world by providing exceptional travel
                                experiences that are accessible, sustainable, and transformative. We're committed to
                                breaking down barriers and making global exploration a reality for everyone.
                            </p>
                        </div>

                        <div className="bg-linear-to-br from-purple-500 to-pink-600 p-12 rounded-3xl text-white shadow-2xl">
                            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                                <Globe className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-lg text-purple-50 leading-relaxed">
                                To become the world's most trusted travel platform, where every journey creates lasting
                                memories and meaningful connections. We envision a future where travel brings people
                                together, fosters understanding, and contributes to a more connected world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose indietours?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We go above and beyond to ensure your travel experience is nothing short of extraordinary
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-sky-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Curation</h3>
                            <p className="text-gray-600">
                                Every destination and experience is handpicked by our team of travel experts who have
                                personally visited and vetted each location.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-purple-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                            <p className="text-gray-600">
                                Our dedicated support team is available around the clock to assist you before, during,
                                and after your journey.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Best Price Guarantee</h3>
                            <p className="text-gray-600">
                                We work directly with local partners to offer you the best rates without compromising
                                on quality or experience.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Travel</h3>
                            <p className="text-gray-600">
                                We're committed to responsible tourism that respects local communities and preserves
                                the environment for future generations.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-pink-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Booking</h3>
                            <p className="text-gray-600">
                                Life is unpredictable. That's why we offer flexible booking options and hassle-free
                                cancellation policies.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Experiences</h3>
                            <p className="text-gray-600">
                                No two travelers are alike. We customize each journey to match your interests, pace,
                                and travel style.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-sky-600 to-blue-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Adventure?
                    </h2>
                    <p className="text-xl text-sky-100 mb-8">
                        Join thousands of travelers who have discovered the world with indietours
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-white text-sky-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-50 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        Explore Destinations
                    </a>
                </div>
            </section>
        </div>
    )
}

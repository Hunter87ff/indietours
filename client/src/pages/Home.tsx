import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Calendar, Users, Star, ChevronRight, Plane, Hotel, Camera, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [tours, setTours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/tours');
                const data = await res.json();
                setTours(data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    const services = [
        {
            icon: <Plane className="w-8 h-8" />,
            title: 'Flight Booking',
            description: 'Best deals on international and domestic flights'
        },
        {
            icon: <Hotel className="w-8 h-8" />,
            title: 'Hotel Reservations',
            description: 'Handpicked hotels with excellent reviews'
        },
        {
            icon: <Camera className="w-8 h-8" />,
            title: 'Guided Tours',
            description: 'Professional local guides for authentic experiences'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Travel Insurance',
            description: 'Comprehensive coverage for worry-free travel'
        }
    ];

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            location: 'New York, USA',
            content: 'Amazing experience! The tour was well-organized and our guide was incredibly knowledgeable. Would definitely book again!',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop'
        },
        {
            id: 2,
            name: 'Michael Chen',
            location: 'Singapore',
            content: 'Best vacation ever! Everything from accommodation to activities was perfect. Highly recommend this service.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
            id: 3,
            name: 'Emma Wilson',
            location: 'London, UK',
            content: 'Incredible destinations and seamless booking process. The customer service was outstanding throughout our trip.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-blue-50" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
                        Discover Your Next
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600"> Adventure</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Explore breathtaking destinations around the world with our curated travel experiences
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input placeholder="Where to?" className="pl-10 border-gray-200 focus:border-sky-500" />
                            </div>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input type="date" className="pl-10 border-gray-200 focus:border-sky-500" />
                            </div>
                            <div className="relative">
                                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input placeholder="2 Travelers" className="pl-10 border-gray-200 focus:border-sky-500" />
                            </div>
                            <Button className="bg-sky-500 hover:bg-sky-600 text-white h-12">
                                Search Tours
                            </Button>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-8">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-5 h-5 text-sky-500" />
                            <span>500+ Destinations</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Users className="w-5 h-5 text-sky-500" />
                            <span>50K+ Happy Travelers</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Star className="w-5 h-5 text-sky-500" />
                            <span>4.8/5 Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Destinations */}
            <section id="destinations" className="py-20 bg-gradient-to-b from-white to-sky-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Handpicked destinations that offer unforgettable experiences
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center">Loading tours...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {tours.map((tour) => (
                                <Card key={tour._id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="relative">
                                        <img
                                            src={tour.imageUrl || 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop'}
                                            alt={tour.name}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {tour.discount && (
                                            <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                                                {tour.discount}
                                            </Badge>
                                        )}
                                        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                                            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                                        </button>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{tour.name}</h3>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm text-gray-600">4.8</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-600 text-sm mb-3">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span>{tour.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-sky-600">${tour.price}</span>
                                                <span className="text-sm text-gray-500"> /person</span>
                                            </div>
                                            <Link to={`/tours/${tour._id}`}>
                                                <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white">
                                                    Book Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Button variant="outline" className="border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                            View All Destinations
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need for a perfect travel experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 hover:border-sky-200 group">
                                <div className="flex justify-center mb-4 text-sky-500 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-sky-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Real experiences from real travelers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.id} className="p-6 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-sky-500 to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready for Your Next Adventure?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join thousands of happy travelers and create memories that last a lifetime
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100">
                            Start Planning
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sky-600">
                            Download Brochure
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

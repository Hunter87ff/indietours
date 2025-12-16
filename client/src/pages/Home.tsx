import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star, ChevronRight, Plane, Hotel, Camera, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import TourCard from '@/components/TourCard';
import { BACKEND_ENDPOINT } from '@/config';

export default function Home() {
    const [tours, setTours] = useState<any[]>([]);
    const [filteredTours, setFilteredTours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Search filter - only location
    const [searchLocation, setSearchLocation] = useState('');

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch(`${BACKEND_ENDPOINT}/api/tours`);
                const data = await res.json();
                setTours(data);
                setFilteredTours(data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    const handleSearch = () => {
        let filtered = [...tours];

        // Filter by location
        if (searchLocation.trim()) {
            filtered = filtered.filter(tour =>
                tour.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
                tour.name.toLowerCase().includes(searchLocation.toLowerCase())
            );
        }

        setFilteredTours(filtered);
        // Scroll to destinations section
        document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    };

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
            name: 'Bappa Das',
            location: 'Kolkata, West Bengal',
            content: 'Amazing experience! The tour was well-organized and our guide was incredibly knowledgeable. Would definitely book again!',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop'
        },
        {
            id: 2,
            name: 'Sudip Barman',
            location: 'Haryana, India',
            content: 'Best vacation ever! Everything from accommodation to activities was perfect. Highly recommend this service.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
            id: 3,
            name: 'Sneha Sautia',
            location: 'Kolkata, West Bengal',
            content: 'Incredible destinations and seamless booking process. The customer service was outstanding throughout our trip.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1729101143873-d80050bae219?w=100&h=100&fit=crop'
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
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input
                                    placeholder="Search by location or tour name..."
                                    className="pl-10 border-gray-200 focus:border-sky-500"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <Button
                                className="bg-sky-500 hover:bg-sky-600 text-white h-12 px-8"
                                onClick={handleSearch}
                            >
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
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            {searchLocation ? 'Search Results' : 'Popular Destinations'}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {searchLocation
                                ? `Found ${filteredTours.length} tour${filteredTours.length !== 1 ? 's' : ''}`
                                : 'Handpicked destinations that offer unforgettable experiences'
                            }
                        </p>
                        {searchLocation && (
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSearchLocation('');
                                    setFilteredTours(tours);
                                }}
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-center">Loading tours...</div>
                    ) : filteredTours.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No tours found matching your criteria.</p>
                            <Button
                                className="mt-4 bg-sky-500 hover:bg-sky-600"
                                onClick={() => {
                                    setSearchLocation('');
                                    setFilteredTours(tours);
                                }}
                            >
                                View All Tours
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredTours.slice(0, 8).map((tour) => (
                                <TourCard key={tour._id} tour={tour} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/tours">
                            <Button variant="outline" className="border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                                View All Destinations
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
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
                        <Button size="lg" className="border-white text-white hover:bg-white hover:text-sky-600">
                            Download Brochure
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

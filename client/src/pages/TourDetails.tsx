import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Star, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function TourDetails() {
    const { id } = useParams<{ id: string }>();
    const [tour, setTour] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [headCount, setHeadCount] = useState(1);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/tours/${id}`);
                const data = await res.json();
                setTour(data);
            } catch (error) {
                console.error('Error fetching tour:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    tourId: id,
                    headCount
                })
            });

            if (res.ok) {
                alert('Booking successful!');
                navigate('/profile');
            } else {
                const data = await res.json();
                alert(data.message || 'Booking failed');
            }
        } catch (error) {
            console.error('Error booking tour:', error);
            alert('Something went wrong');
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!tour) return <div className="text-center py-20">Tour not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <img
                            src={tour.imageUrl || 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop'}
                            alt={tour.name}
                            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{tour.name}</h1>
                            <div className="flex items-center space-x-4 text-gray-600">
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-1 text-sky-500" />
                                    {tour.location}
                                </div>
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 mr-1 text-yellow-400 fill-yellow-400" />
                                    4.8 (120 reviews)
                                </div>
                            </div>
                        </div>

                        <div className="prose max-w-none text-gray-600">
                            <p>{tour.description}</p>
                        </div>

                        <Card className="p-6 bg-white shadow-xl border-sky-100">
                            <CardContent className="space-y-6 pt-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-gray-900">${tour.price}</span>
                                    <span className="text-gray-500">per person</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Number of Travelers</label>
                                    <div className="flex items-center space-x-4">
                                        <Users className="w-5 h-5 text-gray-400" />
                                        <Input
                                            type="number"
                                            min="1"
                                            value={headCount}
                                            onChange={(e) => setHeadCount(parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold text-gray-900">Total Price</span>
                                        <span className="text-2xl font-bold text-sky-600">${tour.price * headCount}</span>
                                    </div>
                                    <Button
                                        onClick={handleBooking}
                                        className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white text-lg"
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

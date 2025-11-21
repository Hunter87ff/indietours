import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Heart, Calendar, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { BACKEND_ENDPOINT } from '@/config';

interface TourCardProps {
    tour: any;
}

export default function TourCard({ tour }: TourCardProps) {
    const { user, login } = useAuth();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.wishlist) {
            const inWishlist = user.wishlist.some((item: any) =>
                (typeof item === 'string' ? item : item._id) === tour._id
            );
            setIsWishlisted(inWishlist);
        }
    }, [user, tour._id]);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            alert('Please login to wishlist tours');
            return;
        }

        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/auth/wishlist/${tour._id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (res.ok) {
                const updatedWishlist = await res.json();
                setIsWishlisted(!isWishlisted);
                const updatedUser = { ...user, wishlist: updatedWishlist };
                login(updatedUser);
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Date TBA';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <Card
            className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col cursor-pointer border-gray-200"
            onClick={() => navigate(`/tours/${tour._id}`)}
        >
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={tour.imageUrl || 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop'}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Wishlist Heart Button */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md z-10"
                >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
                </button>

                {/* Rating Badge - Bottom right with review count */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">
                        {tour.averageRating || 0}
                    </span>
                    <span className="text-xs text-gray-500">
                        ({tour.reviewCount || 0})
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-4 flex flex-col flex-grow">
                {/* Tour Name - Reduced bottom margin */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 min-h-[3.5rem]" title={tour.name}>
                    {tour.name}
                </h3>

                {/* Location - Reduced bottom margin */}
                <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-sky-500" />
                    <span className="truncate">{tour.location}</span>
                </div>

                {/* Tour Details */}
                <div className="space-y-2 mb-4">
                    {/* Start Date */}
                    {tour.startDate && (
                        <div className="flex items-center text-gray-600 text-xs">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                            <span>Starts: {formatDate(tour.startDate)}</span>
                        </div>
                    )}

                    {/* Capacity */}
                    {tour.spotsLeft !== undefined && (
                        <div className="flex items-center text-xs">
                            <Users className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                            <span className={tour.spotsLeft <= 5 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                                {tour.spotsLeft > 0 ? `${tour.spotsLeft} spots left` : 'Fully Booked'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Price and Book Button */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-sky-600">₹{tour.price?.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">/person</span>
                    </div>
                    <Button
                        size="sm"
                        className="bg-sky-500 hover:bg-sky-600 text-white px-6 flex-shrink-0 font-semibold"
                        disabled={tour.spotsLeft === 0}
                    >
                        {tour.spotsLeft === 0 ? 'Sold Out' : 'Book Now'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

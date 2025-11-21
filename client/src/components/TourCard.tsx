import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

interface TourCardProps {
    tour: any;
}

export default function TourCard({ tour }: TourCardProps) {
    const { user, login } = useAuth(); // login function updates the user state
    const [isWishlisted, setIsWishlisted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.wishlist) {
            // Check if tour ID is in wishlist (handle both populated objects and ID strings)
            const inWishlist = user.wishlist.some((item: any) =>
                (typeof item === 'string' ? item : item._id) === tour._id
            );
            setIsWishlisted(inWishlist);
        }
    }, [user, tour._id]);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent navigation if clicking the heart
        if (!user) {
            alert('Please login to wishlist tours');
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/auth/wishlist/${tour._id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (res.ok) {
                const updatedWishlist = await res.json();
                // We need to update the local user context with the new wishlist
                // This assumes the AuthContext's login function can take a partial update or we manually update it
                // For now, let's just update the local state to reflect the change immediately
                setIsWishlisted(!isWishlisted);

                // Ideally, update global user state
                const updatedUser = { ...user, wishlist: updatedWishlist };
                login(updatedUser);
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    return (
        <Card
            className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col cursor-pointer"
            onClick={() => navigate(`/tours/${tour._id}`)}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={tour.imageUrl || 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop'}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {tour.discount && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                        {tour.discount}
                    </Badge>
                )}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
                </button>
            </div>
            <CardContent className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem]" title={tour.name}>
                        {tour.name}
                    </h3>
                    <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.8</span>
                    </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{tour.location}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-sky-600">₹{tour.price}</span>
                        <span className="text-xs text-gray-500">/person</span>
                    </div>
                    <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white px-6 flex-shrink-0">
                        Book Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

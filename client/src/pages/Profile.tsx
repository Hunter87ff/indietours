import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import TourCard from '@/components/TourCard';
import { User, Mail, Shield, X, Calendar, Users, MapPin, Heart } from 'lucide-react';
import { BACKEND_ENDPOINT } from '@/config';

export default function Profile() {
    const [bookings, setBookings] = useState<any[]>([]);
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            fetchUserProfile();
            
        }
    }, [user?.token]); // Only re-run if token changes to avoid infinite loop with user update

    const fetchUserProfile = async () => {
        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                // Merge the new user data (with populated wishlist) with the existing token
                login({ ...data, token: user?.token });
            }

            fetchMyBookings();
            setEditForm({
                name: user?.name || '',
                email: user?.email || '',
                password: ''
            });

            setIsLoading(false);

        } catch (error) {
            window.location.href = '/login';
            console.error('Error fetching profile:', error);
        }
    };

    const fetchMyBookings = async () => {
        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/bookings/mybookings`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleCancelBooking = async (id: string) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        // Optimistic update
        const previousBookings = [...bookings];
        setBookings(prev => prev.filter(b => b._id !== id));

        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/bookings/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (!res.ok) {
                // Revert if failed
                setBookings(previousBookings);
                alert('Failed to cancel booking');
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            setBookings(previousBookings);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/auth/updatedetails`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(editForm)
            });
            const data = await res.json();
            if (res.ok) {
                login(data);
                setIsEditing(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Filter out null/undefined items from wishlist (e.g. deleted tours)
    const validWishlist = user?.wishlist?.filter((item: any) => item && typeof item === 'object' && item._id) || [];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {isLoading ? <h3>Loading...</h3> : (
            <div className="max-w-7xl mx-auto">
                {/* Profile Section */}
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h1>
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-600">
                                    <User className="w-5 h-5 mr-3" />
                                    <span className="font-semibold w-20">Name:</span>
                                    <span>{user?.name}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Mail className="w-5 h-5 mr-3" />
                                    <span className="font-semibold w-20">Email:</span>
                                    <span>{user?.email}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Shield className="w-5 h-5 mr-3" />
                                    <span className="font-semibold w-20">Role:</span>
                                    <span className="capitalize">{user?.role}</span>
                                </div>
                            </div>
                        </div>
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    </div>
                </div>

                {/* Edit Modal */}
                {isEditing && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <Input
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <Input
                                        type="email"
                                        value={editForm.email}
                                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
                                    <Input
                                        type="password"
                                        value={editForm.password}
                                        onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row h-full cursor-pointer"
                            onClick={() => navigate(`/tours/${booking.tour._id}`)}
                        >
                            {/* Image Section */}
                            <div className="relative w-full sm:w-2/5 h-48 sm:h-full overflow-hidden">
                                <img
                                    src={booking.tour?.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=500&fit=crop'}
                                    alt={booking.tour?.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                                <div className="absolute bottom-3 left-3 text-white sm:hidden">
                                    <p className="font-bold text-lg">₹{booking.totalPrice}</p>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-6 flex flex-col justify-between relative">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-sky-600 transition-colors" title={booking.tour?.name}>
                                            {booking.tour?.name}
                                        </h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 shrink-0 ml-2">
                                            Confirmed
                                        </span>
                                    </div>

                                    <div className="space-y-3 mt-4">
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Calendar className="w-4 h-4 mr-2 text-sky-500" />
                                            {new Date(booking.bookingDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Users className="w-4 h-4 mr-2 text-sky-500" />
                                            {booking.headCount} Travelers
                                        </div>
                                        {booking.tour?.location && (
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <MapPin className="w-4 h-4 mr-2 text-sky-500" />
                                                {booking.tour.location}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                                    <div className="hidden sm:block">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Price</p>
                                        <p className="text-2xl font-bold text-sky-600">₹{booking.totalPrice}</p>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelBooking(booking._id);
                                        }}
                                    >
                                        Cancel Booking
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {bookings.length === 0 && (
                        <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings yet</h3>
                            <p className="text-gray-500 mb-6">You haven't booked any tours yet. Start your adventure today!</p>
                            <Button onClick={() => navigate('/')} className="bg-sky-600 hover:bg-sky-700">
                                Explore Tours
                            </Button>
                        </div>
                    )}
                </div>

                {/* Wishlist Section */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                {validWishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {validWishlist.map((tour: any) => (
                            <TourCard key={tour._id} tour={tour} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist is empty</h3>
                        <p className="text-gray-500 mb-6">Save tours you're interested in to view them later.</p>
                        <Button onClick={() => navigate('/')} variant="outline">
                            Browse Tours
                        </Button>
                    </div>
                )}
            </div>
            )}
        </div>
    );
}

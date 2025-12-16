import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import TourCard from '@/components/TourCard';
import { User, Mail, Shield, X, Calendar, Users, MapPin, Heart, LogOut, Edit } from 'lucide-react';
import { BACKEND_ENDPOINT } from '@/config';

export default function Profile() {
    const [bookings, setBookings] = useState<any[]>([]);
    const { user, login, logout } = useAuth();
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

    const handleLogout = () => {
        logout();
        navigate('/');
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
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    {/* Profile Section */}
                    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-12">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center mb-6 lg:mb-0">
                                <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-6">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
                                    <p className="text-gray-600">Manage your account and view your bookings</p>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 flex items-center"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold px-6 py-2 rounded-lg transition duration-300 flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                                <div className="flex items-center">
                                    <Mail className="w-8 h-8 text-blue-600 mr-4" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">Email</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                                <div className="flex items-center">
                                    <Shield className="w-8 h-8 text-green-600 mr-4" />
                                    <div>
                                        <p className="text-sm font-medium text-green-600 uppercase tracking-wider">Role</p>
                                        <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                                <div className="flex items-center">
                                    <Heart className="w-8 h-8 text-purple-600 mr-4" />
                                    <div>
                                        <p className="text-sm font-medium text-purple-600 uppercase tracking-wider">Wishlist</p>
                                        <p className="text-lg font-semibold text-gray-900">{validWishlist.length} items</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                {/* Edit Modal */}
                {isEditing && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative animate-in fade-in zoom-in duration-300">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Edit className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                                <p className="text-gray-600">Update your account information</p>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                    <Input
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <Input
                                        type="email"
                                        value={editForm.email}
                                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password (optional)</label>
                                    <Input
                                        type="password"
                                        value={editForm.password}
                                        onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                                        placeholder="Leave blank to keep current"
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="px-6">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-6">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                )}

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Bookings</h2>
                    <Card className="bg-white/60 backdrop-blur-sm shadow-xl border-0 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <Card
                                key={booking._id}
                                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col cursor-pointer border-gray-200"
                                onClick={() => navigate(`/tours/${booking.tour._id}`)}
                            >
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={booking.tour?.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=500&fit=crop'}
                                        alt={booking.tour?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                                    <div className="absolute bottom-3 left-3 text-white sm:hidden">
                                        <p className="font-bold text-lg">₹{booking.totalPrice}</p>
                                    </div>
                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-md">
                                        <span className="text-xs font-semibold text-white">Confirmed</span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <CardContent className="p-4 flex flex-col grow">
                                    {/* Tour Name */}
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 min-h-14" title={booking.tour?.name}>
                                        {booking.tour?.name}
                                    </h3>

                                    {/* Location */}
                                    {booking.tour?.location && (
                                        <div className="flex items-center text-gray-600 text-sm mb-2">
                                            <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-indigo-500" />
                                            <span className="truncate">{booking.tour.location}</span>
                                        </div>
                                    )}

                                    {/* Booking Details */}
                                    <div className="space-y-2 mb-4">
                                        {/* Booking Date */}
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                            <span>Booked: {new Date(booking.bookingDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                                        </div>

                                        {/* Travelers */}
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <Users className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                            <span>{booking.headCount} Travelers</span>
                                        </div>
                                    </div>

                                    {/* Price and Cancel Button */}
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-indigo-600">₹{booking.totalPrice}</span>
                                            <span className="text-xs text-gray-500">Total</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 px-4 shrink-0 font-semibold"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCancelBooking(booking._id);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {bookings.length === 0 && (
                            <div className="col-span-full">
                                <div className="text-center py-16 bg-gray-50 rounded-xl">
                                    <div className="w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Calendar className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h3>
                                    <p className="text-gray-600 mb-8">You haven't booked any tours yet. Start your adventure today!</p>
                                    <Button onClick={() => navigate('/')} className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-lg">
                                        Explore Tours
                                    </Button>
                                </div>
                            </div>
                        )}
                        </div>
                    </Card>
                </div>

                {/* Wishlist Section */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Wishlist</h2>
                    <Card className="bg-white/60 backdrop-blur-sm shadow-xl border-0 p-6">
                        {validWishlist.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {validWishlist.map((tour: any) => (
                                    <TourCard key={tour._id} tour={tour} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 rounded-xl">
                                <div className="w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                                <p className="text-gray-600 mb-8">Save tours you're interested in to view them later.</p>
                                <Button onClick={() => navigate('/')} variant="outline" className="px-8 py-3 text-lg border-indigo-300 text-indigo-600 hover:bg-indigo-50">
                                    Browse Tours
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
            )}
        </div>
    );
}

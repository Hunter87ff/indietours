import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
    const [bookings, setBookings] = useState<any[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchMyBookings();
        }
    }, [user]);

    const fetchMyBookings = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/bookings/mybookings', {
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
        try {
            const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (res.ok) {
                fetchMyBookings();
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h1>
                    <div className="text-gray-600">
                        <p><span className="font-semibold">Name:</span> {user?.name}</p>
                        <p><span className="font-semibold">Email:</span> {user?.email}</p>
                        <p><span className="font-semibold">Role:</span> {user?.role}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookings.map((booking) => (
                        <Card key={booking._id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking.tour?.name}</h3>
                                        <p className="text-gray-600">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                        <p className="text-gray-600">Travelers: {booking.headCount}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-sky-600">${booking.totalPrice}</span>
                                        <p className="text-sm text-green-600 font-medium mt-1">Confirmed</p>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="mt-4"
                                            onClick={() => handleCancelBooking(booking._id)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {bookings.length === 0 && (
                        <p className="text-gray-500">No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

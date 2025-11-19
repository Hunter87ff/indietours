import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Trash2, Plus } from 'lucide-react';

export default function AdminDashboard() {
    const [tours, setTours] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('tours');
    const { user } = useAuth();

    // Form state for new tour
    const [newTour, setNewTour] = useState({
        name: '',
        description: '',
        price: '',
        location: '',
        imageUrl: ''
    });

    useEffect(() => {
        fetchTours();
        fetchBookings();
    }, []);

    const fetchTours = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/tours');
            const data = await res.json();
            setTours(data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/bookings', {
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

    const handleCreateTour = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/tours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(newTour)
            });

            if (res.ok) {
                fetchTours();
                setNewTour({ name: '', description: '', price: '', location: '', imageUrl: '' });
                alert('Tour created successfully');
            }
        } catch (error) {
            console.error('Error creating tour:', error);
        }
    };

    const handleDeleteTour = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/tours/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (res.ok) {
                fetchTours();
            }
        } catch (error) {
            console.error('Error deleting tour:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                <div className="flex space-x-4 mb-8">
                    <Button
                        variant={activeTab === 'tours' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('tours')}
                    >
                        Manage Tours
                    </Button>
                    <Button
                        variant={activeTab === 'bookings' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('bookings')}
                    >
                        View Bookings
                    </Button>
                </div>

                {activeTab === 'tours' ? (
                    <div className="space-y-8">
                        {/* Create Tour Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Create New Tour</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleCreateTour} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Tour Name"
                                            value={newTour.name}
                                            onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                                            required
                                        />
                                        <Input
                                            placeholder="Location"
                                            value={newTour.location}
                                            onChange={(e) => setNewTour({ ...newTour, location: e.target.value })}
                                            required
                                        />
                                        <Input
                                            placeholder="Price"
                                            type="number"
                                            value={newTour.price}
                                            onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
                                            required
                                        />
                                        <Input
                                            placeholder="Image URL"
                                            value={newTour.imageUrl}
                                            onChange={(e) => setNewTour({ ...newTour, imageUrl: e.target.value })}
                                        />
                                    </div>
                                    <Input
                                        placeholder="Description"
                                        value={newTour.description}
                                        onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
                                        required
                                    />
                                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                                        <Plus className="w-4 h-4 mr-2" /> Create Tour
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Tours List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tours.map((tour) => (
                                <Card key={tour._id} className="relative">
                                    <img
                                        src={tour.imageUrl || 'https://via.placeholder.com/300'}
                                        alt={tour.name}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg mb-2">{tour.name}</h3>
                                        <p className="text-gray-600 mb-4">${tour.price}</p>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteTour(tour._id)}
                                            className="w-full"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Bookings List */
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head Count</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.user?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.tour?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.headCount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">${booking.totalPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

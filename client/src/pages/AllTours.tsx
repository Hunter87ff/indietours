import { useState, useEffect } from 'react';
import TourCard from '@/components/TourCard';
import { Input } from '@/components/ui/input';
import { BACKEND_ENDPOINT } from '@/config';

export default function AllTours() {
    const [tours, setTours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch(`${BACKEND_ENDPOINT}/api/tours`);
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

    const filteredTours = tours.filter(tour =>
        tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tour.description && tour.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Destinations</h1>
                <div className="mb-6 flex justify-center">
                    <Input
                        placeholder="Search tours..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="max-w-md"
                    />
                </div>

                {loading ? (
                    <div className="text-center">Loading tours...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredTours.map((tour) => (
                            <TourCard key={tour._id} tour={tour} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

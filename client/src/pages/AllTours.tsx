import { useState, useEffect } from 'react';
import TourCard from '@/components/TourCard';

export default function AllTours() {
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

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Destinations</h1>

                {loading ? (
                    <div className="text-center">Loading tours...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tours.map((tour) => (
                            <TourCard key={tour._id} tour={tour} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

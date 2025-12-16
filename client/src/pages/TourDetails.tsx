import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Star, Users, Pencil, Trash2, X, Check, MoreVertical } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { BACKEND_ENDPOINT } from '@/config';

export default function TourDetails() {
    const { id } = useParams<{ id: string }>();
    const [tour, setTour] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);
    const [headCount, setHeadCount] = useState(1);
    const { user } = useAuth();
    const navigate = useNavigate();

    // Edit state
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editCommentText, setEditCommentText] = useState('');
    const [editRating, setEditRating] = useState(5);

    // Menu state
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Related tours state
    const [relatedTours, setRelatedTours] = useState<any[]>([]);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await fetch(`${BACKEND_ENDPOINT}/api/tours/${id}`);
                const data = await res.json();
                setTour(data);
            } catch (error) {
                console.error('Error fetching tour:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await fetch(`${BACKEND_ENDPOINT}/api/comments/${id}`);
                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        const fetchRelatedTours = async () => {
            try {
                const res = await fetch(`${BACKEND_ENDPOINT}/api/tours`);
                const data = await res.json();
                // Filter out current tour and take 3 random or first 3
                const filtered = data.filter((t: any) => t._id !== id).slice(0, 3);
                setRelatedTours(filtered);
            } catch (error) {
                console.error('Error fetching related tours:', error);
            }
        };

        fetchTour();
        fetchComments();
        fetchRelatedTours();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/bookings`, {
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

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to comment');
            return;
        }

        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/comments/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    text: newComment,
                    rating
                })
            });

            if (res.ok) {
                const comment = await res.json();
                setComments([comment, ...comments]);
                setNewComment('');
                setRating(5);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (res.ok) {
                setComments(comments.filter(c => c._id !== commentId));
                setActiveMenuId(null);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const startEditing = (comment: any) => {
        setEditingCommentId(comment._id);
        setEditCommentText(comment.text);
        setEditRating(comment.rating);
        setActiveMenuId(null);
    };

    const handleUpdateComment = async (commentId: string) => {
        try {
            const res = await fetch(`${BACKEND_ENDPOINT}/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    text: editCommentText,
                    rating: editRating
                })
            });

            if (res.ok) {
                const updatedComment = await res.json();
                setComments(comments.map(c => c._id === commentId ? updatedComment : c));
                setEditingCommentId(null);
            }
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    // Calculate average rating from comments
    const averageRating = comments.length > 0
        ? (comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length).toFixed(1)
        : 0;
    const reviewCount = comments.length;

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!tour) return <div className="text-center py-20">Tour not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image + Details */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* ... (image and details) ... */}
                        <div className="space-y-4">
                            <img
                                src={tour.imageUrl || 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop'}
                                alt={tour.name}
                                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                            />
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{tour.name}</h1>
                                <div className="flex items-center space-x-4 text-gray-600">
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-1 text-sky-500" />
                                        {tour.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 mr-1 text-yellow-400 fill-yellow-400" />
                                        {reviewCount > 0 ? (
                                            <>
                                                {averageRating} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                                            </>
                                        ) : (
                                            <span className="text-gray-400">No reviews yet</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="prose max-w-none text-gray-600">
                                <p className="text-lg leading-relaxed">{tour.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Card & Related Tours */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-2">
                            <Card className="p-6 bg-white shadow-xl border-sky-100">
                                <CardContent className="space-y-6 pt-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-gray-900">₹{tour.price}</span>
                                        <span className="text-gray-500">per person</span>
                                    </div>

                                    {/* Tour Start Date */}
                                    {tour.startDate && (
                                        <div className="bg-sky-50 p-3 rounded-lg">
                                            <p className="text-sm text-gray-600">Tour Starts</p>
                                            <p className="font-semibold text-gray-900">
                                                {new Date(tour.startDate).toLocaleDateString(undefined, {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    )}

                                    {/* Capacity Info */}
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Available Spots</span>
                                            <span className={`font-bold ${tour.spotsLeft <= 5 ? 'text-red-600' : 'text-green-600'}`}>
                                                {tour.spotsLeft} / {tour.maxCapacity}
                                            </span>
                                        </div>
                                        {tour.spotsLeft <= 5 && tour.spotsLeft > 0 && (
                                            <p className="text-xs text-red-600 mt-1">Only {tour.spotsLeft} spots left!</p>
                                        )}
                                        {tour.spotsLeft === 0 && (
                                            <p className="text-xs text-red-600 mt-1 font-semibold">Tour is fully booked</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Number of Travelers</label>
                                        <div className="flex items-center space-x-4">
                                            <Users className="w-5 h-5 text-gray-400" />
                                            <Input
                                                type="number"
                                                min="1"
                                                max={tour.spotsLeft}
                                                value={headCount}
                                                onChange={(e) => setHeadCount(parseInt(e.target.value))}
                                                className="w-full"
                                                disabled={tour.spotsLeft === 0}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="font-semibold text-gray-900">Total Price</span>
                                            <span className="text-2xl font-bold text-sky-600">₹{tour.price * headCount}</span>
                                        </div>
                                        <Button
                                            onClick={handleBooking}
                                            className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            disabled={tour.spotsLeft === 0 || headCount > tour.spotsLeft}
                                        >
                                            Book Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Related Tours List */}
                            {relatedTours.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">You Might Also Like</h3>
                                    <div className="space-y-4">
                                        {relatedTours.map((related) => (
                                            <div
                                                key={related._id}
                                                className="group flex gap-4 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
                                                onClick={() => navigate(`/tours/${related._id}`)}
                                            >
                                                <div className="w-20 h-20 overflow-hidden rounded-lg">
                                                    <img
                                                        src={related.imageUrl || 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop'}
                                                        alt={related.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-sky-600 transition-colors">{related.name}</h4>
                                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                                        <MapPin className="w-3 h-3 mr-1" />
                                                        {related.location}
                                                    </div>
                                                    <p className="text-sky-600 font-bold text-sm mt-1">₹{related.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="lg:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Comments</h2>

                    {/* Add Comment Form */}
                    {user && (
                        <Card className="mb-8">
                            <CardContent className="pt-6">
                                <form onSubmit={handleSubmitComment} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                        <div className="flex space-x-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className={`focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    <Star className="w-6 h-6 fill-current" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
                                        <Input
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Share your experience..."
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="bg-sky-600 hover:bg-sky-700">
                                        Post Review
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <Card key={comment._id} className="overflow-visible">
                                <CardContent className="pt-6">
                                    {editingCommentId === comment._id ? (
                                        // Edit Mode
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex space-x-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setEditRating(star)}
                                                            className={`focus:outline-none ${star <= editRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        >
                                                            <Star className="w-5 h-5 fill-current" />
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button size="sm" variant="ghost" onClick={() => setEditingCommentId(null)}>
                                                        <X className="w-4 h-4 mr-1" /> Cancel
                                                    </Button>
                                                    <Button size="sm" onClick={() => handleUpdateComment(comment._id)}>
                                                        <Check className="w-4 h-4 mr-1" /> Save
                                                    </Button>
                                                </div>
                                            </div>
                                            <Input
                                                value={editCommentText}
                                                onChange={(e) => setEditCommentText(e.target.value)}
                                                className="w-full"
                                            />
                                        </div>
                                    ) : (
                                        // View Mode
                                        <>
                                            <div className="flex justify-between items-start mb-2 relative">
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{comment.user?.name || 'Anonymous'}</h4>
                                                    <div className="flex items-center mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(comment.createdAt).toLocaleDateString()}
                                                    </span>
                                                    {user && (user._id === comment.user?._id || user._id === comment.user) && (
                                                        <div className="relative">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-9 w-9 p-0 rounded-full hover:bg-gray-100"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setActiveMenuId(activeMenuId === comment._id ? null : comment._id);
                                                                }}
                                                            >
                                                                <MoreVertical className="w-5 h-5 text-gray-600 stroke-[2.5]" />
                                                            </Button>

                                                            {activeMenuId === comment._id && (
                                                                <div
                                                                    ref={menuRef}
                                                                    className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 animate-in fade-in zoom-in duration-200"
                                                                >
                                                                    <div className="py-1">
                                                                        <button
                                                                            onClick={() => startEditing(comment)}
                                                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                        >
                                                                            <Pencil className="w-4 h-4 mr-2" />
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteComment(comment._id)}
                                                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                                        >
                                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{comment.text}</p>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                        {comments.length === 0 && (
                            <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

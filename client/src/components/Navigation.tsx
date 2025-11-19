import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Plane, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <Plane className="w-8 h-8 text-sky-500" />
                    <span className="text-2xl font-bold text-gray-900">TravelHub</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-sky-500 transition-colors">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-sky-500 transition-colors">
                        About Us
                    </Link>
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-gray-700 hover:text-sky-500 transition-colors">
                                    Dashboard
                                </Link>
                            )}
                            <Link
                                to="/profile"
                                className="flex items-center space-x-2 text-gray-700 hover:text-sky-500 transition-colors"
                            >
                                <User className="w-4 h-4" />
                                <span>{user.name}</span>
                            </Link>
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" className="text-gray-700 hover:text-sky-500">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-sky-500 hover:bg-sky-600 text-white">Register</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="bg-white border-t border-gray-200 px-4 py-2 space-y-2">
                    <Link to="/" className="block py-2 text-gray-700 hover:text-sky-500 transition-colors">
                        Home
                    </Link>
                    <Link to="/about" className="block py-2 text-gray-700 hover:text-sky-500 transition-colors">
                        About Us
                    </Link>
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="block py-2 text-gray-700 hover:text-sky-500 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            )}
                            <Link
                                to="/profile"
                                className="block py-2 text-gray-700 hover:text-sky-500 transition-colors"
                            >
                                Profile
                            </Link>
                            <Button onClick={handleLogout} className="w-full bg-sky-500 hover:bg-sky-600 text-white">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block py-2 text-gray-700 hover:text-sky-500 transition-colors">
                                Login
                            </Link>
                            <Link to="/register">
                                <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Register</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import AllTours from './pages/AllTours'
import Login from './pages/Login'
import Register from './pages/Register'
import TourDetails from './pages/TourDetails'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import { AuthProvider } from './context/AuthContext'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-white flex flex-col">
                    <Navigation />
                    <main className="grow pt-16">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tours" element={<AllTours />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/contact" element={<ContactUs />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/tours/:id" element={<TourDetails />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/admin" element={
                                <ProtectedAdminRoute>
                                    <AdminDashboard />
                                </ProtectedAdminRoute>
                            } />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    )
}

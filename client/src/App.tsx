import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TourDetails from './pages/TourDetails'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import AboutUs from './pages/AboutUs'
import { AuthProvider } from './context/AuthContext'

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-white flex flex-col">
                    <Navigation />
                    <main className="flex-grow pt-16">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/tours/:id" element={<TourDetails />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    )
}

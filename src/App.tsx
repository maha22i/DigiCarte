import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QrCode } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateCard from './pages/CreateCard';
import EditCard from './pages/EditCard';
import ShareCard from './pages/ShareCard';
import ViewCard from './pages/ViewCard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 bg-[length:400%_400%] animate-gradient">
        <nav className="glass-morphism">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <QrCode className="h-8 w-8 text-purple-400" />
                <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  DigiCarte
                </span>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-card" element={<CreateCard />} />
          <Route path="/edit-card/:id" element={<EditCard />} />
          <Route path="/share-card/:id" element={<ShareCard />} />
          <Route path="/card/:id" element={<ViewCard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
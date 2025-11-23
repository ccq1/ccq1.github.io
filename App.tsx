import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostView from './pages/PostView';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/30 relative isolate bg-[#09090b] text-zinc-200">
        
        {/* The Global Grid Background */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
             {/* Main SVG Grid */}

        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog/:slug" element={<PostView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </main>
            <Footer />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
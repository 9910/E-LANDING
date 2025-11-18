import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Programs from './pages/Programs';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F8FF] via-white to-[#FDFCF9] text-ink">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
};

export default App;

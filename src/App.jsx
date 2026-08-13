import Navbar from './components/Navbar';
import WatchlistGrid from './components/WatchlistGrid';
import ProductCard from './components/ProductCard';
import AddProductModal from './components/AddProductModal';
import FooterBanner from './components/FooterBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <div>
        <Navbar />
        <WatchlistGrid />
      </div>
      <FooterBanner />
    </div>
  );
}
import { useState } from 'react';
import Navbar from './components/Navbar';
import WatchlistGrid from './components/WatchlistGrid';
import AddProductModal from './components/AddProductModal';
import FooterBanner from './components/FooterBanner';

export default function App() {
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate dynamic stats
  const trackedCount = products.length;
  const dropsCount = products.filter(p => p.priceChange < 0).length;
  const checksCount = trackedCount * 25 + 4; // Simulated checks counter

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleRefreshProduct = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, lastChecked: 'Just now' };
      }
      return p;
    }));
  };

  const handleExportCsv = () => {
    if (products.length === 0) {
      alert('No products in watchlist to export!');
      return;
    }
    const headers = 'ID,Title,Store,Price,Category,LastChecked\n';
    const rows = products.map(p => `"${p.id}","${p.title}","${p.store}",${p.price},"${p.category}","${p.lastChecked}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pulse-real-watchlist.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <div>
        <Navbar 
          stats={{ tracked: trackedCount, drops: dropsCount, checks: checksCount }}
          currency={currency}
          onCurrencyChange={setCurrency}
          onExportCsv={handleExportCsv}
          onOpenModal={() => setIsModalOpen(true)}
        />
        
        <WatchlistGrid 
          products={products}
          currency={currency}
          onDeleteProduct={handleDeleteProduct}
          onRefreshProduct={handleRefreshProduct}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </div>

      <FooterBanner />

      <AddProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
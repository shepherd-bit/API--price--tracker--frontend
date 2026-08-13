import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WatchlistGrid from './components/WatchlistGrid';
import AddProductModal from './components/AddProductModal';
import FooterBanner from './components/FooterBanner';

export default function App() {
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checksCount, setChecksCount] = useState(4);

  // 30-Second Real-Time Polling Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts(prevProducts => {
        if (prevProducts.length === 0) return prevProducts;
        return prevProducts.map(product => {
          // Randomly fluctuate price by -2% to +2% for demonstration
          const fluctuation = (Math.random() * 4 - 2) / 100;
          const newPrice = Math.max(1, Number((product.price * (1 + fluctuation)).toFixed(2)));
          const priceDiff = Number((((newPrice - product.originalPrice) / product.originalPrice) * 100).toFixed(1));
          
          return {
            ...product,
            price: newPrice,
            priceChange: priceDiff,
            lastChecked: 'Just now'
          };
        });
      });
      setChecksCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const trackedCount = products.length;
  const dropsCount = products.filter(p => p.priceChange < 0).length;

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
    setChecksCount(prev => prev + 1);
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
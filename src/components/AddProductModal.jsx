import { useState } from 'react';
import { X, Plus, Link as LinkIcon, Sparkles } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' or 'custom'
  const [customUrl, setCustomUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  // Mock live catalog items from DummyJSON & FakeStoreAPI for selection
  const catalogItems = [
    {
      id: 'cat-1',
      title: 'Essence Mascara Lash Princess',
      store: 'DummyJSON',
      price: 9.99,
      originalPrice: 12.99,
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80',
      currencySymbol: '$',
      priceChange: -23.1
    },
    {
      id: 'cat-2',
      title: 'Eyeshadow Palette with Mirror',
      store: 'DummyJSON',
      price: 19.99,
      originalPrice: 24.99,
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1583241800698-e8dd04c502b4?auto=format&fit=crop&w=400&q=80',
      currencySymbol: '$',
      priceChange: -20.0
    },
    {
      id: 'cat-3',
      title: 'Mens Casual Premium Slim Fit T-Shirts',
      store: 'FakeStoreAPI',
      price: 22.30,
      originalPrice: 29.99,
      category: 'Apparel',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      currencySymbol: '$',
      priceChange: -25.6
    },
    {
      id: 'cat-4',
      title: 'Mens Cotton Jacket',
      store: 'FakeStoreAPI',
      price: 55.99,
      originalPrice: 69.99,
      category: 'Apparel',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80',
      currencySymbol: '$',
      priceChange: -20.0
    },
    {
      id: 'cat-5',
      title: 'SanDisk SSD PLUS 1TB Internal SSD',
      store: 'FakeStoreAPI',
      price: 109.00,
      originalPrice: 129.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
      currencySymbol: '$',
      priceChange: -16.1
    },
    {
      id: 'cat-6',
      title: 'Wireless Gaming Headset',
      store: 'DummyJSON',
      price: 49.99,
      originalPrice: 59.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      currencySymbol: '$',
      priceChange: -16.6
    }
  ];

  const filteredCatalog = selectedCategory === 'All' 
    ? catalogItems 
    : catalogItems.filter(item => item.category === selectedCategory);

  const handleAddCatalogItem = (item) => {
    const uniqueId = 'prod-' + crypto.randomUUID();
    onAddProduct?.({
      ...item,
      id: uniqueId,
      lastChecked: 'Just now'
    });
    onClose?.();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customUrl || !customTitle || !customPrice) return;

    const uniqueId = 'prod-' + crypto.randomUUID();
    onAddProduct?.({
      id: uniqueId,
      title: customTitle,
      store: 'Custom URL',
      price: parseFloat(customPrice),
      originalPrice: parseFloat(customPrice) * 1.15,
      currencySymbol: '$',
      category: 'Custom',
      url: customUrl,
      image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80',
      lastChecked: 'Just now',
      priceChange: -5.0
    });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl shadow-black">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-600/20 border border-purple-500/40 rounded-xl text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Add Product to Watchlist</h3>
              <p className="text-xs text-zinc-400">Choose from live mock APIs or link a custom URL</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-t border-x transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-zinc-900 border-zinc-700 text-purple-400 shadow-sm'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Live Catalog (DummyJSON + FakeStore)
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-t border-x transition-all cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-zinc-900 border-zinc-700 text-purple-400 shadow-sm'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Custom URL Track
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4">
          {activeTab === 'catalog' ? (
            <div>
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                {['All', 'Beauty', 'Apparel', 'Electronics'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCatalog.map(item => (
                  <div 
                    key={item.id}
                    className="bg-zinc-950 border-2 border-zinc-800 hover:border-purple-500/60 rounded-xl p-3 flex items-center justify-between gap-3 group transition-all shadow-inner"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-zinc-700" />
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase font-bold block">{item.store}</span>
                        <h4 className="text-white text-xs font-bold line-clamp-1 group-hover:text-purple-300 transition-colors">{item.title}</h4>
                        <span className="text-xs font-extrabold text-white">${item.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddCatalogItem(item)}
                      className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex-shrink-0"
                      title="Track Product"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1.5">Product URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="url" 
                    required
                    placeholder="https://example.com/product-item"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1.5">Product Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mechanical Keyboard RGB"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1.5">Initial Price ($)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  required
                  placeholder="99.99"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 shadow-inner"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-purple-600/40 border border-purple-400/30 transition-all cursor-pointer mt-2"
              >
                Start Tracking Custom Product
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
import { Bell } from 'lucide-react';

export default function FooterBanner() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-6">
      <div className="bg-zinc-900/90 border border-zinc-700/80 rounded-2xl p-4 md:px-6 shadow-2xl shadow-black/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Left Side: Notification Info */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-950/80 border border-purple-700/50 p-2 rounded-xl text-purple-400 shadow-inner">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-zinc-200 tracking-wide">
              Browser notifications enabled for drops &gt; 5%
            </p>
            <p className="text-zinc-400 mt-0.5">
              We simulate real market movement every 30s. Drops trigger toasts – native notification.
            </p>
          </div>
        </div>

        {/* Right Side: Sync Info */}
        <div className="text-zinc-400 font-medium whitespace-nowrap bg-zinc-950/60 border border-zinc-800/80 px-3.5 py-2 rounded-xl shadow-inner">
          Sync active • AllOrigins proxy for custom URLs
        </div>

      </div>
    </footer>
  );
}
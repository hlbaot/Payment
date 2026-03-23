'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container max-w-[1280px] mx-auto px-8 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            SwiftGuard <span className="text-primary">Kinetic</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center h-full">
          <Link 
            href="/" 
            className={`text-sm font-semibold h-full flex items-center border-b-[3px] transition-colors ${
               pathname === '/' 
                 ? 'border-primary text-gray-900' 
                 : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/counter-market" 
            className={`text-sm font-semibold h-full flex items-center border-b-[3px] transition-colors ${
               pathname === '/counter-market' 
                 ? 'border-primary text-primary' 
                 : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Counter Market
          </Link>
          <Link href="#" className="text-sm font-semibold text-gray-500 hover:text-gray-900">How it Works</Link>
          <Link href="#" className="text-sm font-semibold text-gray-500 hover:text-gray-900">Commission Table</Link>
          <Link href="#" className="text-sm font-semibold text-gray-500 hover:text-gray-900">Support</Link>
        </nav>
        
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900">Sign In</Link>
          <Link href="/register" className="btn bg-primary text-white hover:bg-[#E65C00] px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_4px_14px_rgba(255,102,0,0.3)] transition-all">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

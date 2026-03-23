import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer bg-[#111827] text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-6">SwiftGuard <span className="text-primary">Kinetic</span></h3>
            <p className="text-sm text-gray-400 max-w-xs mb-6">
              Empowering global trade through kinetic financial architecture. Precision, speed, and security.
            </p>
            <p className="text-xs text-gray-500">
              © {currentYear} SwiftGuard Kinetic. Experts in international financial coordination.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF6600] mb-6">Resources</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF6600] mb-6">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF6600] mb-6">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

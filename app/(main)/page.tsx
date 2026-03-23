import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding overflow-hidden">
        <div className="container flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <span className="badge">Kinetic Infrastructure</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
              Velocity Meets <br />
              <span className="text-primary">Precision</span>.
            </h1>
            <p className="text-lg text-muted mb-8 max-w-lg">
              The architect of institutional-grade cross-border liquidity. 
              Experience transfers with zero friction and absolute clarity.
            </p>
            <Link href="/counter-market" className="btn btn-primary px-8 py-4 text-lg">
              Explore Corridors
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="card max-w-md mx-auto relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </div>
                <h3 className="text-lg font-bold">Precision Calculator</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">You Transfer</label>
                  <div className="relative">
                    <input type="text" defaultValue="1,000.00" className="w-full pl-4 pr-20 py-4 bg-gray-50 border-none font-bold text-xl" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 font-bold">
                      USD <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center -my-2 relative z-10">
                  <button className="w-10 h-10 bg-white border border-gray-100 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2"><path d="M7 15l-4-4 4-4M17 9l4 4-4 4M21 13H3"/></svg>
                  </button>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">They Receive</label>
                  <div className="relative">
                    <input type="text" defaultValue="924.45" className="w-full pl-4 pr-20 py-4 bg-gray-50 border-none font-bold text-xl text-primary" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 font-bold">
                      EUR <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Exchange Rate</span>
                  <span className="font-bold">1 USD = 0.92445 EUR</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Kinetic Fee</span>
                  <span className="font-bold text-primary">0.00 USD</span>
                </div>
              </div>
              
              <button className="btn btn-primary w-full mt-6 py-4">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="section-padding bg-section-bg">
        <div className="container">
          <div className="max-w-xl mb-16">
            <h2 className="text-4xl font-bold mb-6">Precision-Engineered Transfers</h2>
            <p className="text-muted">
              Our architecture ensures every movement is tracked, verified, and secured at the highest level of regulatory compliance.
            </p>
          </div>
          
          <div className="grid-3">
            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Kinetic Speed</h3>
              <p className="text-muted text-sm leading-relaxed">
                Proprietary routing algorithms ensure settlements occur in sub-second intervals across major currencies.
              </p>
            </div>
            
            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Fortified Security</h3>
              <p className="text-muted text-sm leading-relaxed">
                Multi-layered encryption protocols that exceed standard financial regulatory requirements globally.
              </p>
            </div>
            
            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Real-Time Data</h3>
              <p className="text-muted text-sm leading-relaxed">
                End-to-end transparency with a granular view of every leg of the transaction journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="section-padding bg-white">
        <div className="container flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 rounded-3xl aspect-square relative overflow-hidden flex items-center justify-center">
              <div className="opacity-20 transform scale-150">
                <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div className="absolute inset-x-8 bottom-8 card p-6 !bg-white/80 !backdrop-blur-md">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                       <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Active Corridor</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">London (LHR)</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                      <span className="font-bold">Singapore (SIN)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Uptime</div>
                    <div className="text-xl font-bold text-primary">99.9%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-12">Global Network Corridors</h2>
            <div className="space-y-4">
              {[
                { id: 'US', name: 'North America Gateway', info: '6 Major Corridors' },
                { id: 'EU', name: 'European Central Hub', info: '12 Major Corridors' },
                { id: 'AS', name: 'APAC Velocity Node', info: '8 Major Corridors' }
              ].map((item) => (
                <div key={item.id} className="card !p-5 flex justify-between items-center hover:border-primary group transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center font-bold text-xs">{item.id}</div>
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs text-muted">{item.info}</p>
                    </div>
                  </div>
                  <svg className="text-gray-300 group-hover:text-primary transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="bg-primary rounded-[40px] p-12 md:p-24 text-center text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 C20,80 40,120 60,100 C80,80 100,120 120,100" fill="none" stroke="white" strokeWidth="2" />
                <path d="M0,80 C20,60 40,100 60,80 C80,60 100,100 120,80" fill="none" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
                Ready to move money at <span className="text-white/80">Kinetic</span> speed?
              </h2>
              <p className="text-xl text-white/80 mb-12">
                Join over 45,000 businesses utilizing the SwiftGuard framework for precision asset mobility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn bg-white text-primary px-10 py-5 text-lg">
                  Get Started Now
                </Link>
                <Link href="/contact" className="btn border border-white/30 text-white px-10 py-5 text-lg hover:bg-white/10">
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl">
            🚨 Attack Me
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
            A deliberately vulnerable Next.js application for security testing and learning
          </p>
          
          <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">⚠️ Warning</h2>
            <p className="text-lg mb-2">This application contains intentional security vulnerabilities for educational purposes only.</p>
            <p className="text-lg font-semibold text-yellow-200">Do not use in production environments!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <Link 
              href="/vulnerabilities" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3">🔍 Vulnerabilities</h3>
              <p className="text-red-100">Explore intentional security flaws</p>
            </Link>
            
            <Link 
              href="/about" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3">📚 About</h3>
              <p className="text-red-100">Learn about this project</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">💉 SQL Injection</h4>
              <p className="text-sm text-red-200">Database vulnerabilities</p>
            </div>
            <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">🎯 XSS</h4>
              <p className="text-sm text-red-200">Cross-site scripting</p>
            </div>
            <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">🔄 CSRF</h4>
              <p className="text-sm text-red-200">Request forgery</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

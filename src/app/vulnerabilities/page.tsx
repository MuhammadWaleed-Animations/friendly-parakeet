import Link from "next/link";

export default function Vulnerabilities() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            🚨 Security Vulnerabilities
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-3xl mx-auto">
            Explore intentional security flaws for educational purposes
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <Link 
              href="/vulnerabilities/sql-injection" 
              className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 hover:bg-red-700/50 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3 text-red-200">💉 SQL Injection</h3>
              <p className="text-red-100">Test SQL injection vulnerabilities</p>
            </Link>
            
            <Link 
              href="/vulnerabilities/xss" 
              className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 hover:bg-red-700/50 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3 text-red-200">🎯 Cross-Site Scripting (XSS)</h3>
              <p className="text-red-100">Explore XSS attack vectors</p>
            </Link>
            
            <Link 
              href="/vulnerabilities/csrf" 
              className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 hover:bg-red-700/50 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3 text-red-200">🔄 CSRF</h3>
              <p className="text-red-100">Cross-Site Request Forgery examples</p>
            </Link>
            
            <Link 
              href="/vulnerabilities/auth-bypass" 
              className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 hover:bg-red-700/50 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3 text-red-200">🔐 Authentication Bypass</h3>
              <p className="text-red-100">Test authentication vulnerabilities</p>
            </Link>
            
            <Link 
              href="/vulnerabilities/file-upload" 
              className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 hover:bg-red-700/50 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3 text-red-200">📁 File Upload</h3>
              <p className="text-red-100">Unsafe file upload vulnerabilities</p>
            </Link>
            
            <Link 
              href="/vulnerabilities/ssrf" 
              className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 hover:bg-red-700/50 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3 text-red-200">🌐 SSRF</h3>
              <p className="text-red-100">Server-Side Request Forgery</p>
            </Link>
          </div>
          
          <div className="text-center">
            <Link 
              href="/" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-8 py-3 hover:bg-white/20 transition-all duration-300 inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

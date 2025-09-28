import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="container mx-auto px-4 py-16">
        <main className="text-white max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-12 text-center drop-shadow-2xl">
            About Attack Me
          </h1>
          
          <div className="space-y-8">
            <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">🎯 Purpose</h2>
              <p className="text-lg text-red-100 leading-relaxed">
                Attack Me is a deliberately vulnerable Next.js application designed for educational purposes. 
                It contains intentional security vulnerabilities that demonstrate common web application security flaws 
                found in real-world applications.
              </p>
            </div>
            
            <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">⚠️ Important Notice</h2>
              <p className="text-lg text-yellow-100 leading-relaxed">
                <strong>This application should NEVER be used in production environments!</strong> 
                All vulnerabilities are intentionally implemented for learning and security testing purposes only.
              </p>
            </div>
            
            <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">🔍 Educational Value</h2>
              <ul className="text-lg text-red-100 space-y-2">
                <li>• Learn about common web vulnerabilities (OWASP Top 10)</li>
                <li>• Practice ethical hacking techniques</li>
                <li>• Understand security best practices</li>
                <li>• Test security tools and scanners</li>
                <li>• Develop secure coding awareness</li>
                <li>• Learn vulnerability remediation</li>
              </ul>
            </div>
            
            <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">🛡️ Responsible Disclosure</h2>
              <p className="text-lg text-red-100 leading-relaxed">
                If you discover additional vulnerabilities beyond those intentionally included, 
                please report them responsibly for educational enhancement. This helps improve 
                the learning experience for all users.
              </p>
            </div>
            
            <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">📚 Learning Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-red-200">OWASP Resources:</h3>
                  <ul className="text-red-100 space-y-1">
                    <li>• OWASP Top 10</li>
                    <li>• Web Security Testing Guide</li>
                    <li>• Secure Coding Practices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-red-200">Tools to Try:</h3>
                  <ul className="text-red-100 space-y-1">
                    <li>• Burp Suite</li>
                    <li>• OWASP ZAP</li>
                    <li>• SQLMap</li>
                    <li>• XSStrike</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
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

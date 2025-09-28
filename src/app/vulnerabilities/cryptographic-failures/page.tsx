'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CryptographicFailures() {
  const [password, setPassword] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');

  // Weak encryption function (MD5 - vulnerable)
  const weakEncrypt = (text: string) => {
    // This is a mock MD5 implementation - in real scenarios, this would be actual MD5
    return 'md5_' + btoa(text).substring(0, 16);
  };

  // Hardcoded secrets (vulnerability)
  const HARDCODED_SECRETS = {
    apiKey: 'sk-1234567890abcdef',
    databasePassword: 'admin123',
    jwtSecret: 'mySecretKey123',
    encryptionKey: 'weakkey123'
  };

  const handleWeakEncryption = () => {
    if (password) {
      const encrypted = weakEncrypt(password);
      setEncryptedPassword(encrypted);
      setMessage('Password encrypted with weak MD5 algorithm!');
    }
  };

  const handleDecrypt = () => {
    if (encryptedPassword) {
      // Weak decryption - no proper key management
      setDecryptedPassword('Decrypted: ' + password);
      setMessage('Password decrypted without proper key management!');
    }
  };

  const handleShowSecrets = () => {
    setMessage('Hardcoded secrets exposed!');
  };

  const handleInsecureTransmission = () => {
    setMessage('Data transmitted over HTTP without encryption!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            🔐 A02: Cryptographic Failures
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-3xl mx-auto">
            Explore weak encryption, hardcoded secrets, and insecure data transmission
          </p>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Weak Encryption */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🔓 Weak Encryption (MD5)</h2>
              <p className="text-red-100 mb-4">Using MD5 for password hashing - easily crackable!</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter password to encrypt"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-red-900/50 border border-red-400/30 text-white placeholder-red-300"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleWeakEncryption}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                  >
                    Encrypt with MD5
                  </button>
                  <button
                    onClick={handleDecrypt}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                  >
                    Decrypt
                  </button>
                </div>
                
                {encryptedPassword && (
                  <div className="bg-red-900/30 rounded p-4 text-left">
                    <p className="text-sm">Encrypted: {encryptedPassword}</p>
                    {decryptedPassword && <p className="text-sm mt-2">{decryptedPassword}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Hardcoded Secrets */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🔑 Hardcoded Secrets</h2>
              <p className="text-red-100 mb-4">Secrets stored in plain text in the code!</p>
              
              <button
                onClick={handleShowSecrets}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
              >
                Show Hardcoded Secrets
              </button>

              {message.includes('Hardcoded secrets') && (
                <div className="bg-red-900/30 rounded p-4 mt-4 text-left">
                  <h3 className="text-xl font-bold mb-2">Exposed Secrets:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• API Key: {HARDCODED_SECRETS.apiKey}</li>
                    <li>• Database Password: {HARDCODED_SECRETS.databasePassword}</li>
                    <li>• JWT Secret: {HARDCODED_SECRETS.jwtSecret}</li>
                    <li>• Encryption Key: {HARDCODED_SECRETS.encryptionKey}</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Insecure Transmission */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">📡 Insecure Transmission</h2>
              <p className="text-red-100 mb-4">Data sent over HTTP without encryption</p>
              
              <button
                onClick={handleInsecureTransmission}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
              >
                Simulate HTTP Transmission
              </button>
            </div>

            {/* Weak Random Generation */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🎲 Weak Random Generation</h2>
              <p className="text-red-100 mb-4">Using predictable random number generation</p>
              
              <div className="bg-red-900/30 rounded p-4 text-left">
                <p className="text-sm">Weak Random Token: {Math.random().toString(36).substring(2, 15)}</p>
                <p className="text-sm mt-2">Session ID: {Date.now().toString(36)}</p>
                <p className="text-sm mt-2">API Key: {Math.floor(Math.random() * 1000000)}</p>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className="bg-yellow-900/40 border border-yellow-400/30 rounded p-4">
                <p className="text-yellow-200">{message}</p>
              </div>
            )}

            {/* Educational Notes */}
            <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-400/30 rounded-lg p-6 text-left">
              <h3 className="text-2xl font-bold mb-4 text-blue-200">💡 Educational Notes</h3>
              <ul className="text-blue-100 space-y-2">
                <li>• <strong>Use Strong Hashing:</strong> bcrypt, scrypt, or Argon2 instead of MD5/SHA1</li>
                <li>• <strong>Environment Variables:</strong> Store secrets in environment variables, not code</li>
                <li>• <strong>HTTPS Only:</strong> Always use HTTPS for data transmission</li>
                <li>• <strong>Secure Random:</strong> Use cryptographically secure random number generators</li>
                <li>• <strong>Key Management:</strong> Implement proper key rotation and management</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/vulnerabilities" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-8 py-3 hover:bg-white/20 transition-all duration-300 inline-block"
            >
              ← Back to Vulnerabilities
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BrokenAccessControl() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [adminPanel, setAdminPanel] = useState(false);
  const [message, setMessage] = useState('');

  // Simulated user database
  const users = {
    '1': { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', salary: 50000 },
    '2': { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', salary: 60000 },
    '3': { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', salary: 100000 },
    '4': { id: 4, name: 'Bob Wilson', email: 'bob@example.com', role: 'user', salary: 45000 }
  };

  const handleGetUser = () => {
    if (userId && users[userId]) {
      setUserData(users[userId]);
      setMessage(`Retrieved data for user ID: ${userId}`);
    } else {
      setMessage('User not found');
    }
  };

  const handleAdminAccess = () => {
    // Vulnerable: No authentication check
    setAdminPanel(true);
    setMessage('Admin panel accessed without authentication!');
  };

  const handlePrivilegeEscalation = () => {
    // Vulnerable: Direct role modification
    if (userData) {
      const escalatedUser = { ...userData, role: 'admin' };
      setUserData(escalatedUser);
      setMessage('Privilege escalated! User is now admin.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            🚪 A01: Broken Access Control
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-3xl mx-auto">
            Test various access control vulnerabilities including IDOR, privilege escalation, and admin panel access
          </p>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* IDOR Vulnerability */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🔍 Insecure Direct Object Reference (IDOR)</h2>
              <p className="text-red-100 mb-4">Try accessing different user IDs to see sensitive data</p>
              
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Enter User ID (1-4)"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="px-4 py-2 rounded bg-red-900/50 border border-red-400/30 text-white placeholder-red-300"
                />
                <button
                  onClick={handleGetUser}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                >
                  Get User Data
                </button>
              </div>

              {userData && (
                <div className="bg-red-900/30 rounded p-4 text-left">
                  <h3 className="text-xl font-bold mb-2">User Data Retrieved:</h3>
                  <pre className="text-sm">{JSON.stringify(userData, null, 2)}</pre>
                </div>
              )}
            </div>

            {/* Admin Panel Access */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🔐 Admin Panel Access</h2>
              <p className="text-red-100 mb-4">No authentication required - this is a vulnerability!</p>
              
              <button
                onClick={handleAdminAccess}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
              >
                Access Admin Panel
              </button>

              {adminPanel && (
                <div className="bg-red-900/30 rounded p-4 mt-4 text-left">
                  <h3 className="text-xl font-bold mb-2">Admin Panel:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• View all users</li>
                    <li>• Delete users</li>
                    <li>• Modify user roles</li>
                    <li>• Access system settings</li>
                    <li>• View audit logs</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Privilege Escalation */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">⬆️ Privilege Escalation</h2>
              <p className="text-red-100 mb-4">Escalate user privileges without proper authorization</p>
              
              <button
                onClick={handlePrivilegeEscalation}
                disabled={!userData}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Escalate to Admin
              </button>
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
                <li>• <strong>IDOR:</strong> Always validate user permissions before accessing resources</li>
                <li>• <strong>Admin Access:</strong> Implement proper authentication and authorization</li>
                <li>• <strong>Privilege Escalation:</strong> Never trust client-side role modifications</li>
                <li>• <strong>Best Practices:</strong> Use principle of least privilege, implement proper access controls</li>
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

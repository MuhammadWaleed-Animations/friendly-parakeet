'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InsecureDesign() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [businessLogic, setBusinessLogic] = useState('');
  const [logicResult, setLogicResult] = useState('');
  const [message, setMessage] = useState('');

  // Simulated user database with business logic flaws
  const users = {
    '1': { id: 1, name: 'John Doe', balance: 1000, isVip: false, lastLogin: '2024-01-01' },
    '2': { id: 2, name: 'Jane Smith', balance: 5000, isVip: true, lastLogin: '2024-01-15' },
    '3': { id: 3, name: 'Bob Wilson', balance: 100, isVip: false, lastLogin: '2023-12-01' }
  };

  const handleDirectObjectReference = () => {
    if (userId && users[userId]) {
      setUserData(users[userId]);
      setMessage('Direct object reference vulnerability - no authorization check!');
    } else {
      setMessage('User not found');
    }
  };

  const handleBusinessLogicFlaw = () => {
    // Flawed business logic - allows negative balance
    if (userData) {
      const newBalance = userData.balance - 2000; // Allow overdraft
      const updatedUser = { ...userData, balance: newBalance };
      setUserData(updatedUser);
      setLogicResult(`Balance updated to: $${newBalance} (Negative balance allowed!)`);
      setMessage('Business logic flaw: Negative balance allowed!');
    }
  };

  const handleRaceCondition = () => {
    // Simulate race condition in concurrent operations
    setMessage('Race condition: Multiple requests processed simultaneously without proper locking!');
  };

  const handleInsecureWorkflow = () => {
    // Insecure workflow - skip validation steps
    setMessage('Insecure workflow: Critical validation steps bypassed!');
  };

  const handleTimeBasedAttack = () => {
    // Time-based attack simulation
    setMessage('Time-based attack: Response time reveals user existence!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            🏗️ A04: Insecure Design
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-3xl mx-auto">
            Explore business logic flaws, insecure workflows, and design vulnerabilities
          </p>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Insecure Direct Object Reference */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🔍 Insecure Direct Object Reference</h2>
              <p className="text-red-100 mb-4">Access user data without proper authorization</p>
              
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="px-4 py-2 rounded bg-red-900/50 border border-red-400/30 text-white placeholder-red-300"
                />
                <button
                  onClick={handleDirectObjectReference}
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

            {/* Business Logic Flaws */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">💼 Business Logic Flaws</h2>
              <p className="text-red-100 mb-4">Flawed business rules allow invalid operations</p>
              
              <button
                onClick={handleBusinessLogicFlaw}
                disabled={!userData}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Allow Negative Balance
              </button>

              {logicResult && (
                <div className="bg-red-900/30 rounded p-4 mt-4 text-left">
                  <p className="text-sm">{logicResult}</p>
                </div>
              )}
            </div>

            {/* Race Conditions */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🏃 Race Conditions</h2>
              <p className="text-red-100 mb-4">Concurrent operations without proper synchronization</p>
              
              <button
                onClick={handleRaceCondition}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
              >
                Simulate Race Condition
              </button>
            </div>

            {/* Insecure Workflows */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🔄 Insecure Workflows</h2>
              <p className="text-red-100 mb-4">Critical validation steps can be bypassed</p>
              
              <button
                onClick={handleInsecureWorkflow}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
              >
                Bypass Validation
              </button>
            </div>

            {/* Time-Based Attacks */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">⏱️ Time-Based Attacks</h2>
              <p className="text-red-100 mb-4">Response time reveals information about system state</p>
              
              <button
                onClick={handleTimeBasedAttack}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
              >
                Simulate Timing Attack
              </button>
            </div>

            {/* Design Anti-Patterns */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🚫 Design Anti-Patterns</h2>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-red-200">Common Flaws:</h3>
                  <ul className="text-sm space-y-1 text-red-100">
                    <li>• Trust client-side validation</li>
                    <li>• Skip authorization checks</li>
                    <li>• Allow direct object access</li>
                    <li>• Inadequate rate limiting</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-red-200">Business Logic Issues:</h3>
                  <ul className="text-sm space-y-1 text-red-100">
                    <li>• Allow negative balances</li>
                    <li>• Skip payment verification</li>
                    <li>• Bypass approval workflows</li>
                    <li>• Inconsistent state management</li>
                  </ul>
                </div>
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
                <li>• <strong>Threat Modeling:</strong> Identify threats early in the design phase</li>
                <li>• <strong>Secure by Design:</strong> Build security into the architecture</li>
                <li>• <strong>Authorization:</strong> Implement proper access controls at every level</li>
                <li>• <strong>Business Logic:</strong> Validate all business rules on the server side</li>
                <li>• <strong>State Management:</strong> Handle concurrent operations safely</li>
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

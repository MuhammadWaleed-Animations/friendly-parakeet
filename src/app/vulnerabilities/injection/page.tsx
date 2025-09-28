'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Injection() {
  const [sqlQuery, setSqlQuery] = useState('');
  const [sqlResult, setSqlResult] = useState('');
  const [nosqlQuery, setNosqlQuery] = useState('');
  const [nosqlResult, setNosqlResult] = useState('');
  const [command, setCommand] = useState('');
  const [commandResult, setCommandResult] = useState('');
  const [ldapQuery, setLdapQuery] = useState('');
  const [ldapResult, setLdapResult] = useState('');
  const [message, setMessage] = useState('');

  // Simulated database
  const mockDatabase = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user' }
  ];

  const handleSqlInjection = () => {
    // Vulnerable SQL query construction
    const vulnerableQuery = `SELECT * FROM users WHERE name = '${sqlQuery}'`;
    setSqlResult(vulnerableQuery);
    setMessage('SQL Injection executed! Query: ' + vulnerableQuery);
  };

  const handleNoSqlInjection = () => {
    // Vulnerable NoSQL query construction
    const vulnerableQuery = `db.users.find({name: "${nosqlQuery}"})`;
    setNosqlResult(vulnerableQuery);
    setMessage('NoSQL Injection executed! Query: ' + vulnerableQuery);
  };

  const handleCommandInjection = () => {
    // Vulnerable command execution
    const vulnerableCommand = `ping ${command}`;
    setCommandResult(vulnerableCommand);
    setMessage('Command Injection executed! Command: ' + vulnerableCommand);
  };

  const handleLdapInjection = () => {
    // Vulnerable LDAP query construction
    const vulnerableQuery = `(&(objectClass=user)(cn=${ldapQuery}))`;
    setLdapResult(vulnerableQuery);
    setMessage('LDAP Injection executed! Query: ' + vulnerableQuery);
  };

  const handleXssInjection = () => {
    setMessage('XSS payload executed: <script>alert("XSS")</script>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            💉 A03: Injection
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-3xl mx-auto">
            Test various injection attacks including SQL, NoSQL, Command, and LDAP injection
          </p>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* SQL Injection */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🗄️ SQL Injection</h2>
              <p className="text-red-100 mb-4">Try: admin' OR '1'='1' --</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter SQL injection payload"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-red-900/50 border border-red-400/30 text-white placeholder-red-300"
                />
                <button
                  onClick={handleSqlInjection}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                >
                  Execute SQL Query
                </button>
                
                {sqlResult && (
                  <div className="bg-red-900/30 rounded p-4 text-left">
                    <p className="text-sm">Executed Query: {sqlResult}</p>
                  </div>
                )}
              </div>
            </div>

            {/* NoSQL Injection */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🍃 NoSQL Injection</h2>
              <p className="text-red-100 mb-4">Try: {"{$ne: null}"}</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter NoSQL injection payload"
                  value={nosqlQuery}
                  onChange={(e) => setNosqlQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-red-900/50 border border-red-400/30 text-white placeholder-red-300"
                />
                <button
                  onClick={handleNoSqlInjection}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                >
                  Execute NoSQL Query
                </button>
                
                {nosqlResult && (
                  <div className="bg-red-900/30 rounded p-4 text-left">
                    <p className="text-sm">Executed Query: {nosqlResult}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Command Injection */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">⚡ Command Injection</h2>
              <p className="text-red-100 mb-4">Try: 127.0.0.1; cat /etc/passwd</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter command injection payload"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-red-900/50 border border-red-400/30 text-white placeholder-red-300"
                />
                <button
                  onClick={handleCommandInjection}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                >
                  Execute Command
                </button>
                
                {commandResult && (
                  <div className="bg-red-900/30 rounded p-4 text-left">
                    <p className="text-sm">Executed Command: {commandResult}</p>
                  </div>
                )}
              </div>
            </div>

            {/* LDAP Injection */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">📁 LDAP Injection</h2>
              <p className="text-red-100 mb-4">Try: admin)(&(password=*))</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter LDAP injection payload"
                  value={ldapQuery}
                  onChange={(e) => setLdapQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-red-900/50 border border-red-400/30 text-white placeholder-red-300"
                />
                <button
                  onClick={handleLdapInjection}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                >
                  Execute LDAP Query
                </button>
                
                {ldapResult && (
                  <div className="bg-red-900/30 rounded p-4 text-left">
                    <p className="text-sm">Executed Query: {ldapResult}</p>
                  </div>
                )}
              </div>
            </div>

            {/* XSS Injection */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">🎯 XSS Injection</h2>
              <p className="text-red-100 mb-4">Cross-Site Scripting attack simulation</p>
              
              <button
                onClick={handleXssInjection}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
              >
                Execute XSS Payload
              </button>
            </div>

            {/* Sample Payloads */}
            <div className="bg-red-800/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-red-200">💣 Sample Payloads</h2>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-red-200">SQL Injection:</h3>
                  <ul className="text-sm space-y-1 text-red-100">
                    <li>• admin' OR '1'='1' --</li>
                    <li>• ' UNION SELECT * FROM users --</li>
                    <li>• '; DROP TABLE users; --</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-red-200">NoSQL Injection:</h3>
                  <ul className="text-sm space-y-1 text-red-100">
                    <li>• {"{$ne: null}"}</li>
                    <li>• {"{$gt: ''}"}</li>
                    <li>• {"{$regex: '.*'}"}</li>
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
                <li>• <strong>Parameterized Queries:</strong> Use prepared statements for SQL queries</li>
                <li>• <strong>Input Validation:</strong> Validate and sanitize all user inputs</li>
                <li>• <strong>Output Encoding:</strong> Encode output to prevent XSS</li>
                <li>• <strong>Least Privilege:</strong> Use database accounts with minimal privileges</li>
                <li>• <strong>WAF:</strong> Implement Web Application Firewalls for additional protection</li>
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

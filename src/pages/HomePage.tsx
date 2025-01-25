import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShieldAlt, faChartBar, faEye, faLock } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
              URL Shortener <span className="text-blue-600">with a twist</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Secure, private, and feature-rich URL shortening service with advanced protection mechanisms and real-time analytics
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How CCLinker Works
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Simple, secure, and powerful URL management in three easy steps
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <FontAwesomeIcon icon={faLink} className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">1. Create Short Links</h3>
                <p className="mt-2 text-base text-gray-500">
                  Generate shortened URLs with custom access controls, expiration settings, and optional decoy pages
                </p>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <FontAwesomeIcon icon={faShieldAlt} className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">2. Add Protection</h3>
                <p className="mt-2 text-base text-gray-500">
                  Secure links with passwords, email whitelisting, or create decoy pages for enhanced privacy
                </p>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <FontAwesomeIcon icon={faChartBar} className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">3. Track Analytics</h3>
                <p className="mt-2 text-base text-gray-500">
                  Monitor link performance with real-time analytics, access logs, and detailed insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Advanced Features
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need for secure and private link sharing
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                  <FontAwesomeIcon icon={faYoutube} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Decoy Pages</h3>
                <p className="mt-2 text-base text-gray-500">
                  Create YouTube-like decoy pages to mask sensitive links. Only users with the passphrase can access the real content.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                  <FontAwesomeIcon icon={faLock} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Access Controls</h3>
                <p className="mt-2 text-base text-gray-500">
                  Set expiration dates, limit access counts, and restrict access to specific email addresses.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                  <FontAwesomeIcon icon={faEye} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Real-time Tracking</h3>
                <p className="mt-2 text-base text-gray-500">
                  Monitor link activity in real-time with detailed analytics and access logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Perfect For
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Trusted by professionals across various industries
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">Enterprise Security</h3>
              <ul className="mt-4 space-y-3 text-gray-500">
                <li>• Secure sharing of sensitive documents</li>
                <li>• Prevent unauthorized access to confidential links</li>
                <li>• Track document access and usage</li>
                <li>• Maintain compliance with security protocols</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">Affiliate Marketing</h3>
              <ul className="mt-4 space-y-3 text-gray-500">
                <li>• Track campaign performance</li>
                <li>• Protect affiliate links from bots</li>
                <li>• Monitor click-through rates</li>
                <li>• Generate detailed analytics reports</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">Private Sharing</h3>
              <ul className="mt-4 space-y-3 text-gray-500">
                <li>• Share links privately among friends</li>
                <li>• Create decoy pages for sensitive content</li>
                <li>• Control who can access your links</li>
                <li>• Set expiration dates for temporary access</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">Content Creators</h3>
              <ul className="mt-4 space-y-3 text-gray-500">
                <li>• Protect premium content</li>
                <li>• Track audience engagement</li>
                <li>• Limit access to paying members</li>
                <li>• Generate QR codes for easy sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to secure your links?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Join thousands of users who trust CCLinker for secure link sharing
            </p>
            <div className="mt-8">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
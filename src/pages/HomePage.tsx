import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-blue-600">CCLinker</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Secure URL shortening with advanced access controls and analytics
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/signup"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                1
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Create Short Links</h3>
              <p className="mt-2 text-base text-gray-500">
                Generate shortened URLs with custom access controls and expiration settings
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                2
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Secure Access</h3>
              <p className="mt-2 text-base text-gray-500">
                Protect links with passwords, secret words, or email whitelisting
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                3
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Track Performance</h3>
              <p className="mt-2 text-base text-gray-500">
                Monitor link performance with detailed analytics and insights
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Key Features
          </h2>
          <div className="mt-20">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'Password Protection',
                  description: 'Secure your links with custom passwords',
                },
                {
                  title: 'Email Whitelisting',
                  description: 'Control access by specifying allowed email addresses',
                },
                {
                  title: 'QR Code Generation',
                  description: 'Generate QR codes for easy mobile access',
                },
                {
                  title: 'Access Analytics',
                  description: 'Track visits, unique users, and access patterns',
                },
              ].map((feature) => (
                <div key={feature.title} className="relative">
                  <dt>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
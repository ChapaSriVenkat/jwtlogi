import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthLayout: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="transition-all duration-500 ease-in-out">
            {isLogin ? (
              <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full opacity-40"></div>
        <div className="absolute -z-10 -bottom-4 -right-4 w-6 h-6 bg-purple-200 rounded-full opacity-40"></div>
        <div className="absolute -z-10 top-1/2 -left-8 w-4 h-4 bg-pink-200 rounded-full opacity-40"></div>
        <div className="absolute -z-10 top-1/4 -right-6 w-3 h-3 bg-indigo-200 rounded-full opacity-40"></div>
      </div>
    </div>
  );
};
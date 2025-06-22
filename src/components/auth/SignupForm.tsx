import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PasswordStrength } from '../ui/PasswordStrength';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const { signup } = useAuth();

  const { values, errors, touched, setValue, setFieldTouched, validateAll } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      password: {
        required: true,
        minLength: 8,
        custom: (value) => {
          if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
          if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
          if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
          return null;
        },
      },
      confirmPassword: {
        required: true,
        custom: (value) => {
          if (value !== values.password) return 'Passwords do not match';
          return null;
        },
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateAll()) return;

    setIsLoading(true);
    try {
      await signup(values.name, values.email, values.password, values.confirmPassword);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-4 shadow-lg">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
        <p className="text-gray-600">Join us and start your journey today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {apiError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
            <p className="text-red-700 text-sm font-medium">{apiError}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
            <Input
              type="text"
              placeholder="Enter your full name"
              value={values.name}
              onChange={(e) => setValue('name', e.target.value)}
              onBlur={() => setFieldTouched('name')}
              error={touched.name ? errors.name : ''}
              className="pl-11"
              autoComplete="name"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
            <Input
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(e) => setValue('email', e.target.value)}
              onBlur={() => setFieldTouched('email')}
              error={touched.email ? errors.email : ''}
              className="pl-11"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={values.password}
              onChange={(e) => setValue('password', e.target.value)}
              onBlur={() => setFieldTouched('password')}
              error={touched.password ? errors.password : ''}
              className="pl-11 pr-12"
              autoComplete="new-password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            <PasswordStrength password={values.password} />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={(e) => setValue('confirmPassword', e.target.value)}
              onBlur={() => setFieldTouched('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : ''}
              className="pl-11 pr-12"
              autoComplete="new-password"
              showPasswordToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div>

        <div className="flex items-start">
          <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1" required />
          <label className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-purple-600 hover:text-purple-500 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-600 hover:text-purple-500 font-medium">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Create Account
        </Button>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-purple-600 hover:text-purple-500 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
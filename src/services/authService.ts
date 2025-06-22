import { LoginCredentials, SignupCredentials, AuthResponse, User } from '../types/auth';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock JWT token generation
const generateToken = (user: User): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

// Mock user database
const users: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(1000); // Simulate API call

    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In a real app, you'd verify the password hash
    if (credentials.password.length < 6) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user);
    localStorage.setItem('authToken', token);
    
    return { token, user };
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    await delay(1200); // Simulate API call

    // Check if user already exists
    const existingUser = users.find(u => u.email === credentials.email);
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    // Validate password match
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      avatar: `https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400`
    };

    users.push(newUser);
    
    const token = generateToken(newUser);
    localStorage.setItem('authToken', token);
    
    return { token, user: newUser };
  },

  async verifyToken(token: string): Promise<User | null> {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      
      // Check if token is expired
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }
      
      // Find user
      const user = users.find(u => u.id === payload.sub);
      return user || null;
    } catch {
      return null;
    }
  },

  logout(): void {
    localStorage.removeItem('authToken');
  },

  getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }
};
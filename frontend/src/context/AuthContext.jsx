import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, wishlistAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [wishlistIds, setWishlistIds] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await wishlistAPI.getWishlist();
      setWishlistIds(res.data.wishlist.map(w => w._id || w));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          const response = await authAPI.getMe();
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          await fetchWishlist();
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      await fetchWishlist();

      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);

      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // ignore logout API error
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setWishlistIds([]);
      toast.success('Logged out successfully');
    }
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error('Please login to use wishlist');
      return;
    }
    const isWished = wishlistIds.includes(product._id);
    try {
      if (isWished) {
        await wishlistAPI.removeFromWishlist(product._id);
        setWishlistIds(prev => prev.filter(id => id !== product._id));
        toast.success('Removed from wishlist');
      } else {
        await wishlistAPI.addToWishlist(product._id);
        setWishlistIds(prev => [...prev, product._id]);
        toast.success('Added to wishlist');
      }
    } catch (e) {
      toast.error('Failed to update wishlist');
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    wishlistIds,
    toggleWishlist,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
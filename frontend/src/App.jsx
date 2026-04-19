import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { Suspense, lazy } from 'react';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const CategoryProducts = lazy(() => import('./pages/CategoryProducts'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Shop = lazy(() => import('./pages/Shop'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const Profile = lazy(() => import('./pages/Profile'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ManageProducts = lazy(() => import('./pages/ManageProducts'));
const ManageCategories = lazy(() => import('./pages/ManageCategories'));
const ManageBanners = lazy(() => import('./pages/ManageBanners'));
const ManageUsers = lazy(() => import('./pages/ManageUsers'));
const ManageOrders = lazy(() => import('./pages/ManageOrders'));
const ManageReviews = lazy(() => import('./pages/ManageReviews'));
const ManageMessages = lazy(() => import('./pages/ManageMessages'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));

const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <CircularProgress color="primary" />
  </Box>
);

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/:slug" element={<CategoryProducts />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="shop" element={<Shop />} />
          <Route path="search" element={<Navigate to="/shop" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword/:token" element={<ResetPassword />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="terms" element={<Terms />} />
          <Route path="return-policy" element={<ReturnPolicy />} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
          <Route path="orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
        </Route>
        <Route path="/admin" element={<AdminRoute><Layout /></AdminRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
          <Route path="categories" element={<AdminRoute><ManageCategories /></AdminRoute>} />
          <Route path="banners" element={<AdminRoute><ManageBanners /></AdminRoute>} />
          <Route path="users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
          <Route path="orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />
          <Route path="reviews" element={<AdminRoute><ManageReviews /></AdminRoute>} />
          <Route path="messages" element={<AdminRoute><ManageMessages /></AdminRoute>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button, Input, Badge, Avatar, Dropdown, Menu, Space, Row, Col, Typography, Rate } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined, LoginOutlined, HeartOutlined } from '@ant-design/icons';
import { Product } from '../../lib/database';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';

const { Search } = Input;
const { Title, Paragraph } = Typography;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts();
    checkAuth();
    fetchCartCount();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products.slice(0, 8)); // Show first 8 products
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const checkAuth = () => {
    // VULNERABILITY: Client-side auth check - can be bypassed
    const token = document.cookie.split(';').find(c => c.trim().startsWith('auth-token='));
    if (token) {
      // In a real app, you'd verify the token
      setUser({ name: 'John Doe', email: 'john@example.com' });
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.cartItems.length);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleSearch = async (value: string) => {
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(value)}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setCartCount(0);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        cartCount={cartCount} 
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Title level={2}>Featured Products</Title>
          <Paragraph className="text-lg text-gray-600">
            Discover our most popular items
          </Paragraph>
        </div>
        
        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-12">
          <Button type="primary" size="large">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
      
      <CategorySection />
      
      <Footer />
    </div>
  );
}

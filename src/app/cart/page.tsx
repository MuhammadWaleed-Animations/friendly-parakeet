'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, InputNumber, Typography, Row, Col, message, Empty, Spin } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  name: string;
  price: number;
  image_url: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    checkAuth();
    fetchCartItems();
  }, []);

  const checkAuth = () => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('auth-token='));
    if (token) {
      setUser({ name: 'John Doe', email: 'john@example.com' });
    }
  };

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
        setCartCount(data.cartItems.length);
      } else if (response.status === 401) {
        message.error('Please login to view your cart');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartId: number) => {
    try {
      const response = await fetch(`/api/cart/${cartId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.success('Item removed from cart');
        fetchCartItems();
      } else {
        message.error('Failed to remove item');
      }
    } catch (error) {
      message.error('Error removing item');
    }
  };

  const handleUpdateQuantity = async (cartId: number, quantity: number) => {
    // VULNERABILITY: No server-side validation of quantity
    if (quantity < 1) {
      handleRemoveItem(cartId);
      return;
    }

    try {
      // For now, we'll just update locally since we don't have an update API
      setCartItems(prev => 
        prev.map(item => 
          item.id === cartId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      message.error('Error updating quantity');
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
        <div className="text-center py-12">
          <Spin size="large" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Title level={2}>Shopping Cart</Title>
          <Text className="text-gray-600">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </Text>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <Empty
              image={<ShoppingCartOutlined className="text-6xl text-gray-400" />}
              description="Your cart is empty"
            >
              <Link href="/products">
                <Button type="primary" size="large">
                  Start Shopping
                </Button>
              </Link>
            </Empty>
          </Card>
        ) : (
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card>
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 py-6 last:border-b-0">
                    <Row gutter={[16, 16]} align="middle">
                      <Col xs={24} sm={6}>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-24 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/200x150?text=No+Image';
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <div>
                          <Title level={5} className="mb-2">
                            <Link href={`/products/${item.product_id}`} className="text-blue-600">
                              {item.name}
                            </Link>
                          </Title>
                          <Text className="text-gray-600">${item.price.toFixed(2)} each</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={3}>
                        <InputNumber
                          min={1}
                          max={99}
                          value={item.quantity}
                          onChange={(value) => handleUpdateQuantity(item.id, value || 1)}
                          className="w-full"
                        />
                      </Col>
                      <Col xs={12} sm={3} className="text-right">
                        <div>
                          <Text className="text-lg font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-2"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card className="sticky top-4">
                <Title level={4}>Order Summary</Title>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Text>Subtotal ({cartItems.length} items)</Text>
                    <Text>${calculateTotal().toFixed(2)}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text>Shipping</Text>
                    <Text>Free</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text>Tax</Text>
                    <Text>$0.00</Text>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <Text>Total</Text>
                      <Text>${calculateTotal().toFixed(2)}</Text>
                    </div>
                  </div>
                  <Button type="primary" size="large" className="w-full mt-4">
                    Proceed to Checkout
                  </Button>
                  <Link href="/products">
                    <Button className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

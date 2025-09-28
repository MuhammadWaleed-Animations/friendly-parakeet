'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, Button, InputNumber, Typography, Row, Col, Rate, message, Spin } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Product } from '../../../../lib/database';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { Title, Paragraph } = Typography;

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    checkAuth();
    fetchProduct();
    fetchCartCount();
  }, [productId]);

  const checkAuth = () => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('auth-token='));
    if (token) {
      setUser({ name: 'John Doe', email: 'john@example.com' });
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      } else {
        message.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      message.error('Error loading product');
    } finally {
      setLoading(false);
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

  const handleAddToCart = async () => {
    if (!user) {
      message.error('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product?.id,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        message.success('Added to cart!');
        fetchCartCount();
      } else {
        message.error('Failed to add to cart');
      }
    } catch (error) {
      message.error('Error adding to cart');
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
        <div className="text-center py-12">
          <Title level={2}>Product Not Found</Title>
          <Paragraph>The product you're looking for doesn't exist.</Paragraph>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Row gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <div className="sticky top-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
                }}
              />
            </div>
          </Col>
          
          <Col xs={24} lg={12}>
            <div className="space-y-6">
              <div>
                <Title level={1}>{product.name}</Title>
                <div className="flex items-center space-x-4 mb-4">
                  <Rate disabled defaultValue={4.5} />
                  <span className="text-gray-600">(128 reviews)</span>
                </div>
                <Title level={2} className="text-blue-600">
                  ${product.price.toFixed(2)}
                </Title>
              </div>

              <div>
                <Title level={4}>Description</Title>
                <Paragraph className="text-gray-700">
                  {product.description}
                </Paragraph>
              </div>

              <div>
                <Title level={4}>Product Details</Title>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Stock:</span>
                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">SKU:</span>
                    <span>#{product.id.toString().padStart(6, '0')}</span>
                  </div>
                </div>
              </div>

              <div>
                <Title level={4}>Quantity</Title>
                <div className="flex items-center space-x-4">
                  <InputNumber
                    min={1}
                    max={product.stock}
                    value={quantity}
                    onChange={(value) => setQuantity(value || 1)}
                    className="w-20"
                  />
                  <span className="text-gray-600">
                    {product.stock} available
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  size="large"
                  icon={<HeartOutlined />}
                  disabled
                >
                  Wishlist
                </Button>
                <Button
                  size="large"
                  icon={<ShareAltOutlined />}
                >
                  Share
                </Button>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <Title level={5}>Shipping Information</Title>
                <ul className="space-y-1 text-sm">
                  <li>• Free shipping on orders over $50</li>
                  <li>• Standard delivery: 3-5 business days</li>
                  <li>• Express delivery: 1-2 business days</li>
                  <li>• 30-day return policy</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      
      <Footer />
    </div>
  );
}

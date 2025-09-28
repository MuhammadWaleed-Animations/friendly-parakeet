'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Row, Col, Card, Input, Select, Button, Typography, Pagination, Spin } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Product } from '../../../lib/database';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  const searchParams = useSearchParams();
  const pageSize = 12;

  useEffect(() => {
    checkAuth();
    fetchCartCount();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category, sortBy, currentPage]);

  const checkAuth = () => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('auth-token='));
    if (token) {
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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products?';
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (category) params.append('category', category);
      if (sortBy) params.append('sort', sortBy);
      
      url += params.toString();
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
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

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        cartCount={cartCount} 
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Title level={2}>All Products</Title>
          <p className="text-gray-600">Discover our complete collection</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="Search products..."
                allowClear
                onSearch={handleSearch}
                enterButton={<SearchOutlined />}
                size="large"
              />
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Category"
                allowClear
                onChange={handleCategoryChange}
                size="large"
                className="w-full"
              >
                <Option value="Electronics">Electronics</Option>
                <Option value="Fashion">Fashion</Option>
                <Option value="Gaming">Gaming</Option>
                <Option value="Mobile">Mobile</Option>
                <Option value="Wearables">Wearables</Option>
                <Option value="Audio">Audio</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Sort by"
                value={sortBy}
                onChange={handleSortChange}
                size="large"
                className="w-full"
              >
                <Option value="newest">Newest</Option>
                <Option value="price-low">Price: Low to High</Option>
                <Option value="price-high">Price: High to Low</Option>
                <Option value="name">Name A-Z</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Button 
                icon={<FilterOutlined />} 
                size="large" 
                className="w-full"
                onClick={fetchProducts}
              >
                Apply Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Row gutter={[24, 24]}>
              {paginatedProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>

            {products.length === 0 && (
              <div className="text-center py-12">
                <Title level={3}>No products found</Title>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}

            {products.length > pageSize && (
              <div className="text-center mt-8">
                <Pagination
                  current={currentPage}
                  total={products.length}
                  pageSize={pageSize}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

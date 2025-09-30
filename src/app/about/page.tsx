'use client';

import { useState } from 'react';
import { Card, Typography, Row, Col, Statistic, Timeline } from 'antd';
import { TrophyOutlined, TeamOutlined, GlobalOutlined, SafetyOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

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
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Title level={1}>About Attack Me</Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted online shopping destination for premium electronics, fashion, and gaming products. 
            We're committed to providing exceptional value and service to our customers worldwide.
          </Paragraph>
            </div>
            
        {/* Stats Section */}
        <Row gutter={[24, 24]} className="mb-16">
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Happy Customers"
                value={10000}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Products Sold"
                value={50000}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Countries Served"
                value={25}
                prefix={<GlobalOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="text-center">
              <Statistic
                title="Years Experience"
                value={5}
                prefix={<SafetyOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Story Section */}
        <Row gutter={[48, 48]} className="mb-16">
          <Col xs={24} lg={12}>
            <Title level={2}>Our Story</Title>
            <Paragraph className="text-lg">
              Founded in 2019, Attack Me began as a small startup with a big vision: to make premium 
              products accessible to everyone. What started as a passion project has grown into one of 
              the most trusted names in online retail.
            </Paragraph>
            <Paragraph>
              We believe that everyone deserves access to high-quality products at fair prices. Our 
              carefully curated selection includes the latest electronics, trendy fashion items, and 
              cutting-edge gaming equipment from the world's most trusted brands.
            </Paragraph>
            <Paragraph>
              Today, we serve customers in over 25 countries and continue to expand our product 
              range while maintaining our commitment to quality, affordability, and exceptional 
              customer service.
            </Paragraph>
          </Col>
          <Col xs={24} lg={12}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
              alt="Our Team"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </Col>
        </Row>

        {/* Values Section */}
        <div className="mb-16">
          <Title level={2} className="text-center mb-12">Our Values</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card className="text-center h-full">
                <TrophyOutlined className="text-4xl text-blue-600 mb-4" />
                <Title level={4}>Quality First</Title>
                <Paragraph>
                  We carefully select every product to ensure it meets our high standards for 
                  quality and durability.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="text-center h-full">
                <TeamOutlined className="text-4xl text-green-600 mb-4" />
                <Title level={4}>Customer Focus</Title>
                <Paragraph>
                  Our customers are at the heart of everything we do. We're committed to 
                  providing exceptional service and support.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="text-center h-full">
                <GlobalOutlined className="text-4xl text-purple-600 mb-4" />
                <Title level={4}>Global Reach</Title>
                <Paragraph>
                  We're proud to serve customers worldwide, bringing great products to 
                  every corner of the globe.
                </Paragraph>
              </Card>
            </Col>
          </Row>
            </div>
            
        {/* Timeline */}
        <div className="mb-16">
          <Title level={2} className="text-center mb-12">Our Journey</Title>
          <Card>
            <Timeline
              items={[
                {
                  children: (
                    <div>
                      <Title level={4}>2019 - The Beginning</Title>
                      <Paragraph>Founded Attack Me with a vision to democratize access to premium products.</Paragraph>
            </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <Title level={4}>2020 - First Million</Title>
                      <Paragraph>Reached our first million in sales and expanded to 10 countries.</Paragraph>
            </div>
                  ),
                },
                {
                  children: (
                <div>
                      <Title level={4}>2021 - Product Expansion</Title>
                      <Paragraph>Launched our fashion and gaming categories, tripling our product range.</Paragraph>
                </div>
                  ),
                },
                {
                  children: (
                <div>
                      <Title level={4}>2022 - Global Growth</Title>
                      <Paragraph>Expanded to 25 countries and reached 10,000 happy customers.</Paragraph>
                </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <Title level={4}>2023 - Innovation</Title>
                      <Paragraph>Introduced AI-powered recommendations and mobile-first shopping experience.</Paragraph>
              </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <Title level={4}>2024 - The Future</Title>
                      <Paragraph>Continuing to innovate and expand while maintaining our core values.</Paragraph>
            </div>
                  ),
                },
              ]}
            />
          </Card>
          </div>
          
        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Title level={2} className="text-white mb-4">
            Ready to Start Shopping?
          </Title>
          <Paragraph className="text-xl text-blue-100 mb-6">
            Join thousands of satisfied customers and discover amazing products today.
          </Paragraph>
          <div className="space-x-4">
            <a href="/products" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Shop Now
            </a>
            <a href="/register" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Create Account
            </a>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

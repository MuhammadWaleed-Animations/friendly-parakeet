'use client';

import { Button, Typography, Row, Col } from 'antd';
import Link from 'next/link';
import { ShoppingOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row align="middle" gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <div className="text-center lg:text-left">
              <Title level={1} className="text-white mb-6">
                Welcome to Attack Me
              </Title>
              <Paragraph className="text-xl text-blue-100 mb-8">
                Discover premium electronics, fashion, and gaming products at unbeatable prices. 
                Your trusted online shopping destination.
              </Paragraph>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button type="primary" size="large" className="bg-white text-blue-600 border-white hover:bg-blue-50">
                  <Link href="/products" className="text-blue-600">
                    <ShoppingOutlined /> Shop Now
                  </Link>
                </Button>
                <Button size="large" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/about" className="text-white">
                    Learn More
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-blue-200">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-blue-200 flex items-center justify-center">
                    <StarOutlined className="mr-1" />
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">Products</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                alt="Shopping"
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

'use client';

import { Layout, Row, Col, Typography, Input, Button } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

export default function Footer() {
  return (
    <AntFooter className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div>
              <Title level={4} className="text-white mb-4">Attack Me</Title>
              <Text className="text-gray-300">
                Your trusted online shopping destination for premium electronics, 
                fashion, and gaming products.
              </Text>
              <div className="mt-4">
                <div className="flex items-center text-gray-300 mb-2">
                  <PhoneOutlined className="mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300 mb-2">
                  <MailOutlined className="mr-2" />
                  <span>support@attackme.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <EnvironmentOutlined className="mr-2" />
                  <span>123 Shopping St, City, State 12345</span>
                </div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div>
              <Title level={5} className="text-white mb-4">Quick Links</Title>
              <div className="space-y-2">
                <div><Link href="/products" className="text-gray-300 hover:text-white">All Products</Link></div>
                <div><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></div>
                <div><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></div>
                <div><Link href="/help" className="text-gray-300 hover:text-white">Help Center</Link></div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div>
              <Title level={5} className="text-white mb-4">Customer Service</Title>
              <div className="space-y-2">
                <div><Link href="/shipping" className="text-gray-300 hover:text-white">Shipping Info</Link></div>
                <div><Link href="/returns" className="text-gray-300 hover:text-white">Returns</Link></div>
                <div><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></div>
                <div><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div>
              <Title level={5} className="text-white mb-4">Newsletter</Title>
              <Text className="text-gray-300 mb-4 block">
                Subscribe to get updates on new products and exclusive offers.
              </Text>
              <div className="flex">
                <Input 
                  placeholder="Enter your email" 
                  className="rounded-r-none"
                />
                <Button type="primary" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <Text className="text-gray-400">
            © 2024 Attack Me. All rights reserved. | 
            <Link href="/vulnerabilities" className="text-red-400 hover:text-red-300 ml-2">
              Security Testing Site
            </Link>
          </Text>
        </div>
      </div>
    </AntFooter>
  );
}

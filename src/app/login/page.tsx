'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Form, Input, Button, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Login successful!');
        router.push('/');
      } else {
        message.error(data.error || 'Login failed');
      }
    } catch (error) {
      message.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={null} cartCount={0} onLogout={() => {}} onSearch={() => {}} />
      
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="shadow-lg">
          <div className="text-center mb-6">
            <Title level={2}>Welcome Back</Title>
            <Text className="text-gray-600">Sign in to your account</Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter your email"
                // VULNERABILITY: No input sanitization
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Enter your password"
                // VULNERABILITY: No password strength requirements
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full"
                loading={loading}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider>Or</Divider>

          <div className="text-center">
            <Text className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-800">
                Sign up here
              </Link>
            </Text>
          </div>

          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Forgot your password?
            </Link>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

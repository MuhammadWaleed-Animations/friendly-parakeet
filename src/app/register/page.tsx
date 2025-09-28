'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Form, Input, Button, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Registration successful!');
        router.push('/');
      } else {
        message.error(data.error || 'Registration failed');
      }
    } catch (error) {
      message.error('An error occurred during registration');
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
            <Title level={2}>Create Account</Title>
            <Text className="text-gray-600">Join Attack Me today</Text>
          </div>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter your full name"
                // VULNERABILITY: No input sanitization
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Enter your email"
                // VULNERABILITY: No input sanitization
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Create a password"
                // VULNERABILITY: Weak password requirements
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Confirm your password"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full"
                loading={loading}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <Divider>Or</Divider>

          <div className="text-center">
            <Text className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-800">
                Sign in here
              </Link>
            </Text>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

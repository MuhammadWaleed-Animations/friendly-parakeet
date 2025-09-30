'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Form, Input, Button, Typography, message, Steps, Alert, Divider, Space, Row, Col } from 'antd';
import { MailOutlined, LockOutlined, CheckCircleOutlined, SecurityScanOutlined, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setCartCount(0);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      // VULNERABILITY: No rate limiting, no email validation
      // VULNERABILITY: Information disclosure - reveals if email exists
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail(values.email);
        setCurrentStep(1);
        message.success('Password reset instructions sent to your email!');
      } else {
        // VULNERABILITY: Different responses for existing vs non-existing emails
        if (data.error === 'User not found') {
          message.error('No account found with this email address');
        } else {
          message.error('Failed to send reset instructions');
        }
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      // VULNERABILITY: No rate limiting on resend
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        message.success('Reset instructions sent again!');
      } else {
        message.error('Failed to resend instructions');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Enter Email',
      description: 'Enter your email address',
      icon: <MailOutlined />,
    },
    {
      title: 'Check Email',
      description: 'Check your email for reset instructions',
      icon: <CheckCircleOutlined />,
    },
    {
      title: 'Reset Password',
      description: 'Create a new password',
      icon: <LockOutlined />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
      
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card className="shadow-lg h-full">
              <div className="text-center mb-6">
                <Title level={2}>Reset Password</Title>
                <Text className="text-gray-600">Enter your email to receive reset instructions</Text>
              </div>

              <Steps current={currentStep} className="mb-8" direction="vertical">
                {steps.map((item, index) => (
                  <Step
                    key={index}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    status={index < currentStep ? 'finish' : index === currentStep ? 'process' : 'wait'}
                  />
                ))}
              </Steps>
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card className="shadow-lg h-full">

              <div className="text-center mb-6">
                <Title level={3}>Enter Your Email</Title>
                <Text className="text-gray-600">We'll send you a password reset link</Text>
              </div>

              {currentStep === 0 && (
                <Form
                  name="forgot-password"
                  onFinish={onFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input 
                      prefix={<MailOutlined />} 
                      placeholder="Enter your email address"
                      size="large"
                      // VULNERABILITY: No input sanitization
                    />
                  </Form.Item>

                  <Alert
                    message="Security Notice"
                    description="For security reasons, we'll only send reset instructions to registered email addresses."
                    type="info"
                    icon={<InfoCircleOutlined />}
                    className="mb-4"
                    // VULNERABILITY: Information disclosure - reveals email validation behavior
                  />

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      className="w-full"
                      loading={loading}
                      size="large"
                      icon={<SecurityScanOutlined />}
                    >
                      Send Reset Instructions
                    </Button>
                  </Form.Item>
                </Form>
              )}

              {currentStep === 1 && (
                <div className="text-center">
                  <div className="mb-6">
                    <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
                    <Title level={3}>Check Your Email</Title>
                    <Text className="text-gray-600">
                      We've sent password reset instructions to <strong>{email}</strong>
                    </Text>
                  </div>
                  
                  <Alert
                    message="Email Sent Successfully"
                    description="Please check your inbox and spam folder. The reset link will expire in 24 hours."
                    type="success"
                    icon={<CheckCircleOutlined />}
                    className="mb-6"
                    // VULNERABILITY: Information disclosure - reveals email sending behavior
                  />

                  <div className="space-y-4">
                    <Button 
                      type="primary" 
                      className="w-full"
                      onClick={handleResendEmail}
                      loading={loading}
                      size="large"
                      icon={<MailOutlined />}
                    >
                      Resend Instructions
                    </Button>
                    
                    <Button 
                      className="w-full"
                      onClick={() => setCurrentStep(0)}
                      size="large"
                    >
                      Try Different Email
                    </Button>
                  </div>

                  <Divider />

                  <div className="text-left">
                    <Title level={5}>Didn't receive the email?</Title>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Check your spam/junk folder</li>
                      <li>• Verify the email address is correct</li>
                      <li>• Wait a few minutes and try again</li>
                      <li>• Contact support if the problem persists</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="text-center mt-6">
                <Text className="text-gray-600">
                  Remember your password?{' '}
                  <Link href="/login" className="text-blue-600 hover:text-blue-800">
                    Sign in here
                  </Link>
                </Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Security Information Panel */}
        <Card className="mt-8" title="Security Information">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div className="text-center">
                <SecurityScanOutlined className="text-3xl text-blue-500 mb-2" />
                <Title level={5}>Secure Process</Title>
                <Text className="text-sm text-gray-600">
                  All password resets are encrypted and secure
                </Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center">
                <ClockCircleOutlined className="text-3xl text-orange-500 mb-2" />
                <Title level={5}>24 Hour Expiry</Title>
                <Text className="text-sm text-gray-600">
                  Reset links expire after 24 hours for security
                </Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center">
                <InfoCircleOutlined className="text-3xl text-green-500 mb-2" />
                <Title level={5}>Need Help?</Title>
                <Text className="text-sm text-gray-600">
                  Contact our support team for assistance
                </Text>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

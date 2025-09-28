'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Form, Input, Button, Typography, message, Tabs, Table, Tag } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, HomeOutlined, CreditCardOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    checkAuth();
    fetchOrders();
  }, []);

  const checkAuth = () => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('auth-token='));
    if (token) {
      // VULNERABILITY: Client-side auth check - can be bypassed
      setUser({ 
        name: 'John Doe', 
        email: 'john@example.com',
        phone: '555-0123',
        address: '456 Main St, City, State 12345',
        credit_card: '4532****1111'
      });
      setLoading(false);
    } else {
      router.push('/login');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setCartCount(0);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const onFinish = (values: any) => {
    // VULNERABILITY: No server-side validation, direct client-side update
    setUser({ ...user, ...values });
    message.success('Profile updated successfully!');
  };

  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
        <div className="text-center py-12">Loading...</div>
        <Footer />
      </div>
    );
  }

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Title level={2}>My Profile</Title>
          <Text className="text-gray-600">Manage your account information and orders</Text>
        </div>

        <Card>
          <Tabs defaultActiveKey="profile">
            <TabPane tab="Profile Information" key="profile">
              <Form
                layout="vertical"
                initialValues={user}
                onFinish={onFinish}
                className="max-w-2xl"
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} disabled />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                >
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Address"
                >
                  <Input.TextArea prefix={<HomeOutlined />} rows={3} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Security" key="security">
              <div className="max-w-2xl">
                <Title level={4}>Change Password</Title>
                <Form layout="vertical">
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please input your new password!' },
                      { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    rules={[
                      { required: true, message: 'Please confirm your new password!' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update Password
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>

            <TabPane tab="Payment Information" key="payment">
              <div className="max-w-2xl">
                <Title level={4}>Payment Methods</Title>
                <Card className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCardOutlined className="text-2xl mr-4" />
                      <div>
                        <Text strong>**** **** **** 1111</Text>
                        <br />
                        <Text type="secondary">Expires 12/25</Text>
                      </div>
                    </div>
                    <Button type="link">Edit</Button>
                  </div>
                </Card>
                <Button type="dashed" className="w-full">
                  Add New Payment Method
                </Button>
              </div>
            </TabPane>

            <TabPane tab="Order History" key="orders">
              <div>
                <Title level={4}>Your Orders</Title>
                {orders.length > 0 ? (
                  <Table
                    columns={orderColumns}
                    dataSource={orders}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                  />
                ) : (
                  <div className="text-center py-8">
                    <Text type="secondary">No orders found</Text>
                  </div>
                )}
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

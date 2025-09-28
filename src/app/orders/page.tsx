'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Table, Typography, Tag, Button, Empty } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  shipping_address: string;
  payment_method: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    checkAuth();
    fetchOrders();
  }, []);

  const checkAuth = () => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('auth-token='));
    if (token) {
      setUser({ name: 'John Doe', email: 'john@example.com' });
    } else {
      router.push('/login');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else if (response.status === 401) {
        message.error('Please login to view your orders');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
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

  const router = useRouter();

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => `#${id.toString().padStart(6, '0')}`,
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
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Order) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => router.push(`/orders/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Title level={2}>Order History</Title>
          <Text className="text-gray-600">Track your orders and view order details</Text>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <Empty
              image={<ShoppingCartOutlined className="text-6xl text-gray-400" />}
              description="No orders found"
            >
              <Button type="primary" size="large">
                Start Shopping
              </Button>
            </Empty>
          </Card>
        ) : (
          <Card>
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

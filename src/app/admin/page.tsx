'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Table, Button, Typography, Tag, message, Modal, Form, Input, InputNumber } from 'antd';
import { UserOutlined, EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  credit_card?: string;
  created_at: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
    fetchUsers();
  }, []);

  const checkAuth = () => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('auth-token='));
    if (token) {
      // VULNERABILITY: No server-side role validation
      setUser({ name: 'Admin User', email: 'admin@attackme.com', role: 'admin' });
    } else {
      router.push('/login');
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        message.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
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

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const router = useRouter();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => phone || 'N/A',
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: User) => (
        <div className="space-x-2">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record)}
            title="View Details"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            title="Edit User"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            title="Delete User"
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
        <div className="text-center py-12">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} onSearch={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Title level={2}>Admin Panel</Title>
          <Text className="text-gray-600">Manage users and system settings</Text>
        </div>

        <Card>
          <div className="mb-4 flex justify-between items-center">
            <Title level={4}>User Management</Title>
            <Button type="primary" icon={<PlusOutlined />}>
              Add User
            </Button>
          </div>
          
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title="User Details"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              Close
            </Button>,
          ]}
        >
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Text strong>Name:</Text> {selectedUser.name}
              </div>
              <div>
                <Text strong>Email:</Text> {selectedUser.email}
              </div>
              <div>
                <Text strong>Role:</Text> {selectedUser.role}
              </div>
              <div>
                <Text strong>Phone:</Text> {selectedUser.phone || 'N/A'}
              </div>
              <div>
                <Text strong>Address:</Text> {selectedUser.address || 'N/A'}
              </div>
              <div>
                <Text strong>Credit Card:</Text> {selectedUser.credit_card || 'N/A'}
              </div>
              <div>
                <Text strong>Created:</Text> {new Date(selectedUser.created_at).toLocaleString()}
              </div>
            </div>
          )}
        </Modal>
      </div>
      
      <Footer />
    </div>
  );
}

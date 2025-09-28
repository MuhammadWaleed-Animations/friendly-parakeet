'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Layout, Input, Button, Badge, Avatar, Dropdown, Menu, Space } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Search } = Input;

interface HeaderProps {
  user: any;
  cartCount: number;
  onLogout: () => void;
  onSearch: (value: string) => void;
}

export default function Header({ user, cartCount, onLogout, onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="orders">
        <Link href="/orders">Orders</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Attack Me
            </Link>
          </div>
          
          <div className="flex-1 max-w-lg mx-8 flex items-center">
            <Search
              placeholder="Search products..."
              allowClear
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
              size="large"
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Badge count={cartCount} size="small">
                <Button type="text" icon={<ShoppingCartOutlined />} size="large" />
              </Badge>
            </Link>
            
            {user ? (
              <Dropdown overlay={userMenu} placement="bottomRight">
                <Button type="text" className="flex items-center h-10">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className="ml-2">{user.name}</span>
                </Button>
              </Dropdown>
            ) : (
              <Space>
                <Link href="/login">
                  <Button icon={<LoginOutlined />} size="large">Login</Button>
                </Link>
                <Link href="/register">
                  <Button type="primary" size="large">Sign Up</Button>
                </Link>
              </Space>
            )}
          </div>
        </div>
      </div>
    </AntHeader>
  );
}

'use client';

import { Card, Row, Col, Typography } from 'antd';
import Link from 'next/link';
import { 
  LaptopOutlined, 
  HeartOutlined, 
  PlayCircleOutlined, 
  MobileOutlined,
  ClockCircleOutlined,
  SoundOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const categories = [
  {
    name: 'Electronics',
    icon: <LaptopOutlined className="text-4xl" />,
    color: 'from-blue-500 to-blue-600',
    href: '/products?category=Electronics'
  },
  {
    name: 'Fashion',
    icon: <HeartOutlined className="text-4xl" />,
    color: 'from-pink-500 to-pink-600',
    href: '/products?category=Fashion'
  },
  {
    name: 'Gaming',
    icon: <PlayCircleOutlined className="text-4xl" />,
    color: 'from-green-500 to-green-600',
    href: '/products?category=Gaming'
  },
  {
    name: 'Mobile',
    icon: <MobileOutlined className="text-4xl" />,
    color: 'from-purple-500 to-purple-600',
    href: '/products?category=Mobile'
  },
  {
    name: 'Wearables',
    icon: <ClockCircleOutlined className="text-4xl" />,
    color: 'from-orange-500 to-orange-600',
    href: '/products?category=Wearables'
  },
  {
    name: 'Audio',
    icon: <SoundOutlined className="text-4xl" />,
    color: 'from-indigo-500 to-indigo-600',
    href: '/products?category=Audio'
  }
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Title level={2}>Shop by Category</Title>
          <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
        </div>
        
        <Row gutter={[24, 24]}>
          {categories.map((category, index) => (
            <Col xs={12} sm={8} md={4} key={index}>
              <Link href={category.href}>
                <Card
                  hoverable
                  className="text-center h-32 flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`text-white mb-2 bg-gradient-to-r ${category.color} p-3 rounded-full`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

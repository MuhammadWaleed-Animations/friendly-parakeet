'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button, Rate, Badge, message } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { Product } from '../../../lib/database';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        message.success('Added to cart!');
      } else {
        message.error('Failed to add to cart');
      }
    } catch (error) {
      message.error('Error adding to cart');
    } finally {
      setLoading(false);
    }
  };

  const isInStock = product.stock > 0;
  const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0;
  const discountedPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;

  return (
    <Card
      hoverable
      className="h-full"
      cover={
        <div className="relative">
          <img
            alt={product.name}
            src={product.image_url}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
          {discount > 0 && (
            <Badge
              count={`-${discount}%`}
              style={{ backgroundColor: '#f50' }}
              className="absolute top-2 right-2"
            />
          )}
          {!isInStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Out of Stock</span>
            </div>
          )}
        </div>
      }
      actions={[
        <Button
          key="view"
          type="text"
          icon={<EyeOutlined />}
          href={`/products/${product.id}`}
        >
          View
        </Button>,
        <Button
          key="wishlist"
          type="text"
          icon={<HeartOutlined />}
          disabled
        >
          Wishlist
        </Button>,
        <Button
          key="cart"
          type="primary"
          icon={<ShoppingCartOutlined />}
          loading={loading}
          disabled={!isInStock}
          onClick={handleAddToCart}
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>,
      ]}
    >
      <Card.Meta
        title={
          <Link href={`/products/${product.id}`} className="text-blue-600 hover:text-blue-800">
            {product.name}
          </Link>
        }
        description={
          <div>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <div>
                {discount > 0 ? (
                  <div>
                    <span className="text-lg font-bold text-red-600">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>
              <Rate disabled defaultValue={4.5} className="text-sm" />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {product.stock} in stock
            </div>
          </div>
        }
      />
    </Card>
  );
}

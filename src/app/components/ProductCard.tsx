'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, Button, Rate, Badge, message } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { Product } from '../../../lib/database';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      className="h-full overflow-hidden rounded-md flex flex-col cursor-pointer"
      bodyStyle={{ display: 'flex', flexDirection: 'column' }}
      cover={
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            alt={product.name}
            src={product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
            priority={false}
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 z-10">
              <Badge
                count={`-${discount}%`}
                style={{ backgroundColor: '#f50', transform: 'none' }}
              />
            </div>
          )}
          {!isInStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Out of Stock</span>
            </div>
          )}
        </div>
      }
    >
      <Card.Meta
        title={
          <div className="line-clamp-1">
            <Link href={`/products/${product.id}`} className="text-blue-600 hover:text-blue-800">
              {product.name}
            </Link>
          </div>
        }
        description={
          <div>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between gap-2 flex-wrap">
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
            <div className="mt-3 flex items-center gap-2">
              <Button
                type="default"
                icon={<HeartOutlined />}
                size="small"
                className="whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
                disabled
              >
                Wishlist
              </Button>
            </div>
            <div className="mt-2">
              <Button
                block
                type="primary"
                icon={<ShoppingCartOutlined />}
                loading={loading}
                disabled={!isInStock}
                size="middle"
                onClick={(e) => handleAddToCart(e)}
              >
                {isInStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        }
      />
    </Card>
  );
}

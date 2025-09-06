// src/app/products/[id]/page.jsx - Updated Product Detail Page with Layout
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productOperations } from '../../../lib/firestore';
import { formatCurrency } from '../../../lib/utils';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import Layout from '../../../components/layout/Layout';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getPlaceholderByCategory } from '../../../lib/placeholderImage';

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { user } = useAuth();
  const { 
    addToCart, 
    isInCart, 
    getItemQuantity, 
    updateQuantity,
    removeFromCart 
  } = useCart();
  const router = useRouter();
  const productId = params.id;

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedProduct = await productOperations.getProductById(productId);
      setProduct(fetchedProduct);
    } catch (err) {
      console.error('Error loading product:', err);
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }

    if (!product.availability) {
      toast.error('This item is currently out of stock');
      return;
    }

    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  const handleUpdateCartQuantity = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product.id);
      return;
    }
    updateQuantity(product.id, newQuantity);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login to continue');
      router.push('/login');
      return;
    }

    // Add to cart and redirect to checkout
    if (addToCart(product, quantity)) {
      router.push('/checkout');
    }
  };

  const handleImageError = (e) => {
    e.target.src = getPlaceholderByCategory(product?.category);
  };

  const inCart = isInCart(product?.id);
  const cartQuantity = getItemQuantity(product?.id);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image skeleton */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-300 rounded-lg"></div>
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
              
              {/* Details skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <span className="text-6xl">❌</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-4">
              <Button onClick={loadProduct}>Try Again</Button>
              <Link href="/">
                <Button variant="outline">Go Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const images = product.images || [product.imageURL].filter(Boolean);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li>
              <Link href="/products" className="text-gray-700 hover:text-gray-900">
                Products
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-500" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
                  <div className="text-center">
                    <span className="text-8xl opacity-70">🪔</span>
                    <p className="text-gray-500 mt-2">Authentic Prasad</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <div>
                <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Ingredients or Contents */}
            {product.ingredients && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contents</h3>
                <p className="text-gray-700">{product.ingredients}</p>
              </div>
            )}

            {/* Availability */}
            <div className="flex items-center space-x-2">
              {product.availability ? (
                <>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-green-700 font-medium">In Stock</span>
                  {product.stock && (
                    <span className="text-gray-500">({product.stock} available)</span>
                  )}
                </>
              ) : (
                <>
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Cart Status */}
            {inCart && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-green-800 font-semibold">✅ Added to Cart</h4>
                    <p className="text-green-700 text-sm">
                      {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} in your cart
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateCartQuantity(cartQuantity - 1)}
                      className="p-2 border border-green-300 rounded-lg hover:bg-green-100"
                    >
                      <span className="text-lg">−</span>
                    </button>
                    <span className="px-3 py-2 font-semibold min-w-[3rem] text-center">
                      {cartQuantity}
                    </span>
                    <button
                      onClick={() => handleUpdateCartQuantity(cartQuantity + 1)}
                      disabled={cartQuantity >= product.stock}
                      className="p-2 border border-green-300 rounded-lg hover:bg-green-100 disabled:opacity-50"
                    >
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector (when not in cart) */}
            {product.availability && !inCart && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-xl">−</span>
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stock || 99)}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Total: {formatCurrency(product.price * quantity)}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {product.availability ? (
                <>
                  {inCart ? (
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/cart">
                        <Button className="w-full text-lg py-3" size="lg">
                          View Cart ({cartQuantity})
                        </Button>
                      </Link>
                      <Link href="/checkout">
                        <Button variant="outline" className="w-full text-lg py-3" size="lg">
                          Checkout Now
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        onClick={handleAddToCart}
                        className="w-full text-lg py-3"
                        size="lg"
                      >
                        Add to Cart - {formatCurrency(product.price * quantity)}
                      </Button>
                      
                      <Button 
                        onClick={handleBuyNow}
                        variant="outline"
                        className="w-full text-lg py-3"
                        size="lg"
                      >
                        Buy Now
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Button 
                  disabled 
                  className="w-full text-lg py-3"
                  size="lg"
                >
                  Out of Stock
                </Button>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast.info('Wishlist feature coming soon!')}
                >
                  Save for Later
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <div className="text-sm text-gray-600 space-y-2">
                <p>✅ Authentic Chhath Puja Prasad</p>
                <p>✅ Prepared following traditional rituals</p>
                <p>✅ Fresh and blessed items</p>
                <p>✅ Pan-India delivery available</p>
                <p>✅ Free delivery above ₹500</p>
                <p>✅ Secure payment options</p>
              </div>
            </div>

            {/* Quick Actions */}
            {user && product.availability && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Add Options:</h4>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(product, 2)}
                    className="text-sm"
                  >
                    Add 2 Items
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(product, 5)}
                    className="text-sm"
                  >
                    Add 5 Items
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(product, 10)}
                    disabled={product.stock < 10}
                    className="text-sm"
                  >
                    Add 10 Items
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-12 border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Category:</strong> {product.category || 'Prasad Items'}</p>
                <p><strong>Preparation:</strong> Traditional method</p>
                <p><strong>Shelf Life:</strong> 2-3 days</p>
                <p><strong>Storage:</strong> Store in cool, dry place</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Delivery Time:</strong> 2-3 business days</p>
                <p><strong>Free Delivery:</strong> Above ₹500</p>
                <p><strong>Packaging:</strong> Eco-friendly materials</p>
                <p><strong>Coverage:</strong> Pan-India delivery</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assurance</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Authenticity:</strong> 100% traditional recipes</p>
                <p><strong>Blessing:</strong> Performed by experienced priests</p>
                <p><strong>Quality:</strong> Premium ingredients only</p>
                <p><strong>Hygiene:</strong> Prepared in clean environment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
// src/components/layout/Footer.jsx - Professional footer for Chhath Prasadam Portal
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

const footerNavigation = {
  categories: [
    {
      name: 'Prasad Items',
      items: [
        { name: 'Traditional Thekua', href: '/products?search=thekua' },
        { name: 'Rice Kheer', href: '/products?search=kheer' },
        { name: 'Complete Prasad Box', href: '/products?category=Special Boxes' },
        { name: 'Fresh Fruits', href: '/products?category=Fruits' },
        { name: 'Puja Essentials', href: '/products?category=Puja Items' },
      ],
    },
    {
      name: 'Quick Links',
      items: [
        { name: 'All Products', href: '/products' },
        { name: 'My Account', href: '/account' },
        { name: 'My Orders', href: '/orders' },
        { name: 'Track Order', href: '/track' },
        { name: 'Wishlist', href: '/wishlist' },
      ],
    },
    {
      name: 'Information',
      items: [
        { name: 'About Chhath Puja', href: '/about' },
        { name: 'Delivery Information', href: '/delivery' },
        { name: 'Authenticity Guarantee', href: '/authenticity' },
        { name: 'Bulk Orders', href: '/bulk' },
        { name: 'Festival Calendar', href: '/calendar' },
      ],
    },
    {
      name: 'Support',
      items: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQs', href: '/faq' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns & Refunds', href: '/returns' },
        { name: 'Terms & Conditions', href: '/terms' },
      ],
    },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.017 0C8.396 0 8.013.015 6.624.072 5.237.129 4.303.333 3.492.63c-.836.32-1.546.748-2.25 1.452C.538 2.786.11 3.496-.21 4.332c-.297.811-.501 1.745-.558 3.132C-.225 8.855-.24 9.238-.24 12.858s.015 4.002.072 5.392c.057 1.387.261 2.321.558 3.132.32.836.748 1.546 1.452 2.25.704.704 1.414 1.132 2.25 1.452.811.297 1.745.501 3.132.558 1.39.057 1.773.072 5.392.072s4.002-.015 5.392-.072c1.387-.057 2.321-.261 3.132-.558.836-.32 1.546-.748 2.25-1.452.704-.704 1.132-1.414 1.452-2.25.297-.811.501-1.745.558-3.132.057-1.39.072-1.773.072-5.392s-.015-4.002-.072-5.392c-.057-1.387-.261-2.321-.558-3.132-.32-.836-.748-1.546-1.452-2.25C19.376.538 18.666.11 17.83-.21c-.811-.297-1.745-.501-3.132-.558C13.308-.225 12.925-.24 9.305-.24s-4.002.015-5.392.072zm-.732 1.825c3.624 0 4.054.014 5.486.072 1.324.06 2.043.28 2.521.465.634.247 1.086.542 1.56 1.016.474.474.769.926 1.016 1.56.185.478.405 1.197.465 2.521.058 1.432.072 1.862.072 5.486s-.014 4.054-.072 5.486c-.06 1.324-.28 2.043-.465 2.521-.247.634-.542 1.086-1.016 1.56-.474.474-.926.769-1.56 1.016-.478.185-1.197.405-2.521.465-1.432.058-1.862.072-5.486.072s-4.054-.014-5.486-.072c-1.324-.06-2.043-.28-2.521-.465-.634-.247-1.086-.542-1.56-1.016-.474-.474-.769-.926-1.016-1.56-.185-.478-.405-1.197-.465-2.521C1.897 16.054 1.883 15.624 1.883 12s.014-4.054.072-5.486c.06-1.324.28-2.043.465-2.521.247-.634.542-1.086 1.016-1.56.474-.474.926-.769 1.56-1.016.478-.185 1.197-.405 2.521-.465 1.432-.058 1.862-.072 5.486-.072z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl">🙏</span>
              <div>
                <h3 className="text-2xl font-bold text-white">Chhath Prasadam</h3>
                <p className="text-orange-400">Portal</p>
              </div>
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              Bringing the blessings of Chhath Puja to your home with authentic prasad 
              delivery across India. Made with devotion, delivered with care.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <PhoneIcon className="h-5 w-5 text-orange-400" />
                <span className="text-sm">24/7 Support: +91-CHHATH-PRASAD</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <EnvelopeIcon className="h-5 w-5 text-orange-400" />
                <span className="text-sm">support@chhathprasadam.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPinIcon className="h-5 w-5 text-orange-400" />
                <span className="text-sm">Serving all across India with love</span>
              </div>
            </div>

            {/* Social media */}
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {footerNavigation.categories[0].name}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.categories[0].items.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-orange-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {footerNavigation.categories[1].name}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.categories[1].items.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-orange-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {footerNavigation.categories[2].name}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.categories[2].items.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-orange-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {footerNavigation.categories[3].name}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.categories[3].items.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-orange-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">5000+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">50+</div>
              <div className="text-sm text-gray-300">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-sm text-gray-300">Authentic Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">24/7</div>
              <div className="text-sm text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚚</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Fast Delivery</h4>
                <p className="text-xs text-gray-300">Free delivery above ₹500</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Secure Payment</h4>
                <p className="text-xs text-gray-300">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🙏</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Blessed Items</h4>
                <p className="text-xs text-gray-300">Authentic ritual prasad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <span>Made with</span>
            <HeartIcon className="h-3 w-3 text-red-400" />
            <span>for Chhath Puja devotees across India</span>
          </div>
          <div className="mt-4 text-xs text-gray-400 md:mt-0">
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-orange-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
            <div className="mt-2">
              <p>&copy; 2025 Chhath Prasadam Portal. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
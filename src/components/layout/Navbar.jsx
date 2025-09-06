// src/components/layout/Navbar.jsx - Simplified Navigation
'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { 
  Bars3Icon, 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  UserIcon, 
  XMarkIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartTotals } = useCart();
  const router = useRouter();
  const totals = getCartTotals();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Simple navigation links
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="bg-white">
      {/* Top banner for announcements */}
      <div className="bg-orange-600">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-center text-sm text-white">
            <div className="flex items-center space-x-4">
              <PhoneIcon className="h-4 w-4" />
              <span>24/7 Support: +91-CHHATH-PRASAD</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <MapPinIcon className="h-4 w-4" />
              <span>Free delivery above ₹500 • Pan-India delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span>🙏 Blessed by authentic rituals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile search */}
            <div className="px-4 pb-4">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search prasad items..."
                  className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-orange-600 px-3 py-2 text-white hover:bg-orange-700"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigationLinks.map((link) => (
                <div key={link.name} className="flow-root">
                  <Link 
                    href={link.href} 
                    className="-m-2 block p-2 font-medium text-gray-900 hover:text-orange-600"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile user menu */}
            <div className="border-t border-gray-200 px-4 py-6">
              {user ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Welcome, {user.phoneNumber}</p>
                  <Link href="/account" className="-m-2 block p-2 font-medium text-gray-900">
                    My Account
                  </Link>
                  <Link href="/orders" className="-m-2 block p-2 font-medium text-gray-900">
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="-m-2 block p-2 font-medium text-gray-900 text-left w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                  Login / Register
                </Link>
              )}
            </div>

            {/* Currency/Region selector */}
            <div className="border-t border-gray-200 px-4 py-6">
              <div className="-m-2 flex items-center p-2">
                <span className="text-2xl mr-3">🇮🇳</span>
                <span className="ml-3 block text-base font-medium text-gray-900">INR ₹</span>
                <span className="sr-only">, Indian Rupees</span>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop header */}
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              {/* Logo - Now on the left */}
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400 hover:text-gray-500 lg:hidden mr-4"
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <span className="sr-only">Chhath Prasadam Portal</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🙏</span>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">
                        Chhath Prasadam
                      </h1>
                      <p className="text-xs text-orange-600">Portal</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop navigation links - centered */}
              <div className="hidden lg:flex lg:space-x-8">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex flex-1 items-center justify-end space-x-6 lg:flex-none lg:space-x-6">
                {/* Currency/Region */}
                <div className="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center">
                  <span className="text-lg mr-2">🇮🇳</span>
                  <span className="block text-sm font-medium">INR</span>
                </div>

                {/* Desktop Search */}
                <div className="hidden lg:block">
                  <form onSubmit={handleSearch} className="flex">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search prasad items..."
                      className="w-64 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <button
                      type="submit"
                      className="rounded-r-md bg-orange-600 px-3 py-2 text-white hover:bg-orange-700 transition-colors duration-200"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                  </form>
                </div>

                {/* Mobile search icon */}
                <button
                  onClick={() => router.push('/search')}
                  className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Account */}
                {user ? (
                  <Popover className="relative">
                    <PopoverButton className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Account</span>
                      <UserIcon aria-hidden="true" className="h-6 w-6" />
                    </PopoverButton>
                    <PopoverPanel className="absolute right-0 top-full z-20 mt-2 w-56 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-600">Welcome</p>
                        <p className="text-sm font-medium text-gray-900">{user.phoneNumber}</p>
                      </div>
                      <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Account
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </PopoverPanel>
                  </Popover>
                ) : (
                  <Link href="/login" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Account</span>
                    <UserIcon aria-hidden="true" className="h-6 w-6" />
                  </Link>
                )}

                {/* Cart */}
                <div className="ml-4 flow-root">
                  <Link href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {totals.itemCount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
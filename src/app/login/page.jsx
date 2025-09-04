// src/app/login/page.jsx
'use client';

import React, { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import OTPVerification from '../../components/auth/OTPVerification';

export default function LoginPage() {
  const [step, setStep] = useState('phone');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleOTPSent = (result, phone) => {
    setConfirmationResult(result);
    setPhoneNumber(phone);
    setStep('otp');
  };

  const handleBack = () => {
    setStep('phone');
    setConfirmationResult(null);
    setPhoneNumber('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
          🙏 Chhath Prasadam Portal
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Authentic Chhath Puja Prasad delivered to your doorstep
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'phone' ? (
            <LoginForm onOTPSent={handleOTPSent} />
          ) : (
            <OTPVerification
              confirmationResult={confirmationResult}
              phoneNumber={phoneNumber}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
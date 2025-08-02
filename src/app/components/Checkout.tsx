'use client';
import { useApp } from '@/context/AppContext'; // Still needed for displayToast
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext'; // Import useTheme
import { useUser } from '@/context/UserContext';
import { getThemeClasses } from '@/lib/theme';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

// Define the steps for the checkout process
const CHECKOUT_STEPS = ['Shipping', 'Payment', 'Review'];

// Define interfaces for form data and errors to ensure type safety
interface FormDataState {
  shipping: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  payment: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvc: string;
  };
}

// Define the shape of the errors state, where each field can have a string error message
interface ErrorsState {
  shipping?: {
    fullName?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
  payment?: {
    cardNumber?: string;
    cardName?: string;
    expiryDate?: string;
    cvc?: string;
  };
}

export default function Checkout() {
  const { cartItems, cartSubtotal, shippingCost, tax, totalCost, placeOrder } =
    useCart();
  const { currentUser } = useUser();
  const { displayToast } = useApp(); // displayToast is still part of AppContext
  const { theme } = useTheme(); // Get theme from useTheme
  const themeClasses = getThemeClasses(theme.scheme);
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  // Initialize formData with explicit type and pre-fill fullName if currentUser exists
  const [formData, setFormData] = useState<FormDataState>({
    shipping: {
      fullName: currentUser?.name || '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvc: '',
    },
  });
  // Initialize errors with explicit type
  const [errors, setErrors] = useState<ErrorsState>({});

  // Memoize the order summary for review step
  const orderSummary = useMemo(
    () => ({
      items: cartItems,
      subtotal: cartSubtotal,
      shipping: shippingCost,
      tax: tax,
      total: totalCost,
    }),
    [cartItems, cartSubtotal, shippingCost, tax, totalCost]
  );

  // Handle input changes for form fields with explicit type for 'e' and 'prev'
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: 'shipping' | 'payment'
  ) => {
    setFormData((prev: FormDataState) => ({
      // Explicitly type 'prev'
      ...prev,
      [section]: {
        ...prev[section],
        [e.target.name]: e.target.value,
      },
    }));
    // Clear error for the field being edited with explicit type for 'prev'
    if (errors[section] && (errors[section] as any)[e.target.name]) {
      // Cast to any for dynamic property access
      setErrors((prev: ErrorsState) => ({
        // Explicitly type 'prev'
        ...prev,
        [section]: {
          ...prev[section],
          [e.target.name]: undefined,
        },
      }));
    }
  };

  // Validate current step's form data
  const validateStep = () => {
    // Use 'const' as 'currentErrors' is not reassigned, and explicitly type it
    const currentErrors: ErrorsState = {};
    let isValid = true;

    if (currentStep === 0) {
      // Shipping validation
      const { fullName, address, city, zipCode, country } = formData.shipping;
      if (!fullName) {
        (currentErrors.shipping = currentErrors.shipping || {}).fullName =
          'Full Name is required.';
        isValid = false;
      }
      if (!address) {
        (currentErrors.shipping = currentErrors.shipping || {}).address =
          'Address is required.';
        isValid = false;
      }
      if (!city) {
        (currentErrors.shipping = currentErrors.shipping || {}).city =
          'City is required.';
        isValid = false;
      }
      if (!zipCode) {
        (currentErrors.shipping = currentErrors.shipping || {}).zipCode =
          'Zip Code is required.';
        isValid = false;
      }
      if (!country) {
        (currentErrors.shipping = currentErrors.shipping || {}).country =
          'Country is required.';
        isValid = false;
      }
      setErrors((prev) => ({ ...prev, shipping: currentErrors.shipping })); // Update only the shipping part of errors
    } else if (currentStep === 1) {
      // Payment validation
      const { cardNumber, cardName, expiryDate, cvc } = formData.payment;
      if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
        (currentErrors.payment = currentErrors.payment || {}).cardNumber =
          'Valid 16-digit Card Number is required.';
        isValid = false;
      }
      if (!cardName) {
        (currentErrors.payment = currentErrors.payment || {}).cardName =
          'Name on Card is required.';
        isValid = false;
      }
      if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        (currentErrors.payment = currentErrors.payment || {}).expiryDate =
          'Valid Expiry Date (MM/YY) is required.';
        isValid = false;
      }
      if (!cvc || !/^\d{3,4}$/.test(cvc)) {
        (currentErrors.payment = currentErrors.payment || {}).cvc =
          'Valid CVC (3 or 4 digits) is required.';
        isValid = false;
      }
      setErrors((prev) => ({ ...prev, payment: currentErrors.payment })); // Update only the payment part of errors
    }
    return isValid;
  };

  // Handle navigation between steps
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    } else {
      displayToast('Please correct the errors before proceeding.');
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Handle final order placement
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      displayToast('Your cart is empty. Cannot place an empty order.');
      router.push('/');
      return;
    }
    // Simulate API call for placing order
    const orderDetails = placeOrder(); // This clears the cart
    displayToast(`Order ${orderDetails.orderNumber} placed successfully!`);
    router.push(`/order-confirmation?orderNumber=${orderDetails.orderNumber}`);
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Shipping Information
        return (
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4'>
              Shipping Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='fullName'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={formData.shipping.fullName}
                  onChange={(e) => handleChange(e, 'shipping')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.shipping?.fullName && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.shipping.fullName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='address'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Address
                </label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={formData.shipping.address}
                  onChange={(e) => handleChange(e, 'shipping')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.shipping?.address && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.shipping.address}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  City
                </label>
                <input
                  type='text'
                  id='city'
                  name='city'
                  value={formData.shipping.city}
                  onChange={(e) => handleChange(e, 'shipping')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.shipping?.city && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.shipping.city}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='zipCode'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Zip Code
                </label>
                <input
                  type='text'
                  id='zipCode'
                  name='zipCode'
                  value={formData.shipping.zipCode}
                  onChange={(e) => handleChange(e, 'shipping')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.shipping?.zipCode && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.shipping.zipCode}
                  </p>
                )}
              </div>
              <div className='md:col-span-2'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Country
                </label>
                <input
                  type='text'
                  id='country'
                  name='country'
                  value={formData.shipping.country}
                  onChange={(e) => handleChange(e, 'shipping')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.shipping?.country && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.shipping.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 1: // Payment Information
        return (
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4'>
              Payment Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='md:col-span-2'>
                <label
                  htmlFor='cardNumber'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Card Number
                </label>
                <input
                  type='text'
                  id='cardNumber'
                  name='cardNumber'
                  value={formData.payment.cardNumber}
                  onChange={(e) => handleChange(e, 'payment')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.payment?.cardNumber && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.payment.cardNumber}
                  </p>
                )}
              </div>
              <div className='md:col-span-2'>
                <label
                  htmlFor='cardName'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Name on Card
                </label>
                <input
                  type='text'
                  id='cardName'
                  name='cardName'
                  value={formData.payment.cardName}
                  onChange={(e) => handleChange(e, 'payment')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.payment?.cardName && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.payment.cardName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='expiryDate'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Expiry Date (MM/YY)
                </label>
                <input
                  type='text'
                  id='expiryDate'
                  name='expiryDate'
                  placeholder='MM/YY'
                  value={formData.payment.expiryDate}
                  onChange={(e) => handleChange(e, 'payment')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.payment?.expiryDate && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.payment.expiryDate}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='cvc'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  CVC
                </label>
                <input
                  type='text'
                  id='cvc'
                  name='cvc'
                  value={formData.payment.cvc}
                  onChange={(e) => handleChange(e, 'payment')}
                  className='mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                />
                {errors.payment?.cvc && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.payment.cvc}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 2: // Order Review
        return (
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4'>
              Order Review
            </h3>
            <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
              <h4 className='font-bold text-lg text-gray-800 dark:text-gray-100 mb-2'>
                Items in Cart:
              </h4>
              {orderSummary.items.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 py-1 border-b dark:border-gray-600 last:border-b-0'
                >
                  <div className='flex items-center space-x-2'>
                    <div className='relative w-10 h-10 flex-shrink-0'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className='object-cover rounded'
                      />
                    </div>
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className='mt-4 space-y-1 text-gray-700 dark:text-gray-300'>
                <div className='flex justify-between'>
                  <span>Subtotal:</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping:</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Tax (8%):</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold text-lg text-gray-800 dark:text-gray-100 border-t dark:border-gray-600 pt-2 mt-2'>
                  <span>Total:</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
              <h4 className='font-bold text-lg text-gray-800 dark:text-gray-100 mb-2'>
                Shipping Details:
              </h4>
              <p className='text-gray-700 dark:text-gray-300'>
                {formData.shipping.fullName}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                {formData.shipping.address}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                {formData.shipping.city}, {formData.shipping.zipCode}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                {formData.shipping.country}
              </p>
            </div>
            <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
              <h4 className='font-bold text-lg text-gray-800 dark:text-gray-100 mb-2'>
                Payment Details:
              </h4>
              <p className='text-gray-700 dark:text-gray-300'>
                Card ending in: **** {formData.payment.cardNumber.slice(-4)}
              </p>
              <p className='text-700 dark:text-gray-300'>
                Name on card: {formData.payment.cardName}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (cartItems.length === 0 && currentStep === 0) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
          Your Cart is Empty
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          Looks like you have not added anything to your cart yet.
        </p>
        <button
          onClick={() => router.push('/')}
          className={`font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${themeClasses.primary} ${themeClasses.primaryHover} text-white`}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center'>
        Checkout
      </h1>

      {/* Step Indicator */}
      <div className='flex justify-between items-center mb-8 max-w-2xl mx-auto'>
        {CHECKOUT_STEPS.map((step, index) => (
          <React.Fragment key={step}>
            <div
              className={`flex flex-col items-center ${
                index <= currentStep ? themeClasses.text : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  index <= currentStep
                    ? themeClasses.primary
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <span className='mt-2 text-sm font-medium'>{step}</span>
            </div>
            {index < CHECKOUT_STEPS.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index < currentStep
                    ? themeClasses.primary
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto'>
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className='flex justify-between mt-8'>
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className={`py-2 px-6 rounded-lg font-semibold transition-colors duration-300 border ${themeClasses.text} ${themeClasses.darkText} border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              Previous
            </button>
          )}
          {currentStep < CHECKOUT_STEPS.length - 1 && (
            <button
              onClick={handleNext}
              className={`py-2 px-6 rounded-lg font-semibold text-white transition-colors duration-300 ${
                themeClasses.primary
              } ${themeClasses.primaryHover} ${currentStep === 0 && 'ml-auto'}`}
            >
              Next
            </button>
          )}
          {currentStep === CHECKOUT_STEPS.length - 1 && (
            <button
              onClick={handlePlaceOrder}
              className={`py-2 px-6 rounded-lg font-semibold text-white transition-colors duration-300 bg-green-500 hover:bg-green-600`}
            >
              Confirm Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

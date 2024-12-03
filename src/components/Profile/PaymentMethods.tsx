import React from 'react';
import { CreditCard, Trash2 } from 'lucide-react';
import { useUserStore } from '../../store/userStore';

export function PaymentMethods() {
  const user = useUserStore((state) => state.user);
  const removePaymentMethod = useUserStore((state) => state.removePaymentMethod);
  const setDefaultPaymentMethod = useUserStore(
    (state) => state.setDefaultPaymentMethod
  );

  if (!user) return null;

  return (
    <div className="space-y-3">
      {user.paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`flex items-center justify-between p-3 border rounded-lg ${
            method.default ? 'border-black' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <CreditCard className="w-5 h-5" />
            <div>
              <p className="font-medium">
                {method.type === 'card' ? '•••• ' + method.last4 : 'PayPal'}
              </p>
              {method.expiryDate && (
                <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!method.default && (
              <button
                onClick={() => setDefaultPaymentMethod(method.id)}
                className="text-sm text-gray-600 hover:text-black"
              >
                Make Default
              </button>
            )}
            <button
              onClick={() => removePaymentMethod(method.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
// src/context/UserContext.tsx
'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../../types'; // Assuming User interface is defined in types/index.ts

// Define the shape of the user context
interface UserContextType {
  currentUser: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  // Note: displayToast is removed from here as it's a UI concern,
  // and will be handled by the main AppContext or a dedicated ToastContext.
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component to wrap your application
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // State for the current user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Function to handle user login
  const login = (email: string, name: string) => {
    setCurrentUser({ email, name });
    // displayToast(`Welcome back, ${name}!`); // This would now be handled by a different context or directly where login is called.
  };

  // Function to handle user logout
  const logout = () => {
    setCurrentUser(null);
    // displayToast('You have been logged out.'); // Same as above
  };

  // Value object to be provided by the context
  const value: UserContextType = {
    currentUser,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to consume the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

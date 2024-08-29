// UserContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define the structure of the User Context
interface UserContextType {
  userId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Check if there's a user ID in localStorage
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      // If not, generate a new user ID and store it
      storedUserId = uuidv4() as string;
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

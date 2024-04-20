import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("userData");

    if (userData) {
      // Parse and set the user data to state
      setUser(JSON.parse(userData));
    }
  }, []);

  const updateUser = (updatedUser) => {
    // Update user data in localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUser));

    // Update user state
    setUser(updatedUser);
  };

  return { user, setUser, updateUser };
};

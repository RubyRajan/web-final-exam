import React from 'react';
import { useUser } from './useUser';
import { Button } from 'react-bootstrap';

export default function AuthRequired({ children }) {
  const { user } = useUser();
  return (
    <div>
      {user?._id ? (
        children
      ) : (
        <div className="text-center">
          <h4>Authentication Required</h4>
          <Button onClick={() => (window.location = '/signin')}>Sign In</Button>
        </div>
      )}
    </div>
  );
}

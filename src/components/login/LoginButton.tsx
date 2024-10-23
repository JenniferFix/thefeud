import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { useSupabaseAuth } from '@/supabaseauth';

const Login = ({ onClick }: { onClick: Function }) => {
  const auth = useSupabaseAuth();

  const handleLogoutClick = () => {
    auth.logout();
  };

  if (auth.isAuthenticated) {
    return (
      <div className="flex items-center">
        {/* {user && <div>Welcome {user.email}</div>} */}
        <Button
          variant="link"
          onClick={handleLogoutClick}
          className="text-lg pl-0"
        >
          Logout
        </Button>
      </div>
    );
  } else {
    return (
      <Button
        variant="link"
        className="text-lg pl-0"
        onClick={() => onClick(false)}
        asChild
      >
        <Link href="/login" className="text-lg pl-0">
          Login
        </Link>
      </Button>
    );
  }
};

export default Login;

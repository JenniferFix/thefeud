import React from 'react';
import useSupabase from '@/hooks/useSupabase';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

const Login = ({ onClick }: { onClick: Function }) => {
  const supabase = useSupabase();
  const session = useAuthStore((state) => state.session);
  const user = useAuthStore((state) => state.user);

  const handleLogoutClick = () => {
    supabase.auth.signOut();
  };

  if (session) {
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

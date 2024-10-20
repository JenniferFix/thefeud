import React from 'react';
import useSupabase from '@/hooks/useSupabase';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import DropdownLoginMenu from '@/components/ui/dropdown-login-menu';

const Login = () => {
  const supabase = useSupabase();
  const session = useAuthStore((state) => state.session);
  const user = useAuthStore((state) => state.user);

  const handleLogoutClick = () => {
    supabase.auth.signOut();
  };

  if (session) {
    return (
      <div className="flex items-center">
        {user && <div>Welcome {user.email}</div>}
        <Button onClick={handleLogoutClick}>Logout</Button>
      </div>
    );
  } else {
    return <DropdownLoginMenu />;
  }
};

export default Login;

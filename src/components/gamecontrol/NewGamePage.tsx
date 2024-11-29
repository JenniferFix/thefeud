import React from 'react';
import SelectAndStart from './SelectAndStart';
import { useSupabaseAuth } from '@/supabaseauth';

const NewGamePage = () => {
  const auth = useSupabaseAuth();
  return (
    <div className="max-w-md">
      {auth.isAuthenticated && auth?.user?.id && <SelectAndStart />}
    </div>
  );
};

export default NewGamePage;

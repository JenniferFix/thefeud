import React from 'react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/header/ThemeToggle';
import { Link } from '@tanstack/react-router';
import LoginHeader from '@/components/header/LoginHeader';

const Navbar = () => {
  return (
    <div className="w-full p-1 flex justify-between">
      <div>
        <Button variant="link" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/e">Editor</Link>
        </Button>
      </div>
      <LoginHeader />
      <ThemeToggle />
    </div>
  );
};

export default Navbar;

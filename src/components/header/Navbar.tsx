import React from 'react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/header/ThemeToggle';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { useSupabaseAuth } from '@/supabaseauth';
import { cn } from '@/utils/utils';

const LoginButton = ({
  closeCallback,
  mobile = false,
}: {
  closeCallback?: Function;
  mobile?: boolean;
}) => {
  const auth = useSupabaseAuth();

  const handleLogoutClick = () => {
    auth.logout();
    // supabase.auth.signOut().then(() => {
    //   closeCallback();
    //   navigate({ to: '/' });
    // });
  };

  if (auth.isAuthenticated) {
    return (
      <div
        className={cn(
          'flex items-center hover:bg-accent/50 py-2',
          mobile ? 'border-b pl-2' : 'py-4 px-4 border-x',
        )}
        onClick={() => {
          handleLogoutClick();
          closeCallback && closeCallback();
        }}
      >
        Logout
      </div>
    );
  } else {
    return (
      <Link
        href="/login"
        className="flex items-center hover:underline hover:bg-accent/50 p-4 border-x"
        onClick={() => closeCallback && closeCallback()}
      >
        Login
      </Link>
    );
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <header className="w-full flex justify-between border-b border-b-foreground/10">
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="md:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle hidden>Menu</SheetTitle>
            <SheetDescription hidden>Application Menu</SheetDescription>
            <nav>
              <ul className="flex flex-col justify-start">
                <Link
                  to="/"
                  className="flex justify-start border-b py-2 pl-2 hover:bg-accent/50"
                  activeProps={{ className: 'bg-accent/75' }}
                  onClick={closeSidebar}
                >
                  Home
                </Link>
                <Link
                  to="/e"
                  className="flex justify-start border-b py-2 pl-2 hover:bg-accent/50"
                  activeProps={{ className: 'bg-accent/75' }}
                  onClick={closeSidebar}
                >
                  Editor
                </Link>
                <Link
                  to="/active"
                  className="flex justify-start border-b py-2 pl-2 hover:bg-accent/50"
                  activeProps={{ className: 'bg-accent/75' }}
                  onClick={closeSidebar}
                >
                  Active Games
                </Link>
                <LoginButton closeCallback={closeSidebar} mobile />
              </ul>
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex">
        <Link
          to="/"
          className="flex items-center border-e p-4 hover:bg-accent/50"
          activeProps={{ className: 'bg-accent/75' }}
        >
          Home
        </Link>
        <Link
          to="/e"
          className="flex items-center border-e p-4 hover:bg-accent/50"
          activeProps={{ className: 'bg-accent/75' }}
        >
          Editor
        </Link>
      </div>
      <div className="flex">
        <div className="hidden md:flex align-middle">
          <LoginButton />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;

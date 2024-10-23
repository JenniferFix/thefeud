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
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { MenuIcon } from 'lucide-react';
import { useSupabaseAuth } from '@/supabaseauth';

const LoginButton = ({ closeCallback }: { closeCallback?: Function }) => {
  const auth = useSupabaseAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    auth.logout();
    // supabase.auth.signOut().then(() => {
    //   closeCallback();
    //   navigate({ to: '/' });
    // });
  };

  if (auth.isAuthenticated) {
    return (
      <Button
        variant="link"
        className="text-lg pl-0 justify-start"
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    );
  } else {
    return (
      <Button
        variant="link"
        className="text-lg pl-0 justify-start"
        onClick={() => closeCallback && closeCallback()}
        asChild
      >
        <Link href="/login">Login</Link>
      </Button>
    );
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <header className="w-full p-1 flex justify-between">
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="lg:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle hidden>Menu</SheetTitle>
            <SheetDescription hidden>Application Menu</SheetDescription>
            <nav>
              <ul className="flex flex-col justify-start">
                <Button
                  variant="link"
                  className="text-lg pl-0 justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/">Home</Link>
                </Button>
                <Button
                  variant="link"
                  className="text-lg pl-0 justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/e" className="">
                    Editor
                  </Link>
                </Button>
                <Button
                  variant="link"
                  className="text-lg pl-0 justify-start"
                  onClick={closeSidebar}
                >
                  <Link href="/active" className="">
                    Active Games
                  </Link>
                </Button>
                <LoginButton closeCallback={closeSidebar} />
              </ul>
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Button variant="link" size="lg" asChild>
              <Link href="/">Home</Link>
            </Button>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Button variant="link" size="default" asChild>
              <Link href="/e">Editor</Link>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-4">
        <div className="hidden lg:block">
          <LoginButton />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;

import React from 'react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/header/ThemeToggle';
import { Link } from '@tanstack/react-router';
import LoginHeader from '@/components/header/LoginHeader';
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

const Navbar = () => {
  return (
    <header className="w-full p-1 flex justify-between">
      <Sheet>
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
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/e" className="">
                    Editor
                  </Link>
                </li>
                <li>
                  <Link href="/active" className="">
                    Active Games
                  </Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
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
          <LoginHeader />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;

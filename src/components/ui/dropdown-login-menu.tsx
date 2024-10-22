import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';
import LoginForm from '@/components/login/LoginForm';

export default function DropdownLoginMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Button
        ref={triggerRef}
        variant="outline"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        Login
      </Button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'bg-popover text-popover-foreground absolute right-0 mt-2 w-80 p-4 border rounded-md shadow-md',
          )}
        >
          <LoginForm />
        </div>
      )}
    </div>
  );
}

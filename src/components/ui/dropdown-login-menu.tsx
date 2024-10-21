'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useSupabase from '@/hooks/useSupabase';
import { useAuthStore } from '@/store';
import { cn } from '@/utils/utils';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function DropdownLoginMenu() {
  const supabase = useSupabase();
  const setSession = useAuthStore((state) => state.updateSession);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const createAccountForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLoginSubmit = (data: FormValues) => {
    setIsLoggingIn(true);
    supabase.auth
      .signInWithPassword({ email: data.email, password: data.password })
      .then(({ data, error }) => {
        if (!error) {
          setSession(data.session);
          setIsLoggingIn(false);
          setIsDropdownOpen(false);
        }
      });
  };

  const onCreateAccountSubmit = (data: FormValues) => {
    console.log('Account creation submitted with:', data);
    setIsDialogOpen(false);
  };

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
      {/* {isDropdownOpen && ( */}
      <div
        ref={dropdownRef}
        className={cn(
          'bg-popover text-popover-foreground absolute right-0 mt-2 w-80 p-4 border rounded-md shadow-md',
          isDropdownOpen ? '' : 'hidden',
        )}
      >
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            className="space-y-4"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={isLoggingIn}>
                <Loader2
                  className={cn(
                    isLoggingIn ? '' : 'invisible',
                    'mr-2 h-4 w-4 animate-spin',
                  )}
                />
                Login
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    Create Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Account</DialogTitle>
                  </DialogHeader>
                  <Form {...createAccountForm}>
                    <form
                      onSubmit={createAccountForm.handleSubmit(
                        onCreateAccountSubmit,
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        control={createAccountForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createAccountForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>
      </div>
      {/* )} */}
    </div>
  );
}

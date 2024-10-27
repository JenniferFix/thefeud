import React from 'react';
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
  DialogDescription,
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
import { cn } from '@/utils/utils';
import { toast } from 'sonner';
import { useSupabaseAuth } from '@/supabaseauth';
import { useNavigate } from '@tanstack/react-router';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const auth = useSupabaseAuth();

  React.useEffect(() => {
    if (auth.isLoginError) {
      toast(auth.error?.message);
    }
  }, [auth.isLoginError, auth.error]);

  React.useEffect(() => {
    if (auth.isAuthenticated) navigate({ to: '/' });
  }, [auth.isAuthenticated]);

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
    const { email, password } = data;
    auth.login({ email, password }).then(() => {
      if (redirect) {
        navigate({ to: redirect });
      }
    });
  };

  const onCreateAccountSubmit = (data: FormValues) => {
    // TODO: Implement this
    console.log('Account creation submitted with:', data);
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
        className="space-y-4 z-60 max-w-screen-sm m-auto"
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
          <Button type="submit" className="flex-1" disabled={auth.isLoggingIn}>
            {auth.isLoggingIn ? (
              <Loader2 className={cn('mr-2 h-4 w-4 animate-spin')} />
            ) : (
              'Login'
            )}
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
                <DialogDescription hidden>
                  Form to create a new account
                </DialogDescription>
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
  );
};

export default LoginForm;

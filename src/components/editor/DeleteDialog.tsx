import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DeleteDialog = ({
  children,
  message,
  callback,
}: {
  children: React.ReactNode;
  message: string;
  callback: Function;
}) => {
  return (
    <Dialog>
      <DialogContent className="">
        <div className="">{message}</div>
        <div className="flex">
          <Button variant="default">No</Button>
          <Button variant="ghost">Yes</Button>
        </div>
      </DialogContent>
      <DialogTrigger asChild>{children}</DialogTrigger>
    </Dialog>
  );
};

export default DeleteDialog;

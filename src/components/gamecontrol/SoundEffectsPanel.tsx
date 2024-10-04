import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const SoundFX = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Sound Effects</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Play Sound Effects</DrawerTitle>
        </DrawerHeader>
        <div>
          <Button>Ding</Button>
          <Button>Buzzer</Button>
          <Button>Face-off Music</Button>
          <Button>Face-off Buzzer</Button>
          <Button>Theme Music</Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SoundFX;

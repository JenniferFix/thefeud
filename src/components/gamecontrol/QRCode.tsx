import React from 'react';
import { QrCodeIcon } from 'lucide-react';
import ReactQRCode from 'react-qr-code';
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const QRCode = ({ instanceId }: { instanceId: string }) => {
  const linkValue = `https://feud.jenniferfix.ca/g/${instanceId}`;
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost">
          <QrCodeIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex justify-center">
            QR code link to game
          </DrawerTitle>
          <DrawerDescription hidden>
            QR Code to link to watching the game
            {linkValue}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col justify-center p-2 gap-1">
          <div className="flex justify-center">
            <a href={linkValue}>
              <ReactQRCode value={linkValue} />
            </a>
          </div>
          <Button
            variant="outline"
            onClick={() => navigator.clipboard.writeText(linkValue)}
          >
            Copy to clipboard
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QRCode;

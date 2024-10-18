import React from 'react';
import { ExpandIcon, ShrinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FullscreenButton = ({ ref }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const handleButton = () => {
    //
  };

  return (
    <div className="absolute top-2 right-2">
      <Button onClick={handleButton} variant="ghost" size="icon">
        {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
      </Button>
    </div>
  );
};

export default FullscreenButton;

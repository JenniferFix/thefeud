import React from 'react';

interface Fullscreen {
  isFullscreen: boolean;
  enterFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
}

type FullscreenProps = {
  ref?: React.MutableRefObject<HTMLElement>;
};

const useFullscreen = ({ ref }: FullscreenProps): Fullscreen => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  // const [component, setComponent] = React.useState(null);

  const enterFullscreen = () => {
    if (!ref) return new Promise<void>();
    return ref.current.requestFullscreen();
  };

  const exitFullscreen = () => {
    return document.exitFullscreen();
  };

  return { isFullscreen, enterFullscreen, exitFullscreen };
};

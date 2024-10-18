import React from 'react';

interface Fullscreen {
  isFullscreen: boolean;
}

type FullscreenProps = {
  ref?: React.MutableRefObject<HTMLElement>;
};

const useFullscreen = ({ ref }: FullscreenProps): Fullscreen => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [component, setComponent] = React.useState(null);

  const enterFullscreen = () => {};

  return { isFullscreen };
};

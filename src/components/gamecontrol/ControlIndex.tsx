import React from 'react';
import { useGetActiveInstances } from '@/hooks/useinstancequeries';
import SelectAndStart from './SelectAndStart';
import { Select } from '@radix-ui/react-select';
import ContinueActiveGame from './ContinueActiveGame';

const ControlIndex = () => {
  return (
    <div>
      <SelectAndStart />
      <ContinueActiveGame />
    </div>
  );
};

export default ControlIndex;

import React from 'react';
import { useGetActiveInstances } from '@/hooks/useinstancequeries';
import SelectAndStart from './SelectAndStart';
import { Select } from '@radix-ui/react-select';
import ActiveGames from '@/components/ActiveGames';

const ControlIndex = () => {
  return (
    <div>
      <SelectAndStart />
      <ActiveGames />
    </div>
  );
};

export default ControlIndex;

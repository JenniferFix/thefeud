'use client';
import React from 'react';
import { Tables } from '@/types/supabase.types';
import { IAnswered } from '@/types';
import { Canvas } from '@react-three/fiber';

const AnswerPanel = ({
  flip,
  position,
  answer,
  points,
}: {
  flip: boolean;
  position?: number;
  answer: string;
  points: number;
}) => {
  const mesh = React.useRef();

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[4, 2, 3]} />
      <meshStandardMaterial />
    </mesh>
  );
};

const Gameboard = ({
  answers,
  answered,
}: {
  answers: Tables<'answers'>[];
  answered: IAnswered;
}): React.ReactElement => {
  if (!answers) {
    // answers = [{ id: '1', answer: 'Answer1', score: 0 }];
  }

  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <AnswerPanel flip={false} position={1} answer="The Answer" points={50} />
    </Canvas>
  );
};

export default Gameboard;

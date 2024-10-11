'use client';
import React from 'react';
import { Tables } from '@/types/supabase.types';
import { IAnswered } from '@/types';
import { Canvas } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { type Vector3 } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import * as THREE from 'three';
const AnswerPanel = ({
  size,
  flip,
  position,
  answer,
  points,
}: {
  size: Vector3;
  flip: boolean;
  position?: Vector3;
  answer: string;
  points: number;
}) => {
  const mesh = React.useRef<THREE.Mesh>(null!);

  const [rot, setRot] = React.useState(0);

  const [active, setActive] = React.useState(false);
  const springs = useSpring({
    rotation: [rot, 0, 0],
    config: {
      mass: 1.8,
      friction: 15,
      tension: 290,
    },
  });

  return (
    <animated.mesh
      {...springs}
      ref={mesh}
      onClick={() => setRot(rot + Math.PI / 2)}
      position={position}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial />
    </animated.mesh>
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
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.2} />
      <directionalLight color="red" position={[0, 5, 10]} />
      <AnswerPanel
        size={[3, 1, 1]}
        flip={false}
        position={[-3.5, 2.9, 0]}
        answer="The Answer"
        points={50}
      />
      <AnswerPanel
        size={[3, 1, 1]}
        flip={false}
        position={[-3.5, -2.0, 0]}
        answer="The Answer"
        points={50}
      />
    </Canvas>
  );
};

export default Gameboard;

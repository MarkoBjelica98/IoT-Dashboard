import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

function ArduinoModel() {
  const group = useRef();
  const { scene } = useGLTF('/models/arduino_uno.glb');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = t * 0.2; // slow rotation
    }
  });

  return (
    <group ref={group} scale={0.7} position={[0, 0.3, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function Arduino3D() {
  return (
    <div className='w-full h-137.5'>
      <Canvas camera={{ position: [0, 0.7, 1.5], fov: 50 }}>
        {/* light */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1} />

        {/* model */}
        <ArduinoModel />

        {/* rotation control */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/arduino_uno.glb');

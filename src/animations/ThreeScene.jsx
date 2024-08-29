import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const WhatsAppLogo = () => {
  const { scene, materials } = useGLTF('../../src/assets/animations/1.glb'); // Replace with the path to your 3D model

  useEffect(() => {
    if (materials) {
      // Log material properties for debugging
      Object.keys(materials).forEach(materialName => {
        console.log(`Material: ${materialName}`, materials[materialName]);
      });
      // Define the colors using THREE.Color
      const whatsappGreen = new THREE.Color('#05fa46');
      const white = new THREE.Color('#FFFFFF');

      // Apply the colors to the materials
      if (Object.keys(materials).length > 0) {
        materials[Object.keys(materials)[0]].color.copy(whatsappGreen); // WhatsApp green
      }
      if (Object.keys(materials).length > 1) {
        materials[Object.keys(materials)[1]].color.copy(white); // White
      }
    }
  }, [materials]);

  return (
    <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
  );
};

const ThreeScene = () => {
  return (
    <Canvas className="w-[40%] h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <WhatsAppLogo />
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;

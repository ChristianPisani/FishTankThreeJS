/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 .\\public\\Chest.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import {
    useFrame
} from "@react-three/fiber";
import {
    Color
} from "three";
import {
    lerp
} from "three/src/math/MathUtils.js";

export function Chest(props) {
  const { nodes, materials } = useGLTF('/Chest.glb')
    let open = false;
    
    const lidRef = useRef();
    const chestRef = useRef();
    
    let currentRotation = 0;
  
    const originalGoldColor = materials.Gold.color;
    const originalWoodColor = materials.Planks.color;
    const originalGold1Color = materials["Gold.001"].color;

    useFrame(({clock})  => {
        const elapsedTime = clock.getElapsedTime();
        currentRotation = open ? lerp(currentRotation, 0.7, 0.1) : lerp(currentRotation, 0, 0.1);

        lidRef.current.rotation.set(0,0,currentRotation);
        nodes.Cube003_1.geometry.rotation = [0,0,currentRotation];
        nodes.Cube003.geometry.needsUpdate = true;
        nodes.Cube003_1.geometry.needsUpdate = true;
    })
    
  return (
    <group {...props} dispose={null} onClick={(e) => {
        open = !open;
        e.stopPropagation();
    }} onPointerOver={() => {
        const newScale = 1.1;
        //chestRef.current.scale.set(newScale,newScale,newScale);
        //lidRef.current.scale.set(newScale,newScale,newScale);
        // materials.Gold.color = new Color("white");
        // materials.Planks.color = new Color("white");
        // materials["Gold.001"].color = new Color("white");
    }}
    onPointerOut={() => {
        //chestRef.current.scale.set(1,1);
        //lidRef.current.scale.set(1,1);
        // materials.Gold.color = originalGoldColor;
        // materials.Planks.color = originalWoodColor;
        // materials["Gold.001"].color = originalGold1Color;
    }}>
      <group ref={chestRef}>
        <mesh geometry={nodes.Cube002.geometry} material={materials.Gold} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials.Planks} />
        <mesh geometry={nodes.Cube002_2.geometry} material={materials['Gold.001']} />
      </group>
      <group position={[-1, 1.43, 0]} ref={lidRef} rotation={[0, 0, 0.79]}>
        <mesh geometry={nodes.Cube003.geometry} material={materials.Gold} />
        <mesh geometry={nodes.Cube003_1.geometry} material={materials.Planks} />
      </group>
    </group>
  )
}

useGLTF.preload('/Chest.glb')
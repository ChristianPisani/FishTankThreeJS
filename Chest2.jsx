/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 .\\public\\Chest.glb
*/

import React, {
    useRef
} from 'react'
import {
    useGLTF
} from '@react-three/drei'
import {
    useFrame
} from "@react-three/fiber";

export function Chest(props) {
    const {
        nodes,
        materials
    } = useGLTF('/Chest.glb')

    const lidRef = useRef();
   
    useFrame(({clock})  => {
        const elapsedTime = clock.getElapsedTime();
        let rotation = Math.sin(elapsedTime) / 3 + 0.3;
        
        lidRef.current.rotation.set(0,0,rotation);
        nodes.Cube003_1.geometry.rotation = [0,0,rotation];
        nodes.Cube003.geometry.needsUpdate = true;
        nodes.Cube003_1.geometry.needsUpdate = true;
    })
    
    return (
        <group {...props}
               dispose={null}>
            <group
                scale={[1, 0.73, 1]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={materials.Gold}/>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002_1.geometry}
                    material={materials.Planks}/>
            </group>
            <group
                position={[-1, 1.43, 0]} ref={lidRef}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003.geometry}
                    material={materials.Gold}/>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003_1.geometry}
                    material={materials.Planks}/>
            </group>
        </group>
    )
}

useGLTF.preload('/Chest.glb')
import {
    useRef,
    useState
} from 'react'
import './App.css'
import {
    Canvas
} from "@react-three/fiber";
import {
    OrbitControls,
    Plane
} from "@react-three/drei";
import {
    FishGroup
} from "./FishGroup.jsx";
import {
    Color,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial
} from "three";
import {
    FishTank
} from "../FishTank.jsx";

function App() {
    return (
        <div
            className="App">
            <Canvas
                className={"threeCanvas"}
                shadows
            >
                <ambientLight
                    intensity={0.25}/>
                <directionalLight
                    castShadow
                    position={[50, 30, 30]}
                    color={new Color(1.5, 1.2, 1.2)}
                    shadow-mapSize-height={1024}
                    shadow-mapSize-width={1024}></directionalLight>
                <fog attach="fog" color="darkblue" near={0.1} far={200} />
                
                <FishTank
                    position={[0,-10,0]}
                    scale={[5, 5, 5]}></FishTank>
                <FishGroup></FishGroup>
                {<Plane
                    receiveShadow
                    castShadow
                    position={[0,-10,0]}
                    args={[1000, 1000, 1]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    material={new MeshStandardMaterial()}></Plane>}
                <OrbitControls></OrbitControls>
            </Canvas>
        </div>
    )
}

export default App

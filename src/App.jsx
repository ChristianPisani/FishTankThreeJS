import {
    useRef,
    useState
} from 'react'
import './App.css'
import {
    Canvas
} from "@react-three/fiber";
import {
    Box,
    Environment,
    OrbitControls, PerspectiveCamera,
    Plane, RoundedBox
} from "@react-three/drei";
import {
    FishGroup
} from "./FishGroup.jsx";
import {
    Color,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial, MeshPhysicalMaterial,
    MeshStandardMaterial
} from "three";
import {
    FishTank
} from "../FishTank.jsx";
import {
    FishBowl
} from "../FishBowl.jsx";
import {
    Table
} from "../Table.jsx";

function App() {
    const cameraRef = useRef();
    const shadowCameraBounds = 10;
    
    return (
        <div
            className="App">
            <Canvas
                className={"threeCanvas"}
                shadows
            >
                <directionalLight castShadow 
                                  position={[0, 10, 0]} 
                                  shadow-camera-left={-shadowCameraBounds} 
                                  shadow-camera-right={shadowCameraBounds}
                                  shadow-camera-bottom={shadowCameraBounds} 
                                  shadow-camera-top={-shadowCameraBounds}
                                  shadow-mapSize-height={1024}
                                  shadow-mapSize-width={1024}
                                  shadow-bias={-0.001}
                ></directionalLight>
                {/*<fog attach="fog" color="darkblue" near={2} far={150} />*/}

                <Environment
                    background={true} // can be true, false or "only" (which only sets the background) (default: false)
                    blur={0.25} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
                    preset={"apartment"}
                />

                <FishBowl scale={[6, 6, 6]} position={[0, -18, 0]}></FishBowl>
                <FishGroup scale={[1.2, 1.2, 1.2]}></FishGroup>
                <Table scale={[5,5,5]} position={[0,-18,-7]}></Table>
                {/*<RoundedBox receiveShadow
                        castShadow
                             radius={5}
                        position={[0, -67, 0]}
                        args={[35, 35, 100]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        material={new MeshPhysicalMaterial({color: "orange", roughness: 0.1, metalness: 0.5})}></RoundedBox>*/}
                <PerspectiveCamera position={[100,50,0]}  near={0.01} far={1000} ref={cameraRef} makeDefault></PerspectiveCamera>
                <OrbitControls target={[0, 3, 0]} camera={cameraRef.current} maxPolarAngle={Math.PI / 2} minDistance={5}
                               maxDistance={70} autoRotate={true} enablePan={false}
                               enableRotate={true}></OrbitControls>
            </Canvas>
        </div>
    )
}

export default App

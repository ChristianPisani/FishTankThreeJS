import {
    useRef,
    useState
} from 'react'
import './App.css'
import {
    Canvas
} from "@react-three/fiber";
import {
    Environment,
    OrbitControls, PerspectiveCamera,
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

                <FishTank scale={[3.5, 5, 3.5]} position={[0, -10, 0]}></FishTank>
                <FishGroup scale={[1.2, 1.2, 1.2]}></FishGroup>
                {<Plane receiveShadow
                        castShadow
                        position={[0, -10, 0]}
                        args={[25, 25, 1]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        material={new MeshStandardMaterial({color: "orange"})}></Plane>}
                <PerspectiveCamera position={[100,50,0]}  near={0.01} far={1000} ref={cameraRef} makeDefault></PerspectiveCamera>
                <OrbitControls target={[0, 3, 0]} camera={cameraRef.current} maxPolarAngle={Math.PI / 2} minDistance={5}
                               maxDistance={50} autoRotate={true} enablePan={false}
                               enableRotate={true}></OrbitControls>
            </Canvas>
        </div>
    )
}

export default App

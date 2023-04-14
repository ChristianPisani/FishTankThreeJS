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
    OrbitControls,
    PerspectiveCamera,
    Plane,
    RoundedBox
} from "@react-three/drei";
import {
    FishGroup
} from "./FishGroup.jsx";
import {
    Color,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshPhysicalMaterial,
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
import {
    SeaWeed
} from "../SeaWeed.jsx";

function App() {
    const cameraRef = useRef();
    const shadowCameraBounds = 40;

    const [separation, setSeparation] = useState(20);
    const [cohesion, setCohesion] = useState(2);
    const [alignment, setAlignment] = useState(4);
    const [maxDistance, setMaxDistance] = useState(1);
    const [amountOfFish, setAmountOfFish] = useState(400);
    const [reset, setReset] = useState(false);
    const [controlsOpen, setControlsOpen] = useState(true);

    return (
        <div
            className="App">
            <div
                className={`controls ${controlsOpen ? "" : "closed"}`}>
                <button onClick={() => setControlsOpen(!controlsOpen)} className={"toggleButton"} type={"button"}></button>
                <label
                    htmlFor={"input-cohesion"}>Cohesion
                                               ({cohesion}): </label>
                <input
                    type="range"
                    value={cohesion}
                    min={0}
                    max={20}
                    onChange={(e) => setCohesion(Number(e.target.value))}
                    id={"input-cohesion"}/>
                <label
                    htmlFor={"input-alignment"}>Alignment
                                                ({alignment}): </label>
                <input
                    type="range"
                    min={0}
                    max={20}
                    value={alignment}
                    onChange={(e) => setAlignment(Number(e.target.value))}
                    id={"input-alignment"}/>
                <label
                    htmlFor={"input-separation"}>Separation
                                                 ({separation}): </label>
                <input
                    type="range"
                    min={0}
                    max={20}
                    value={separation}
                    onChange={(e) => setSeparation(Number(e.target.value))}
                    id={"input-separation"}/>
                <label
                    htmlFor={"input-distance"}>Max
                                               distance
                                               ({maxDistance}): </label>
                <input
                    type="range"
                    min={0.5}
                    max={5}
                    value={maxDistance}
                    step={0.5}
                    onChange={(e) => setMaxDistance(Number(e.target.value))}
                    id={"input-distance"}/>
                <label
                    htmlFor={"input-distance"}>Amount
                                               of
                                               fish:
                                               ({amountOfFish}): </label>
                <input
                    type="range"
                    min={0}
                    max={1000}
                    step={10}
                    value={amountOfFish}
                    onChange={(e) => setAmountOfFish(Number(e.target.value))}
                    id={"input-distance"}/>
                <button
                    type={"button"}
                    onClick={() => setReset(!reset)}>Reset
                </button>
            </div>
            
            <Canvas
                className={"threeCanvas"}
                shadows={"soft"}
            >
                <directionalLight
                    castShadow
                    position={[10, 10, 14]}
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
                    preset={"sunset"}
                />

                <FishBowl
                    scale={[6, 6, 6]}
                    position={[0, -18, 0]}></FishBowl>
                <SeaWeed scale={[3,4.3,3]} position={[6,-16.7,0]} rotation={[0,3,0]}></SeaWeed>
                <SeaWeed scale={[4,4,4]} position={[10,-18.5,6]}></SeaWeed>
                <SeaWeed scale={[4,4.5,4]} position={[-15,-19.5,-10]}></SeaWeed>
                <SeaWeed scale={[4,4.5,4]} position={[-12,-19.5,-11]}></SeaWeed>
                <SeaWeed scale={[4,4.5,4]} position={[-15,-17,-0]} rotation={[-0.1,1.3,0]}></SeaWeed>
                <SeaWeed scale={[4,4.5,4]} position={[-0,-19.5,-10]} rotation={[0.1,1.4,0]}></SeaWeed>
                <SeaWeed scale={[4,4.5,4]} position={[-14,-19.5,-9]} rotation={[0,2,0]}></SeaWeed>
                <SeaWeed scale={[4,4.5,4]} position={[-5,-19.5,-10]}></SeaWeed>
                <FishGroup
                    reset={reset}
                    amount={amountOfFish}
                    cohesion={cohesion}
                    separation={separation}
                    alignment={alignment}
                    maxDistance={maxDistance}
                    scale={[1.2, 1.2, 1.2]}></FishGroup>
                <Table
                    scale={[8, 8, 8]}
                    position={[0, -19, -7]}></Table>
                {/*<RoundedBox receiveShadow
                        castShadow
                             radius={5}
                        position={[0, -67, 0]}
                        args={[35, 35, 100]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        material={new MeshPhysicalMaterial({color: "orange", roughness: 0.1, metalness: 0.5})}></RoundedBox>*/}
                <PerspectiveCamera
                    position={[100, 50, 0]}
                    near={0.01}
                    far={1000}
                    ref={cameraRef}
                    makeDefault></PerspectiveCamera>
                <OrbitControls
                    target={[0, 3, 0]}
                    camera={cameraRef.current}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={5}
                    maxDistance={100}
                    autoRotate={true}
                    enablePan={false}
                    enableRotate={true}></OrbitControls>
            </Canvas>
        </div>
    )
}

export default App

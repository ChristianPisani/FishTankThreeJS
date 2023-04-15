import {
    useEffect,
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
    FishBowl
} from "../FishBowl.jsx";
import {
    Table
} from "../Table.jsx";
import {
    SeaWeed
} from "../SeaWeed.jsx";
import {
    Chest
} from "../Chest.jsx";
import {
    EffectComposer,
    GodRays
} from "@react-three/postprocessing";
import {
    BlendFunction,
    KernelSize,
    Resolution as Resizer
} from "postprocessing";
import {
    BoxGeometry,
    CylinderGeometry,
    Mesh,
    MeshBasicMaterial,
    SphereGeometry
} from "three";
import {
    OSphereGeometry
} from "three/addons/libs/OimoPhysics/index.js";
import {
    Boat
} from "../Boat.jsx";


function App() {
    const cameraRef = useRef();

    const goldLightMesh = new Mesh(
        new CylinderGeometry(0.6, 0.6, 3, 20),
        new MeshBasicMaterial({
            color: "#CC8C39",
            transparent: true,
            opacity: 0.5,
        })
    );

    const sunMesh = new Mesh(
        new SphereGeometry(0.5, 0.5, 3, 20),
        new MeshBasicMaterial({
            color: "#CC8C39",
            transparent: true,
            opacity: 1,
        })
    );

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
                <button
                    onClick={() => setControlsOpen(!controlsOpen)}
                    className={"toggleButton"}
                    type={"button"}></button>
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

                <primitive
                    object={goldLightMesh}
                    position={[0, -10, 0]}
                    rotation={[Math.PI / 2, 0, 0]}/>
                <primitive
                    object={sunMesh}
                    position={[85, 5, 50]}
                    rotation={[Math.PI / 2, 0, 0]}/>

                <FishBowl
                    scale={[6, 6, 6]}
                    position={[0, -18, 0]}></FishBowl>
                <SeaWeed
                    scale={[3, 4.3, 3]}
                    position={[6, -16.7, 0]}
                    rotation={[0, 3, 0]}></SeaWeed>
                <SeaWeed
                    scale={[4, 4, 4]}
                    position={[10, -18.5, 6]}></SeaWeed>
                <SeaWeed
                    scale={[4, 4.5, 4]}
                    position={[-15, -19.5, -10]}></SeaWeed>
                <SeaWeed
                    scale={[4, 4.5, 4]}
                    position={[-12, -19.5, -11]}></SeaWeed>
                <SeaWeed
                    scale={[4, 4.5, 4]}
                    position={[-15, -17, -0]}
                    rotation={[-0.1, 1.3, 0]}></SeaWeed>
                <SeaWeed
                    scale={[4, 4.5, 4]}
                    position={[-0, -19.5, -10]}
                    rotation={[0.1, 1.4, 0]}></SeaWeed>
                <SeaWeed
                    scale={[4, 4.5, 4]}
                    position={[-14, -19.5, -9]}
                    rotation={[0, 2, 0]}></SeaWeed>
                <SeaWeed
                    scale={[4, 4.5, 4]}
                    position={[-5, -19.5, -10]}></SeaWeed>

                <Chest
                    position={[0, -11.8, 0]}></Chest>
                <Boat position={[-2,20.55,2]} rotation={[0,0.5,0]} scale={[0.5,0.5,0.5]}></Boat>

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
                    minPolarAngle={Math.PI / 4}
                    minDistance={5}
                    maxDistance={100}
                    autoRotate={true}
                    enablePan={false}
                    enableRotate={true}></OrbitControls>

                <EffectComposer>
                    <GodRays
                        sun={goldLightMesh}
                        blendFunction={BlendFunction.SCREEN}
                        samples={40}
                        density={0.98}
                        decay={0.98}
                        weight={0.6}
                        exposure={0.3}
                        clampMax={1}
                        width={Resizer.AUTO_SIZE}
                        height={Resizer.AUTO_SIZE}
                        kernelSize={KernelSize.SMALL}
                        blur={0.25}
                    />
                    <GodRays
                        sun={sunMesh}
                        blendFunction={BlendFunction.SCREEN}
                        samples={40}
                        density={0.99}
                        decay={0.99}
                        weight={0.75}
                        exposure={0.3}
                        clampMax={1}
                        width={Resizer.AUTO_SIZE}
                        height={Resizer.AUTO_SIZE}
                        kernelSize={KernelSize.SMALL}
                        blur={0.25}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}

export default App

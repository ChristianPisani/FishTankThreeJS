import {
    Suspense,
    useState
} from 'react'
import './App.css'
import {
    Controls
} from "./Controls.jsx";
import {
    FishTankScene
} from "./FishTankScene.jsx";


function App() {
    const [separation, setSeparation] = useState(18);
    const [cohesion, setCohesion] = useState(5);
    const [alignment, setAlignment] = useState(6);
    const [maxDistance, setMaxDistance] = useState(2);
    const [amountOfFish, setAmountOfFish] = useState(400);
    const [reset, setReset] = useState(false);
    const [hasPostProcessing, setHasPostProcessing] = useState(true);
    const [environment, setEnvironment] = useState("night");
    
    return (
        <div
            className="App">
            <Suspense fallback={<div><div className={"spinner"}></div><p>Loading...</p></div>}>
                <Controls
                    cohesion={cohesion}
                    setCohesion={setCohesion}
                    alignment={alignment}
                    setAlignment={setAlignment}
                    amountOfFish={amountOfFish}
                    setAmountOfFish={setAmountOfFish}
                    hasPostProcessing={hasPostProcessing}
                    setHasPostProcessing={setHasPostProcessing}
                    separation={separation}
                    setSeparation={setSeparation}
                    maxDistance={maxDistance}
                    setMaxDistance={setMaxDistance}
                    reset={reset}
                    setReset={setReset}
                    environment={environment}
                    setEnvironment={setEnvironment}
                ></Controls>
                <FishTankScene
                    separation={separation}
                    alignment={alignment}
                    cohesion={cohesion}
                    hasPostProcessing={hasPostProcessing}
                    reset={reset}
                    maxDistance={maxDistance}
                    amountOfFish={amountOfFish}
                    environment={environment}></FishTankScene>
            </Suspense>
        </div>
    )
}

export default App

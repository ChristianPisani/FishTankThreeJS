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
    const [separation, setSeparation] = useState(20);
    const [cohesion, setCohesion] = useState(2);
    const [alignment, setAlignment] = useState(4);
    const [maxDistance, setMaxDistance] = useState(1);
    const [amountOfFish, setAmountOfFish] = useState(400);
    const [reset, setReset] = useState(false);
    const [hasPostProcessing, setHasPostProcessing] = useState(true);

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
                ></Controls>
                <FishTankScene
                    separation={separation}
                    alignment={alignment}
                    cohesion={cohesion}
                    hasPostProcessing={hasPostProcessing}
                    reset={reset}
                    maxDistance={maxDistance}
                    amountOfFish={amountOfFish}></FishTankScene>
            </Suspense>
        </div>
    )
}

export default App

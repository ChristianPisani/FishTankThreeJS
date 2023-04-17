import {
    useState
} from "react";

export const Controls = ({
                             cohesion,
                             setCohesion,
                             alignment,
                             setAlignment,
                             separation,
                             setSeparation,
                             reset,
                             setReset,
                             maxDistance,
                             setMaxDistance,
                             amountOfFish,
                             setAmountOfFish,
                             hasPostProcessing,
                             setHasPostProcessing,
                             environment,
                             setEnvironment
                         }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`controls ${open ? "" : "closed"}`}>
            <button
                onClick={() => setOpen(!open)}
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
            <div>
                <label
                    htmlFor={"environment-select"}>Environment: </label>
                <select
                    id={"environment-select"}
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}>
                    <option
                        value={"sunset"}>Sunset
                    </option>
                    <option
                        value={"studio"}>Studio
                    </option>
                    <option
                        value={"forest"}>Forest
                    </option>
                    <option value={"dawn"}>Dawn</option>
                    <option value={"apartment"}>Apartment</option>
                    <option value={"night"}>Night</option>
                    <option value={"city"}>City</option>
                    <option value={"park"}>Park</option>
                    <option value={"lobby"}>Lobby</option>
                </select>
            </div>
            <div>
                <input
                    id={"post-processing-input"}
                    type={"checkbox"}
                    onChange={() => setHasPostProcessing(!hasPostProcessing)}
                    checked={hasPostProcessing}></input>
                <label
                    htmlFor={"post-processing-input"}>Has
                                                      postprocessing</label>
            </div>
            <button
                type={"button"}
                onClick={() => setReset(!reset)}>Reset
            </button>
        </div>
    )
}
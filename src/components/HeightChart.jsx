import { useParams } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import SpikesSVG from "./ui/SpikesSVG";
import Height from './ui/Height';
import { mediaMatches } from '../utils/index';

function HeightChart() {
    const { name } = useParams();
    const { data, loading } = usePokemon(name);

    const state = [
        {
            size: mediaMatches() ? 100: 60,
            strokeWidth: mediaMatches() ? 3: 4,
            fontSize: mediaMatches() ? 20: 16
        },
        {
            size: mediaMatches() ? 100: 120,
            strokeWidth: 3,
            fontSize: 20
        },
        {
            size: mediaMatches() ? 100: 180,
            strokeWidth: mediaMatches() ? 3: 2,
            fontSize: mediaMatches() ? 20: 30
        }
    ]

    return (
        <section className="bg-yellow-5000">
            <SpikesSVG className="fill-yellow-4000 scale-[-1]"/>
            <div className="p-8 lg:px-0 max-w-5xl mx-auto">
                <h4 className="pb-4 font-semibold text-center text-primary">Comparando evoluções</h4>
                <div className="grid grid-cols-1 md:grid-flow-col md:grid-cols-none md:auto-cols-min gap-8 place-content-center">
                    {!loading && data.evolutions().map((pokemon, index) => (
                        <div key={index} className="grid grid-flow-col auto-cols-max gap-4 justify-center">
                            <div className="grid grid-flow-col auto-cols-fr items-center">
                                <span className="font-cairo font-bold text-primary">{pokemon.height()}</span>
                                <Height className="stroke-primary" height={state[index].size} strokeWidth={state[index].strokeWidth}/>
                            </div>
                            <div className="grid place-items-center">
                                <span className={`absolute font-extrabold font-cairo text-${state[index].fontSize} text-primary`}>{pokemon.weight()}</span>
                                <img 
                                    className={`brightness-0 ${ pokemon.name() === name ? "opacity-30": "opacity-15" }`}
                                    src={pokemon.sprite()}
                                    alt={`pokemon ${pokemon.name()}`}
                                    height="auto"
                                    width={state[index].size}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HeightChart;
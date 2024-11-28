import { useParams } from "react-router-dom";

import { usePokemon } from "../hooks/usePokemon";
import Section from '../components/ui/Section';
import PokeballSVG from '../components/ui/PokeballSVG';
import Pill from "../components/ui/Pill";
import SpikesSVG from "../components/ui/SpikesSVG";
import Bar from "../components/ui/Bar";
import RechartsRadar from "../components/ui/RechartsRadar";
import PillType from "../components/ui/PillType";
import HeightChart from "../components/HeightChart";
import Carousel from "../components/ui/Carousel";
import { useEffect } from "react";

function Details() {
    const { name } = useParams();
    const {data, loading} = usePokemon(name);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Section>
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="grid grid-flow-row auto-rows-min content-center gap-2">
                            <h4 className="grid grid-flow-col auto-cols-min items-center justify-center md:justify-start gap-2 font-roboto text-red-primary text-nowrap">
                                Nº {data.pokedexNumber()} <PokeballSVG className="fill-red-primary" size={24}/>
                            </h4>
                            <h1 className="capitalize font-cairo font-bold text-center md:text-left  leading-none">
                                {data.name()}
                            </h1>
                            <p className="text-center md:text-left">
                                {data.text()}
                            </p>
                            <div className="grid grid-flow-col auto-cols-min items-center justify-center md:justify-start gap-4">
                                {data.types().map((type, index) => <Pill key={index} type={type} />)}
                            </div>
                        </div>
                        <div className="justify-self-center md:justify-self-end">
                            <img src={data.sprite()} alt={`pokemon ${data.name()}`} width={300} />
                        </div>
                    </div>
                )}
            </Section>
            <section className="bg-yellow-2000">
                <SpikesSVG className="fill-yellow-6000 translate-y-[-4px] scale-[-1]"/>
                <div className="p-8 lg:px-0 max-w-5xl mx-auto">
                    <h4 className="font-semibold text-center">Estátisticas do pokemon</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="bars">
                            {!loading && data.stats().map(({ name, base, min, max  }, index) => (
                                <Bar key={index} base={base} name={name} min={min} max={max} />
                            ))}
                        </div>
                        <div className="radial">
                            {!loading && (
                                <RechartsRadar data={data.stats()}/>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-yellow-4000">
                <SpikesSVG className="fill-yellow-2000 scale-[-1]"/>
                <div className="p-8 lg:px-0 max-w-5xl mx-auto">
                    <h4 className="font-semibold text-center">Fragilidades a casa tipo</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center gap-8">
                        {!loading && data.allTypes().map(({name, value}, index) => (
                            <PillType key={index} name={name} value={value}/>
                        ))}
                    </div>
                </div>
            </section>
            <HeightChart />
            <section className="bg-image-with-gradient">
                <SpikesSVG className="fill-yellow-5000 translate-y-[-4px] scale-[-1]"/>
                <div className="p-8 lg:p-0 max-w-5xl mx-auto">
                    <Carousel />
                </div>
            </section>
        </>
    );
}

export default Details; 
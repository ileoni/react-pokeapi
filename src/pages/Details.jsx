import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { usePokemon } from "../hooks/usePokemon";
import Row from "../components/Row";
import { H4 } from "../components/H4";
import { H1 } from "../components/H1";
import Pokeball from "../components/Pokeball";
import { Pill } from "../components/Pill";
import Status from "../components/Status";
import TypesOfWeakness from "../components/TypesOfWeakness";
import Evolutions from "../components/Evolutions";
import Carousel from "../components/Carousel";
import CarouselOfEvolutions from "../components/CarouselOfEvolutions";

function Details() {
    const { name } = useParams();
    
    const [pokemon, setPokemon] = useState();

    const { state, getPokemon } = usePokemon(name);

    useEffect(() => {
        const pokemon = getPokemon();
        setPokemon(pokemon);
    }, [state])

    return (
        <>
        <Row>
            <Row.MaxW5xl className="grid sm:grid-cols-2 items-center">
                <div className="grid gap-4">
                    <H4 className="grid grid-flow-col justify-center sm:justify-start items-center gap-4 text-primary-300">
                        Nº {pokemon?.number} <Pokeball className="w-6 h-6 fill-primary-300"/>
                    </H4>
                    <H1 className="capitalize font-bold leading-none text-center sm:text-left">{pokemon?.name}</H1>
                    <p className="text-center sm:text-left">{pokemon?.text}</p>
                    <div className="grid grid-flow-col justify-center sm:justify-start gap-4">
                        {pokemon?.types && pokemon?.types.map((type, index) => <Pill key={index} type={type.name}/>)}
                    </div>
                </div>
                <img src={pokemon?.sprite} alt={pokemon?.name} className="justify-self-center sm:justify-self-end row-start-2 sm:row-start-auto w-56 sm:w-96"/>
            </Row.MaxW5xl>
        </Row>
        <Row className="bg-base-500">
            <Row.SpikesTop className="fill-base-600"/>
            <Row.MaxW5xl className="grid gap-4">
                <H4 className="text-center sm:text-left">Estátisticas do pokémon</H4>
                <Status stats={pokemon?.stats}/>
            </Row.MaxW5xl>
        </Row>
        <Row className="bg-base-400">
            <Row.SpikesTop className="fill-base-500"/>
            <Row.MaxW5xl className="grid gap-4">
                <H4 className="text-center sm:text-left">Fragilidade à cada tipo</H4>
                <TypesOfWeakness damageRelations={pokemon?.damageRelations}/>
            </Row.MaxW5xl>
        </Row>
        <Row className="bg-base-300">
            <Row.SpikesTop className="fill-base-400"/>
            <Row.MaxW5xl>
                <H4 className="text-center sm:text-left">Comparando evoluções</H4>
                <Evolutions evolution={pokemon?.evolution} self={pokemon} />
            </Row.MaxW5xl>
        </Row>
        <Row.Background>
            <Row.SpikesTop className="fill-base-300"/>
            <Row.MaxW5xl>
                <CarouselOfEvolutions evolution={pokemon?.evolutionsOrderedByPriorities} self={pokemon}/>
            </Row.MaxW5xl>
        </Row.Background>
        </>
    )
}

export default Details;

// import { useParams } from "react-router-dom";

// import { usePokemon } from "../hooks/usePokemon";
// import Section from '../components/ui/Section';
// import PokeballSVG from '../components/ui/PokeballSVG';
// import Pill from "../components/ui/Pill";
// import SpikesSVG from "../components/ui/SpikesSVG";
// import Bar from "../components/ui/Bar";
// import RechartsRadar from "../components/ui/RechartsRadar";
// import PillType from "../components/ui/PillType";
// import HeightChart from "../components/HeightChart";
// import Carousel from "../components/ui/Carousel";
// import { useEffect } from "react";

// function Details() {
//     const { name } = useParams();
//     const {data, loading} = usePokemon(name);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [])

//     return (
//         <>
//             <Section>
//                 {!loading && (
//                     <div className="grid grid-cols-1 md:grid-cols-2">
//                         <div className="grid grid-flow-row auto-rows-min content-center gap-2">
//                             <h4 className="grid grid-flow-col auto-cols-min items-center justify-center md:justify-start gap-2 font-roboto text-red-primary text-nowrap">
//                                 Nº {data.pokedexNumber()} <PokeballSVG className="fill-red-primary" size={24}/>
//                             </h4>
//                             <h1 className="capitalize font-cairo font-bold text-center md:text-left  leading-none">
//                                 {data.name()}
//                             </h1>
//                             <p className="text-center md:text-left">
//                                 {data.text()}
//                             </p>
//                             <div className="grid grid-flow-col auto-cols-min items-center justify-center md:justify-start gap-4">
//                                 {data.types().map((type, index) => <Pill key={index} type={type} />)}
//                             </div>
//                         </div>
//                         <div className="justify-self-center md:justify-self-end">
//                             <img src={data.sprite()} alt={`pokemon ${data.name()}`} width={300} />
//                         </div>
//                     </div>
//                 )}
//             </Section>
//             <section className="bg-yellow-2000">
//                 <SpikesSVG className="fill-yellow-6000 translate-y-[-4px] scale-[-1]"/>
//                 <div className="p-8 lg:px-0 max-w-5xl mx-auto">
//                     <h4 className="font-semibold text-center">Estátisticas do pokemon</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2">
//                         <div className="bars">
//                             {!loading && data.stats().map(({ name, base, min, max  }, index) => (
//                                 <Bar key={index} base={base} name={name} min={min} max={max} />
//                             ))}
//                         </div>
//                         <div className="radial">
//                             {!loading && (
//                                 <RechartsRadar data={data.stats()}/>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="bg-yellow-4000">
//                 <SpikesSVG className="fill-yellow-2000 scale-[-1]"/>
//                 <div className="p-8 lg:px-0 max-w-5xl mx-auto">
//                     <h4 className="font-semibold text-center">Fragilidades a casa tipo</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center gap-8">
//                         {!loading && data.allTypes().map(({name, value}, index) => (
//                             <PillType key={index} name={name} value={value}/>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//             <HeightChart />
//             <section className="bg-image-with-gradient">
//                 <SpikesSVG className="fill-yellow-5000 translate-y-[-4px] scale-[-1]"/>
//                 <div className="p-8 lg:p-0 max-w-5xl mx-auto">
//                     <Carousel />
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Details; 
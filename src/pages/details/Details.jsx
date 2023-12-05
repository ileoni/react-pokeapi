import { useEffect, useState } from 'react';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer  } from 'recharts';
import './Details.css';

import { detailsPage } from '../../services/PokeapiService';
import Section from '../../main/template/Section';
import HeightCharts from '../../components/HeightCharts';
import CarouselComponent from '../../components/Carousel';

function Details(prop)
{   
    const {pathname} = location;
    const [pokemon, setPokemon] = useState(null);
    const [damages, setDamages] = useState(null);

    useEffect(() => {
        detailsPage(pathname)
            .then(data => {
                const [first] = data.damages;
                setDamages(first.double);
                return data;
            })
            .then(setPokemon)
    }, []);
    
    return (
        <>
        <Section>
            <div className="s-text">
                <h4 className='flex items-center gap-2 color-red'>
                    Nº {pokemon?.id} <i className="pokeball h-[25px] w-[25px]"></i>
                </h4>
                <h1 className='capitalize'>{pokemon?.name}</h1>
                <p>{pokemon?.text}</p>           
            </div>
            <div className="s-image">
                <div className="circle"></div>
                <img 
                    src={pokemon?.sprite} 
                    alt={`Imagem do pokemon ${pokemon?.name}`}
                    width={350}
                />
            </div>
        </Section>
        <div className='bg-yellow-fifth'>
            <Section>
                <div className="s-text">
                    <div className="details__types">
                        <h4 className='cairo'>Tipo</h4>
                        {
                            pokemon?.types.map((type, index) => (
                                <span key={index} className={`${type} d-type inline-block capitalize mt-5 mr-2`}>
                                    {type}
                                </span>
                            ))
                        }
                    </div>
                    <div className="details__damages mt-8">
                        <h4 className='cairo'>Fraqueza</h4>
                        {
                            damages?.map((types, index) => (
                                <span key={index} className={`${types} d-type inline-block capitalize mt-5 mr-2`}>
                                    {types}
                                </span>
                            ))
                        }
                    </div>
                </div>
                <div className="s-image grid">
                    <h4 className='cairo'>Altura</h4>
                    <div className='self-center'>
                        {
                            pokemon?.evolutions && (
                                <HeightCharts pokemonName={pokemon.name} evolutions={pokemon?.evolutions}/>
                            )
                        }
                    </div>
                </div>
            </Section>
        </div>
        <div className='bg-yellow-fourth'>
            <Section>
                <div className="s-text">
                    <h4>
                        Estátisticas base
                    </h4>
                    <ul className='mt-5'>
                        {
                            pokemon?.stats.map(({subject, value}, index) => (
                                <li key={index} className='flex justify-between mb-2 border-b-[1px] border-[var(--red-third)]'>
                                    <span className='capitalize'>{subject}</span>
                                    <span className='color-red'>{value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="s-image grid place-items-center w-full">
                    <RadarChart outerRadius={90} width={320} height={320} data={pokemon?.stats}>
                        <PolarAngleAxis dataKey="subject" style={{fill: 'white'}} tick={{style: {fill: "var(--red-third)"}}} />
                        <PolarGrid polarRadius={[0]} stroke="var(--bg-yellow-fourth)" strokeWidth={4}/>
                        <Radar dot dataKey="value" stroke="var(--red-third)" fill="var(--red-third)" fillOpacity={0.4} />
                    </RadarChart>
                </div>
            </Section>
        </div>
        <Section columns={false}>
            {
                pokemon?.evolutions && (
                    <CarouselComponent activated={pokemon?.name} evolutions={pokemon?.evolutions} />
                )
            }
        </Section>
        </>
    );
}

export default Details;
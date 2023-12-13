import "./Pokedex.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Section, { Grid, Spikes } from "../../main/template/Section";
import Card from "../../components/Card";
import SkeletonPokedex from "./SkeletonPokedex";

function Pokedex({pokemons, loading})
{
    const [list, setList] = useState([]);
    
    useEffect(() => {
        if(!![...pokemons].length) setList(pokemons);
    }, [pokemons])

    return (
        <Section>
            <Spikes className="bg-yellow-fifth spikes--bottom">
                <Grid>
                    {
                        loading && (
                            <SkeletonPokedex/>
                        ) || (
                            <div id="pokedex" className="pokedex">{
                                list.map((pokemon, index) => (
                                    <Link key={index} to={`pokemon/${pokemon.name}`}>
                                        <Card pokemon={pokemon}/>
                                    </Link>  
                                ))
                            }</div>
                        )
                    }
                </Grid>
            </Spikes>
        </Section>
    );
}

export default Pokedex;

{/* <div id="pokedex" className="pokedex">
{
    list.map((pokemon, index) => (
        <Link key={index} to={`pokemon/${pokemon.name}`}>
            <Card pokemon={pokemon}/>
        </Link>  
    ))
}
</div> */}
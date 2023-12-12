import "./Pokedex.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Section, { Grid, Spikes } from "../../main/template/Section";
import Card from "../../components/Card";

function Pokedex({pokemons})
{
    const [list, setList] = useState([]);
    
    useEffect(() => {
        if(!![...pokemons].length) setList(pokemons);
    }, [pokemons])

    return (
        <Section>
            <Spikes className="bg-yellow-fifth spikes--bottom">
                <Grid>
                    <div id="pokedex" className="pokedex">
                    {
                        list.map((pokemon, index) => (
                            <Link key={index} to={`pokemon/${pokemon.name}`}>
                                <Card pokemon={pokemon}/>
                            </Link>  
                        ))
                    }
                    </div>
                </Grid>
            </Spikes>
        </Section>
    );
}

export default Pokedex;
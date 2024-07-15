import "./Pokedex.css";
import { Link } from "react-router-dom";

import Section, { Grid, Spikes } from "../../main/template/Section";
import Card from "../../components/Card";

function Pokedex({ pokemons })
{
    return (
        <Section>
            <Spikes className="bg-yellow-fifth spikes--bottom">
                <Grid>
                    <div id="pokedex" className="pokedex">
                    {
                        pokemons.map((pokemon, index) => (
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
import { Link } from "react-router-dom";
import "./Pokedex.css";

import Section from "../../main/template/Section";
import Card from "../../components/Card";

function Pokedex({list})
{
    return (
        <Section section="bg-yellow-fifth" mask="spikes" cols={false}>
            <div id="pokedex" className="section__grid">
                {
                    list?.map((pokemon, index) => (
                        <Link 
                            key={index}
                            to={`pokemon/${pokemon.name}`} 
                        >
                            <Card pokemon={pokemon}/>
                        </Link>               
                    ))
                }
            </div>
        </Section>
    );
}

export default Pokedex;
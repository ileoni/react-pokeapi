import { Link } from "react-router-dom";
import "./Pokedex.css";

import Section from "../../main/template/Section";
import Card from "../../components/Card";

function Pokedex({list})
{
    return (
        <div className="spikes">
            <Section background="bg-yellow-fifth" columns={false}>
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
        </div>
    );
}

export default Pokedex;
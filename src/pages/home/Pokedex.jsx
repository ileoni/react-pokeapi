import "./Pokedex.css";

import Section from "../../main/template/Section";
import Card from "../../components/Card";

function Pokedex({list})
{
    return (
        <div className="spikes">
            <Section background="bg-yellow-fifth" columns={false}>
                <div className="section__grid">
                    {
                        list?.map((pokemon, index) => (
                            <Card pokemon={pokemon} key={index} />
                        ))
                    }
                </div>
            </Section>
        </div>
    );
}

export default Pokedex;
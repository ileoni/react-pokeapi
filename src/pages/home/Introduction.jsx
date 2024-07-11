import "./Introduction.css";

import Section, { Grid } from "../../main/template/Section";
import Pikachu from '../../assets/pikachu.png';
import GlowUp from '../../components/GlowUp';

function Introduction ()
{   
    return (
        <Section>
            <Grid cols={true}>
                <div className="h-introduction__text">
                    <h4 className="font-cairo">Explore o Universo Pokémon</h4>
                    <h1 className="font-cairo font-bold">com nossa <span className="color-red">Pokédex</span></h1>
                </div>
                <div className="h-introduction__image">
                    <GlowUp maskImage={Pikachu}>
                        <img src={Pikachu} alt={`Contém a image do pokemon ${name}`} />
                    </GlowUp>
                </div>
            </Grid>
        </Section>
    );
}

export default Introduction;
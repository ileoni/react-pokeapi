import Section, { Background, Grid } from '../../main/template/Section';
import Carousel from '../../components/Carousel';

function Evolutions({pokemon})
{
    const {name, evolutions} = pokemon;

    return (
        <Section>
            <Background className="details--gradient">
                <Grid>
                    <Carousel pokemonName={name} evolutions={evolutions}/>
                </Grid>
            </Background>
        </Section>
    );
}

export default Evolutions;
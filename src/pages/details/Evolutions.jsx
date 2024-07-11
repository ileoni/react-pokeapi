import Section, { Background, Grid } from '../../main/template/Section';
import Carousel3D from '../../components/Carousel3D';

function Evolutions({pokemon})
{
    const {name, evolutions} = pokemon;
    return (
        <Section>
            <Background className="details--gradient">
                <Grid>
                    <Carousel3D name={name} evolutions={evolutions}></Carousel3D>
                </Grid>
            </Background>
        </Section>
    );
}

export default Evolutions;
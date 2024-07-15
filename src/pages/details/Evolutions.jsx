import Section, { Background, Grid } from '../../main/template/Section';
import Carousel3D from '../../components/Carousel3D';

function Evolutions({ pokemon })
{
    return (
        <Section>
            <Background className="details--gradient">
                <Grid>
                    {
                        pokemon.evolutions && (
                            <Carousel3D evolutions={pokemon.evolutions}></Carousel3D>
                        )
                    }
                </Grid>
            </Background>
        </Section>
    );
}

export default Evolutions;
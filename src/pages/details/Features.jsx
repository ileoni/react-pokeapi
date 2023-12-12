import Section, { Spikes, Grid } from '../../main/template/Section';
import HeightCharts from '../../components/HeightCharts';

function Features({pokemon})
{
    const {name, types, evolutions} = pokemon;
    const {type, weakeness} = types;

    return (
        <Section section="bg-yellow-fifth" spikes={true}>
            <Spikes className="bg-yellow-fifth">
                <Grid cols={true}>
                    <div className="s-text">
                        <div className="details__types">
                            <h4 className='cairo'>Tipo</h4>
                            {
                                type.map((type, index) => (
                                    <span key={index} className={`${type} d-type inline-block capitalize mt-5 mr-2`}>
                                        {type}
                                    </span>
                                ))
                            }
                        </div>
                        <div className="details__damages mt-8">
                            <h4 className='cairo'>Fraqueza</h4>
                            {
                                weakeness.map((type, index) => (
                                    <span key={index} className={`${type} d-type inline-block capitalize mt-5 mr-2`}>
                                        {type}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="grid mt-8 md:m-0">
                        <h4 className='cairo'>Altura</h4>
                        <div className='self-center py-16 md:p-0'>
                            <HeightCharts pokemonName={name} evolutions={evolutions}/>
                        </div>
                    </div>
                </Grid>
            </Spikes>
        </Section>
    );
}

export default Features;
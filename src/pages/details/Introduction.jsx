import './Introduction.css';
import Section, { Grid } from '../../main/template/Section';
import ImageMask from '../../components/ImageMask';
import { replaceScape } from '../../utils/Helpers';

function Introduction({ pokemon })
{
    return (
        <Section>
            <Grid cols={true}>
                <div className='d-introduction__content'>
                    <h4 className='flex items-center gap-2'>
                        <span className='d-introduction__title'>Nº {pokemon?.id}</span> 
                        <span className='d-introduction__icon h-[25px] w-[25px]'>
                            <i className="pokeball"></i>
                        </span>
                    </h4>
                    <h1 className='capitalize font-bold'>{pokemon?.name}</h1>
                    <p>{ replaceScape(pokemon?.text) }</p>           
                </div>
                <div className='d-introduction__image'>
                    <ImageMask image={pokemon?.sprite}>
                        <picture>
                            <source type="image/webp" srcSet={pokemon?.sprite}
                            />
                            <img src={pokemon?.sprite} alt={`Imagem do pokemon ${pokemon?.name}`}/>
                        </picture>
                    </ImageMask>
                </div>
            </Grid>
        </Section>
    );
}

export default Introduction;
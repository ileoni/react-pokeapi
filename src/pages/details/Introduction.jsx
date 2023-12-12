import './Introduction.css';
import Section, { Grid } from '../../main/template/Section';
import ImageMask from '../../components/ImageMask';
import { replaceScape } from '../../utils/Helpers';

function Introduction({pokemon})
{
    const { id, name, text, image } = pokemon;
    return (
        <Section>
            <Grid cols={true}>
                <div className='d-introduction__text'>
                    <h4 className='flex items-center gap-2 color-red'>
                        Nº {id} <i className="pokeball h-[25px] w-[25px]"></i>
                    </h4>
                    <h1 className='capitalize font-bold'>{name}</h1>
                    <p>{replaceScape(text)}</p>           
                </div>
                <div className='d-introduction__image'>
                    <ImageMask image={image}>
                        <img src={image}  alt={`Imagem do pokemon ${name}`}/>
                    </ImageMask>
                </div>
            </Grid>
        </Section>
    );
}

export default Introduction;
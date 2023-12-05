import './Evolutions.css';

import Carousel from '../../components/Carousel';

function Evolutions({pokemon, evolutions})
{
    return (
        <>
            {
                evolutions && (
                    <Carousel 
                        activated={pokemon} 
                        evolutions={evolutions}
                    />
                )
            }
        </>
    );
}

export default Evolutions;
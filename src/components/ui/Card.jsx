import PokeballSVG from './PokeballSVG';

function Card({ data }) {
    return (
        <div className="p-4 grid place-items-center bg-gradient-to-t from-yellow-1000 to-transparent rounded-lg">
            <img src={data.sprite()} alt={`pokemon ${data.name()}`} width={160} />
            <span className='text-20-to-16 sm:text-20 font-cairo font-semibold capitalize'>
                {data.name()}
            </span>
            <span className='text-12 font-montserrat'>
                Nº {data.pokedexNumber()}
            </span>
        </div>
    );
}

export default Card;
import "./HeightCharts.css";
import Height from "../assets/height.svg";
import { weightMask, heightMask } from '../utils/Helpers'

function HeightCharts({ pokemonName, evolutions })
{
    const activatedPokemon = (pokemon) => pokemon.name === pokemonName ? 'hc-card--activated': ''; 

    return (
        <>
        <div className="height-chart">
            {
                evolutions && evolutions.map((evolution, index) => (
                    <div className={`hc-card ${activatedPokemon(evolution)}`} key={index}>
                        <div className="hc-weight">
                            <img className="hc-weight__image" src={evolution.image} alt={evolution.name} />
                            <span className="hc-weight__text">{weightMask(evolution.weight)}</span>
                        </div>
                        <div className="hc-height">
                            <img className="hc-height__image"  src={Height} alt="eixo vertical" />
                            <span className="hc-height__text">{heightMask(evolution.height)}</span>
                        </div>
                    </div>
                ))
            }
        </div>
        </>
    );
}

export default HeightCharts;


{/* <div className="height-charts">
<div className="compare_pokemon">
    <div className="hc__pokemon">
        <img className={`height__pokemon ${first?.name === pokemonName ? "height__pokemon--active": ""}`} src={first?.image} alt="" />
        <span className="h-weight__text font-16">
            {weightMask(first?.weight)}
        </span>
    </div>
    <div className="hc__height">
        <img className="height__image" src={Height} alt="" />
        <span className="h-height__text font-16">
            {heightMask(first?.height)}
        </span>
    </div>
</div>
<div className="compare_pokemon">
    <div className="hc__pokemon">
        <img className={`height__pokemon ${second?.name === pokemonName ? "height__pokemon--active": ""}`} src={second?.image} alt="" />
        <span className="h-weight__text font-16">
            {weightMask(second?.weight)}
        </span>
    </div>
    <div className="hc__height">
        <img className="height__image" src={Height} alt="" />
        <span className="h-height__text font-16">
            {heightMask(second?.height)}
        </span>
    </div>
</div>
{
    third && (
        <div className="compare_pokemon">
            <div className="hc__pokemon"> 
                <img className={`height__pokemon ${third?.name === pokemonName ? "height__pokemon--active": ""}`} src={third?.image} alt="" />
                <span className="h-weight__text font-16">
                    {weightMask(third?.weight)}
                </span>
            </div>
            <div className="hc__height">
                <img className="height__image" src={Height} alt="" />
                <span className="h-height__text font-16">
                    {heightMask(third?.height)}
                </span>
            </div>
        </div>
    )
}
</div> */}
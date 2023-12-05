import "./HeightCharts.css";
import Height from "../assets/height.svg";

function HeightCharts({ pokemonName, evolutions })
{
    const [first, second, third] = evolutions;

    return (
        <>
            <div className="height-charts">
                <div className="compare_pokemon">
                    <div className="hc__pokemon">
                        <img className={`height__pokemon ${first?.name === pokemonName ? "height__pokemon--active": ""}`} src={first?.sprite} alt="" />
                        <span className="h-weight__text font-16">{first?.weight}Kg</span>
                    </div>
                    <div className="hc__height">
                        <img className="height__image" src={Height} alt="" />
                        <span className="h-height__text font-16">{first?.height}cm</span>
                    </div>
                </div>
                <div className="compare_pokemon">
                    <div className="hc__pokemon">
                        <img className={`height__pokemon ${second?.name === pokemonName ? "height__pokemon--active": ""}`} src={second?.sprite} alt="" />
                        <span className="h-weight__text font-16">{second?.weight}Kg</span>
                    </div>
                    <div className="hc__height">
                        <img className="height__image" src={Height} alt="" />
                        <span className="h-height__text font-16">{second?.height}cm</span>
                    </div>
                </div>
                <div className="compare_pokemon">
                    <div className="hc__pokemon">
                        <img className={`height__pokemon ${third?.name === pokemonName ? "height__pokemon--active": ""}`} src={third?.sprite} alt="" />
                        <span className="h-weight__text font-16">{third?.weight}Kg</span>
                    </div>
                    <div className="hc__height">
                        <img className="height__image" src={Height} alt="" />
                        <span className="h-height__text font-16">{third?.height}cm</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeightCharts;
function Carousel({ evolution, self }) {
    console.log(evolution, self);
    return (
        <>
        <div className="dash-all">
            {evolution?.map((pokemon, index) => (
                <div key={index} data-carousel>
                    <div data-carousel-track>
                        <img src={pokemon.sprite} alt={pokemon.name} />
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default Carousel;
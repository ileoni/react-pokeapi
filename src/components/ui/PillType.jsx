import styled from "styled-components";

function PillType({ name, value }) {

    const PillForeground = styled.div`
        width: ${100 * value}%;
        position: absolute;
        inset: 0;
    `;

    const colorClasses = {
        normal: 'bg-normal',
        fire: 'bg-fire',
        grass: 'bg-grass',
        flying: 'bg-flying',
        fighting: 'bg-fighter',
        poison: 'bg-poison',
        electric: 'bg-electric',
        ground: 'bg-ground',
        rock: 'bg-rock',
        psychic: 'bg-psychic',
        ice: 'bg-ice',
        bug: 'bg-bug',
        ghost: 'bg-ghost',
        steel: 'bg-steel',
        dragon: 'bg-dragon',
        dark: 'bg-dark',
        fairy: 'bg-pixie',
        water: 'bg-water',
    }

    return (
        <div className="w-[120px] sm:w-[160px] h-10 overflow-hidden relative rounded-3xl">
            <div className="w-full absolute inset-0 bg-red-secondary"></div>
            <PillForeground className={`${value !== 1 ? colorClasses[name]: ""}`}/>
            <div className="px-4 absolute inset-0 grid grid-cols-2 items-center">
                <span className="font-cairo font-bold text-white">{name}</span>
                <span className={`justify-self-end font-cairo font-bold text-white ${ value > 2 ? "font-bold text-20 text-yellow-400": ""}`}>
                    {value !== 1 ? value: ""}
                </span>
            </div>
        </div>
    );
}

export default PillType;
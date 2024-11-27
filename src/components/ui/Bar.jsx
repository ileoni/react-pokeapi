import styled from "styled-components";

function Bar({ base, name, min, max }) {

    const Background = styled.div`
        width: 100%;
        height: 100%;
        position: absolute;
        background: #ed405133;
    `;

    const Foreground = styled.div`
        width: ${(base / 2)}%;
        height: 100%;
        position: absolute;
        background: #5eb8e6;
    `

    return (
        <div className="mt-4 grid sm:grid-cols-[60%_auto] gap-4 items-center">
            <div className="w-full h-10 overflow-hidden relative grid items-center rounded-lg">
                <Background />
                <Foreground />
                <div className="w-full px-4 relative grid grid-cols-[1fr_auto_auto] gap-4">
                    <span className="font-cairo font-bold text-white">{base}</span>
                    <span className="font-cairo font-semibold">{min}</span>
                    <span className="font-cairo font-semibold">{max}</span>
                </div>
            </div>
            <span>
                {name}
            </span>
        </div>
    );
}

export default Bar;
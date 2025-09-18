function FadeStaggerSquares(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
            <rect width="30" height="30" x="25" y="85">
                <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="1"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.8"
                ></animate>
            </rect>
            <rect width="30" height="30" x="85" y="85">
                <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="1"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.6"
                ></animate>
            </rect>
            <rect width="30" height="30" x="145" y="85">
                <animate attributeName="opacity"
                    calcMode="spline"
                    dur="1"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                ></animate>
            </rect>
            <rect width="30" height="30" x="205" y="85">
                <animate attributeName="opacity"
                    calcMode="spline"
                    dur="1"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                ></animate>
            </rect>
            <rect width="30" height="30" x="265" y="85">
                <animate attributeName="opacity"
                    calcMode="spline"
                    dur="1"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                ></animate>
            </rect>
        </svg>
    )
}

export default FadeStaggerSquares;
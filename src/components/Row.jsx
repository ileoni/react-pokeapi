import React from "react";

import Spikes from "./Spikes";

function Row(props) {
    const { children, className } = props;
    return <section className={`${className ?? ""}`}>{children}</section>;
}

Row.Background = (props) => {
    const { children, className } = props;
    return (
        <section className={`bg-image-with-gradient bg-no-repeat bg-cover ${className ?? ""}`}>
            {children}
        </section>
    );
}

Row.MaxW5xl = (props) => {
    const { children, className } = props;
    return <div className={`max-w-5xl m-auto py-8 px-4 sm:px-0 ${className ?? ""}`}>{ children }</div>
}

Row.SpikesTop = (props) => {
    const { className } = props;
    return <Spikes className={`w-full -translate-y-0.5 -scale-y-100 ${className ?? ""}`}/>;
}

Row.SpikesBottom = (props) => {
    const { className } = props;
    return <Spikes className={`w-full translate-y-0.5 scale-y-100 ${className ?? ""}`}/>;
}

export default Row;
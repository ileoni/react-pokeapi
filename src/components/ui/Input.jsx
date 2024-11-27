import { forwardRef } from 'react';

export const Text = (props = { icon: null, message: "" }) => {
    return (
        <div className={`mt-1 grid grid-flow-col auto-cols-min items-center gap-2 ${props.className}`}>
            {props.icon}
            <span className='text-12 text-nowrap'>{props.message}</span>
        </div>
    );
}


export const Input = forwardRef(function (props, ref) {
    const { children, ...rest } = props;
    return (
        <div>
            <input
                {...rest}
                ref={ref}
                className={`w-80 p-2 bg-input backdrop-blur-sm rounded ${rest.className}`}
                type="text"
            />
            {children}
        </div>
    );
});
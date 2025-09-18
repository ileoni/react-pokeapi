import { Keyboard } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

export const Text = (props) => {
    const { className, id, label } = props;

    const inputRef = useRef(null);
    const [length, setLength] = useState();
    
    const handleChange = () => {
        const current = inputRef.current?.value.split('').length;
        if(current <= 49) setLength(current);
    }

    return (
        <div className={`grid gap-4 ${className ?? ""}`}>
            <label htmlFor={id}>{label}</label>
            <div className="relative">
                <input ref={inputRef} {...props} type="text" className="w-full bg-transparent outline-none tracking-[6px]" onChange={handleChange} autoFocus={true}/>
                <div className="absolute h-0 grid grid-cols-[auto_1fr]">
                    <span className="h-0 leading-[0]">{length ? Array(length).fill('_').map(underline => underline): ""}</span><span className="h-0 leading-3 animate-pulse">_</span>
                </div>
            </div>
            <small className="mt-2 grid grid-flow-col grid-cols-[auto_1fr] gap-2 items-center text-xs">Pressione enter <Keyboard size={16}/></small>
        </div>
    )
}

export const TextWithRef = forwardRef((props, ref) => {
    const { className, id, label, onChange } = props;
    
    const [length, setLength] = useState();
    
    const onchange = () => {
        if(onChange) onChange();
        
        const current = ref.current?.value.split('').length;
        if(current <= 49) setLength(current);
    }

    return (
        <div className={`grid gap-4 ${className ?? ""}`}>
            <label htmlFor={id}>{label}</label>
            <div className="relative">
                <input ref={ref} {...props} enterKeyHint="send" type="text" className="w-full bg-transparent outline-none tracking-[6px]" onChange={onchange}/>
                <div className="absolute h-0 grid grid-cols-[auto_1fr]">
                    <span className="h-0 leading-[0]">{length ? Array(length).fill('_').map(underline => underline): ""}</span><span className="h-0 leading-3 animate-pulse">_</span>
                </div>
            </div>
            <small className="mt-2 grid grid-flow-col grid-cols-[auto_1fr] gap-2 items-center text-xs">Pressione enter <Keyboard size={16}/></small>
        </div>
    )
});
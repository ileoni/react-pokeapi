import { Command } from "lucide-react";
import { useEffect } from "react";

function Input ({inputRef, keyDown})
{
    return (
        <div 
            className="grid grid-flow-col auto-cols-1fr items-center w-80 px-2 bg-yellow-fifth rounded"
        >
            <input 
                className="rounded bg-inherit outline-none p-2"
                ref={inputRef}
                onKeyDown={keyDown}
                type="text"
            />
            <small className="flex items-center justify-self-center py-1 px-2 rounded bg-yellow-first font-bold">
                <Command className="mr-2" size={14}/> Enter
            </small>
        </div>
    );
}

export default Input;
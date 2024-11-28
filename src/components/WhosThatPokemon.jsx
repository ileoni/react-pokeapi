import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard } from "lucide-react";

import SpikesSVG from "./ui/SpikesSVG";
import { Input, Text } from "./ui/Input";
import { mediaMatches } from "../utils";

const KEY_ENTER = "Enter";

function WhosThatPokemon({ data, loading }) {
    const [state, setState] = useState();
    const inputRef = useRef(null);

    const cleanup = () => inputRef.current.value = "";

    const cleaningAnimation = (element) => {
        element.style.animation = "none";
        element.classList.remove('bg-input-error');
    }
    
    const onAnimationEndOnce = (element, callback) => {
        element.addEventListener("animationend", () => callback(element), { once: true })
    }

    const onShake = () => {
        const element = inputRef.current;

        element.style.animation = "shake 300ms";
        element.classList.add('bg-input-error');
        onAnimationEndOnce(element, cleaningAnimation);
    }
    
    const correctAnswer = () => {
        const record = data.getRandomPokemon(state.id());
        setState(record);
        cleanup();
    }

    const checkName = (value) => state.sameAsName(value) ? correctAnswer(): onShake();

    const handlerKeyDown = useCallback((e) => {
        if(e.key === KEY_ENTER) {
            const { value } = inputRef.current;
            checkName(String(value).toLocaleLowerCase());
        }
    }, [state])

    useEffect(() => {
        console.log(mediaMatches())
        if(!loading) {
            const record = data.getRandomPokemon();
            setState(record);
        }
    }, [loading])

    return (
        <section className="bg-image-with-gradient bg-no-repeat bg-cover">
            <SpikesSVG className="w-full fill-yellow-6000 scale-[-1] translate-y-[-4px]" />
            <div className='my-8 px-8 lg:px-0 max-w-5xl mx-auto'>
                <div className="grid md:grid-cols-2 items-center content-center">
                    <div>
                        <h4 className='font-roboto text-white'>Quem é esse</h4>
                        <h1 className='font-cairo text-white'>Pokemon?</h1>
                        <Input ref={inputRef} onKeyDown={handlerKeyDown} className="w-56 md:w-96 text-white placeholder:ps-1" placeholder='Ditt...'>
                            <Text className="text-white" icon={<Keyboard size={16}/>} message="Pressione enter"/>
                        </Input>
                    </div>
                    <div className='justify-self-center md:justify-self-end'>
                        {!loading && (
                            <img src={state?.sprite()} alt={`pokemon ${state?.name()}`}  width={mediaMatches() ? 200: 380} />
                        )}
                    </div>
                </div>
            </div>
            <SpikesSVG className="w-full fill-yellow-2000 translate-y-[4px]" />
        </section>
    );
}

export default WhosThatPokemon;
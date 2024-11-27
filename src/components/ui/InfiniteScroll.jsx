import { useRef, useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react';

export const InfiniteScroll = (props = { heFinished: true, intersectionObserverCallback, children }) => {
    const { heFinished, intersectionObserverCallback, children } = props;
    const bottomRef = useRef(null);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        if(!toggle && heFinished) {
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: [0.0, 1.0]
            }
    
            const observer = new IntersectionObserver(intersectionObserverCallback, options);
            observer.observe(bottomRef.current);
    
            return () => {
                observer.disconnect();
            }
        }
    }, [toggle, children])
    
    return (
        <>
            {children}
            
            {(toggle && heFinished) && (
                <div className='w-full py-8 grid place-items-center' onClick={() => setToggle(false)}>
                    <button className='w-48 px-4 py-2 bg-yellow-1000 rounded'>Mais pokemons</button>
                </div>
            )}

            {(!toggle && heFinished) && (
                <div ref={bottomRef} className='w-full h-24 grid place-items-center'>
                    <Loader2Icon className='stroke-red-primary animate-spin' size={32}/>
                </div>
            )}
        </>
    );
};
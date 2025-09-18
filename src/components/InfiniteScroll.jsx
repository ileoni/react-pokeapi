import { Loader, Loader2Icon } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import FadeStaggerSquares from "./FadeStaggerSquares";

function InfiniteScroll({ children, intersectionObserverCallback, reachedMaximumLength = false }) {
    const targetRef = useRef(null);
    
    useEffect(() => {
        if(!reachedMaximumLength) {
            const configs = {
                root: null,
                rootMargin: "10px",
                threshold: [0.0, 0.5, 1.0]
            }

            const handleIntersectionObserverCallback = ([entry]) => {
                if(entry.intersectionRatio <= 1 && entry.intersectionRatio >= 0.5) {
                    intersectionObserverCallback();
                }
            }

            const observer = new IntersectionObserver(handleIntersectionObserverCallback, configs)
            observer.observe(targetRef.current);

            return () => {
                observer.disconnect();
            }
        }
    }, [reachedMaximumLength, children]);

    return (
        <>
            <div className={`min-h-screen ${ reachedMaximumLength ? "pb-8": ""}`}>{children}</div>
            {!reachedMaximumLength && (
                <div ref={targetRef} className="min-w-full h-20 grid place-items-center">
                    <FadeStaggerSquares className="size-16 fill-secondary-100"/>
                </div>
            )}
        </>
    )
}

export default InfiniteScroll;
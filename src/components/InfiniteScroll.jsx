import { forwardRef, useEffect, useRef } from "react";

function InfiniteScroll({ children, intersectionObserverCallback, reachedMaximumLength = false }) {
    const targetRef = useRef(null);
    
    useEffect(() => {
        if(!reachedMaximumLength) {
            const configs = {
                root: null,
                rootMargin: "0px",
                threshold: [0.0, 0.5, 1.0]
            }

            const handleIntersectionObserverCallback = ([entry]) => {
                if(entry.intersectionRatio >= 0.5) {
                    intersectionObserverCallback();

                    const top = targetRef.current.offsetTop / 2;
                    window.scrollTo({ behavior: "smooth", top });
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
            <div className="min-h-screen">{children}</div>
            {!reachedMaximumLength && <div ref={targetRef} className="min-w-full h-20 dash"></div>}
        </>
    )
}

export default InfiniteScroll;
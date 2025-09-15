import { createRef, useEffect, useState } from "react"

export const useCarousel = (axis, maxLength) => {
    const [carouselRef, setCarousel] = useState(null);

    let isDragging = false;
    let angle = 0;
    let startX, startY;

    useEffect(() => {
        const carousel = createRef();
        setCarousel(carousel);
    }, []);

    const updateCarousel = () => {
        const rotateAxis = axis ? "rotatex": "rotatey";
        const angleAxis = axis ? angle * -1: angle;
        carouselRef.current.style.transform = `${rotateAxis}(${angleAxis}deg)`;
    }

    const handleMouseDown = ({ pageX, pageY }) => {
        isDragging = true;
        startX = pageX;
        startY = pageY;
    }

    const handleMouseLeave= () => {
        isDragging = false;

        const result = 360 / maxLength;
        let snap = Math.round(angle / result) * result;
        angle = snap;
        updateCarousel();
    }

    const handleMouseMove = ({ pageX, pageY }) => {
        if(!isDragging) return;

        let delta = axis ? pageY - startY: pageX - startX;
        angle += delta * 0.3;

        updateCarousel();
        startX = pageX;
        startY = pageY;
    }
    
    const handleMouseUp = () => {
        isDragging = false;

        const result = 360 / maxLength;
        let snap = Math.round(angle / result) * result;
        angle = snap;
        updateCarousel();
    }

    return {
        carouselRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseMove,
        handleMouseUp,
        // handleTouchEnd,
        // handleTouchStart,
        // handleTouchMove,
    }
}











// import { useEffect, useState } from "react"
// import { useMediaQuery } from "./useMediaQuery";

// export const useCarousel = (carouselRef) => {
//     let angle = 0;
//     let isDragging = false;
//     let startX;

//     const isMobile = useMediaQuery("(max-width: 640px)");
    
//     const handleMouseDown = (e) => {
//         isDragging = true;
//         startX = e.clientX;
//     }
    
//     const updateCarousel = () => {
//         carouselRef.current.style.transform = `rotateY(${angle}deg)`;
//     }

//     const handleMouseUp = (e) => {
//         isDragging = false;

//         // Snap para múltiplos de 120°
//         let snap = Math.round(angle / 120) * 120;
//         angle = snap;
        
//         updateCarousel();
//     }

//     const handleMouseMove = (e) => {
//         if (!isDragging) return;

//         let delta = e.clientX - startX;
//         angle += delta * 0.3; // velocidade
        
//         updateCarousel();
        
//         startX = e.clientX;
//     }


//     return {
//         handleMouseDown,
//         // handleMouseLeave,
//         handleMouseMove,
//         handleMouseUp,
//         // onTouchEnd
//         // onTouchStart
//         // onTouchMove
//     }
// }
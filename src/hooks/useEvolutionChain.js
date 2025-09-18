import { useContext, useEffect, useRef, useState } from "react";

import { EvolutionChainContext } from "../components/EvolutionChain";
import { FULL_ANGLE } from "../constants";

export const useEvolutionChain = () => {
    const carouselRef = useRef(null);
    const carouselTrackRef = useRef(null);

    const { axis, data, currentIndex, setCurrentIndex } = useContext(EvolutionChainContext);

    const [records, setRecords] = useState([]);

    const length = records.length;

    let angleRef = useRef(0);
    let isdraggingRef = useRef(false);
    let startXRef = useRef(0);
    let startYRef = useRef(0);

    useEffect(() => {
        if(data) {
            setRecords(data);
        }
    }, [data]);

    const calculateCurrentIndex = (angle) => {
        if (length === 0) return 0;
        return (Math.abs(angle) / (FULL_ANGLE / length)) % length;
    };

    const cleanUp = () => {
        isdraggingRef.current = false;

        const part = FULL_ANGLE / length;
        let snap = Math.round(angleRef.current / part) * part;
        angleRef.current = snap;

        const newIndex = calculateCurrentIndex(angleRef.current);
        setCurrentIndex(newIndex);

        updateCarousel();
    }

    const updateCarousel = () => {
        const rotateAxis = axis === "horizontal" ? "rotatey": "rotatex";
        const angleAxis = axis === "horizontal" ? angleRef.current: angleRef.current * -1;
        carouselTrackRef.current.style.transform = `${rotateAxis}(${angleAxis}deg)`;
    }

    const handleMouseDown = ({ pageX, pageY }) => {
        isdraggingRef.current = true;
        startXRef.current = pageX;
        startYRef.current = pageY;
    }

    const handleMouseLeave = () => {
        cleanUp();
    }

    const handleMouseMove = ({ pageX, pageY }) => {
        if(!isdraggingRef.current) return;

        let delta = axis === "horizontal" ? pageX - startXRef.current : pageY - startYRef.current;
        angleRef.current += delta * 0.3;

        updateCarousel();
        startXRef.current = pageX;
        startYRef.current = pageY;
    }

    const handleMouseUp = () => {
        cleanUp();
    }

    const handleTouchEnd = () => {
        cleanUp();
    }

    const handleTouchMove = ({ changedTouches }) => {
        if(!isdraggingRef.current) return;

        const [ touch ] = changedTouches;
        const { pageX, pageY } = touch;

        let delta = axis === "horizontal" ? pageX - startXRef.current : pageY - startYRef.current;
        angleRef.current += delta * 0.3;

        updateCarousel();
        startXRef.current = pageX;
        startYRef.current = pageY;
    }

    const handleTouchStart = ({ changedTouches }) => {
        const [ touch ] = changedTouches;
        const { pageX, pageY } = touch;
        
        isdraggingRef.current = true;
        startXRef.current = pageX;
        startYRef.current = pageY;
    }


    return {
        axis,
        records,
        carouselRef,
        carouselTrackRef,
        currentIndex,
        handleMouseDown,
        handleMouseLeave,
        handleMouseMove,
        handleMouseUp,
        handleTouchEnd,
        handleTouchMove,
        handleTouchStart,
    }
}
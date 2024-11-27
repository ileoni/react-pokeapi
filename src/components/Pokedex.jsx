import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { usePokemons, MAX_LENGTH, LIMIT } from '../hooks/usePokemons';
import Section from "./ui/Section";
import Card from "./ui/Card";
import { InfiniteScroll } from "./ui/InfiniteScroll";
import { AppContext } from "../contexts/app-context";


function Pokedex(props) {
    const { data, loading, fetchMore } = usePokemons();
    const { heFinished, setHeFinished } = useContext(AppContext);

    const [currentLength, setCurrentLength] = useState(0);

    useEffect(() => {
        if(currentLength >= 151) setHeFinished(false);

        if(currentLength > 0 && currentLength < 151) {
            const sum = currentLength + LIMIT;
            const limit = sum >= MAX_LENGTH ? MAX_LENGTH - currentLength: LIMIT;
            fetchMore({
                variables: {
                    limit, offset: currentLength
                },
                updateQuery(previousResult, { fetchMoreResult }) {
                    return {
                        pokeapi: {
                            pokemons: [
                                ...previousResult.pokeapi.pokemons,
                                ...fetchMoreResult.pokeapi.pokemons,
                            ]
                        }
                    }
                }
            })
        }
    }, [currentLength])

    const handlerIntersectionObserver = ([entry]) => {
        if(entry.intersectionRatio) {
            const newLength = data.all().length;
            setCurrentLength(newLength);
        }
    }

    return (
        <Section className="py-8 bg-yellow-2000">
            <InfiniteScroll
                heFinished={heFinished}
                intersectionObserverCallback={handlerIntersectionObserver}
            >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {!loading && data.all().map((item, index) => (
                        <Link key={index} to={`pokemon/${item.name()}`}>
                            <Card data={item}/>
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>
        </Section>
    );
}

export default Pokedex;
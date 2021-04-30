import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { HeroList } from '../heroes/HeroList'

export const MarvelScreen = () => {

    const res = useFetch(`https://www.breakingbadapi.com/api/quotes/1`);

    console.log(res);


    return (
        <div>
            <h1>Marvel Screen</h1>
            <hr/>

            <HeroList publisher='Marvel Comics' />
        </div>
    )
}

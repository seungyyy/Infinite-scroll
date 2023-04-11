import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Loading from './Loading';
  
type Respose = {
  count: number,
  next: string,
  previous: null,
  results: ResponseResult[]
  }

type ResponseResult = {
  name: string,
  url: string
}

interface Pokemon {
  name: string;
  id: string;
  imageUrl: string;
}
const LIMIT_SIZE = 1008;

const InfiniteScrollContainer = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [limitIndex, setLimitIndex] = useState<number>(15)
  const [hasNextPage, setNextPage] = useState(true)

  const getPokeApi = useCallback(async(index:number) => {
    try {
      const {data} = await axios.get<Respose>(`https://pokeapi.co/api/v2/pokemon`, {params: { limit: limitIndex }})
      const arrayPokemon = data.results.map((result, index) => { return {
        id: result.name + index + 1,
        name: result.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }})
      setLimitIndex((limitIndex) => limitIndex+15)
      setPokemonList(arrayPokemon)
     
    } catch(err) {
      console.log(err)
       setNextPage(false)
    }
  }, [limitIndex]) 

  const ref =useRef<HTMLDivElement>(null) 
  const callback = useCallback(async (entrie: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entrie.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage) {
        getPokeApi(limitIndex)
      } 
    })

  },[getPokeApi, limitIndex, hasNextPage])

 

  useEffect(() => {
    if (!ref.current) return 

  const options = {
    threshold: 0.5
  }
  
  const observer =  new  IntersectionObserver(callback, options)
  observer.observe(ref.current)
  
  if (LIMIT_SIZE <= limitIndex) {
    setNextPage(false)
  } 
   
    return () => observer.disconnect()

  },[callback, limitIndex])

    
    return (
    <div>
      {pokemonList.map((pokemon, index) => {
        return (
          <li key={pokemon.id + index}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <span>{pokemon.name}</span>
          </li>

        )

        })}
    {isFetching && <Loading />}
    <div style={{height: '1px'}} ref={ref}></div>
    </div>
  )
}

export default InfiniteScrollContainer
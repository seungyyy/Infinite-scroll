import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import Loading from './Loading';

 //https://pokeapi.co/api/v2/pokemon 
  //url : https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
  // 1008까지
 // next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  
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

const InfiniteScrollContainer = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isFetching, setFetching] = useState<boolean>(false)
  const [limitIndex, setLimitIndex] = useState<number>(15)

  // const tt = async() => { return await getPokeApi(10) }
  const getPokeApi = useCallback(async(index:number) => {
    const {data} = await axios.get<Respose>(`https://pokeapi.co/api/v2/pokemon`, {params: { limit: index }})
    const arrayPokemon = data.results.map((result, index) => { return {
      id: result.name + index + 1,
      name: result.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }})
    
    setPokemonList(pokemonList.concat(arrayPokemon))
  }, []) 


  useEffect(() => {
    getPokeApi(10)
  console.log(pokemonList)
  },[])

  return (
    <div>
      {pokemonList.map((pokemon) => {
        return (
          <li key={pokemon.id}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <span>{pokemon.name}</span>
          </li>

        )

        })}
    {isFetching && <Loading />}
    </div>
  )
}

export default InfiniteScrollContainer
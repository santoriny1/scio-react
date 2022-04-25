import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import Pokemon from '../components/PokemonList';
import '../App.css';

import Loader from '../components/Loader'

const Home = () => {
    //UseState
    const [pokemon, setPokemon] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [mode, setMode] = useState('online');
    
    const getPokemonList = async () => {
        if(navigator.onLine) {
            let pokemonArray: any = [];
            for(let i = 1; i <= 21; i++) {
                pokemonArray.push(await getPokemonData(i));
            }
            //console.log(pokemonArray);
            setPokemon(pokemonArray);
            setLoading(false);
            setMode('online');
        } else {
            setLoading(false);
            setMode('offline');
            setPokemon(JSON.parse(localStorage.getItem('pokemons') || '{}'))
        } 
            
    }

    const getPokemonData = async (id: number) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    //UseEffect
    useEffect(() => {
        getPokemonList();
    }, [])

  return (
        <>
            {loading ? (
                <Loader/>
            ): (
                <>
                   { 
                        localStorage.setItem('pokemons', JSON.stringify(pokemon))

                   }
                   <div>
                       {
                           mode === 'offline' ?
                            <div className="alert alert-warning center" role="alert">
                                YOU ARE IN OFFLINE MODE!!!
                            </div>
                            : null
                       }
                   </div>
                    <div className="row" layout-align="center">
                        <div className="mt-12 center">
                            <form>
                                <br />
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Find Pokemons"
                                    className="mb-3"
                                >
                                    <Form.Control 
                                        type="text"
                                        placeholder="Pikachu"

                                        onChange={ (e) => setSearch(e.target.value)}
                                    />
                                </FloatingLabel>
                            </form>
                        </div>
                    </div>
                    <Row>
                        {//Loop
                            pokemon.filter(post => {
                                if(search === "")
                                {
                                    return post;
                                } else if(post.data.name.toLowerCase().includes(search.toLowerCase())) {
                                    return post;
                                }
                            }).map(post => (
                                <Col key={post.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <Pokemon pokemon={post.data}/>
                                </Col>
                            ))
                        }
                    </Row>
                </>
            )}
        </>
    )
}

export default Home;
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

    const getPokemonList = async () => {
        let pokemonArray: any = [];
        for(let i = 1; i <= 151; i++) {
            pokemonArray.push(await getPokemonData(i));
        }
        console.log(pokemonArray);
        setPokemon(pokemonArray);
        setLoading(false);
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { isAsExpression } from 'typescript';
;

//Function Component
export default function PokemonDetails() {

    const pokeName = useParams();
    const name = pokeName.name;
    //UseState
    const [pokemonDetails, setPokemonDetails] = useState<any>();
    const [loading, setLoading] = useState(true);

    const getPokemon = async (name:any) => {
        const details: any = await getPokemonData(name);
        setPokemonDetails(details.data);
        setLoading(false);
    }

    const getPokemonData = async (name:any) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return res;
    }

    //UseEffect
    useEffect(() => {
        getPokemon(name);
    }, []);
    
    function capitalLetter(value:string): string {
        return value.charAt(0).toUpperCase()+value.substring(1);
    }
    function upperCase(value:string): string {
        return value.toUpperCase();
    }

    return(
        <>
            { loading  ? (
                <Loader/>
            ) :
                <>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th scope='col' className='text-center'>#{pokemonDetails.id} {upperCase(pokemonDetails.name)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-center'><img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} width="50%" className="img-fluid"/></td>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-center">Type:</th>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="text-center">
                                                {//Loop
                                                    pokemonDetails.types.map((t:any) => {
                                                        return (
                                                            <p key={t.type.name}>
                                                                {capitalLetter(t.type.name)}
                                                            </p>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-center">Height:</th>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="text-center">{pokemonDetails.height}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-center">Weight:</th>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="text-center">{pokemonDetails.weight}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-center">Abilities:</th>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="text-center">
                                                {//Loop
                                                    pokemonDetails.abilities.map((a:any) => {
                                                        return (
                                                            <p key={a.ability.name}>
                                                                {` ` + capitalLetter(a.ability.name)}
                                                            </p>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-center">Games where it appears:</th>
                                        </tr>
                                        <tr>
                                            <td scope="col" className="text-center">
                                                {//Loop
                                                    pokemonDetails.game_indices.map((g:any) => {
                                                        return (
                                                            <p key={g.version.name}>
                                                                {` ` + capitalLetter(g.version.name)}
                                                            </p>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </>    
            }
        </>
        )
}
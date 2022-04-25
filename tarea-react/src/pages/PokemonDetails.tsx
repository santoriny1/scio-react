import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
;

//Function Component
export default function PokemonDetails() {

    const pokeName = useParams();
    const name = pokeName.name;
    //UseState
    const [pokemonDetails, setPokemonDetails] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState('online');
    const [img, setImg] = useState('/default.jpg');

    const getPokemon = async (name:any) => {
        if(navigator.onLine) { 
            const details: any = await getPokemonData(name);
            setPokemonDetails(details.data);
            setLoading(false);
            setMode('online');
            setImg(details.data.sprites.front_default);
        } else {
            setLoading(false);
            setMode('offline');
            setPokemonDetails(JSON.parse(localStorage.getItem('pokemon-'+name) || '{}'))
            setImg('/default.jpg');
        }
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
                    { 
                        localStorage.setItem('pokemon-'+pokemonDetails.name, JSON.stringify(pokemonDetails))
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
                                            <td className='text-center'><img src={img} alt={pokemonDetails.name} width="50%" className="img-fluid"/></td>
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
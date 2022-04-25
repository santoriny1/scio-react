import React, { useEffect, useState } from "react"
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Function Component
//Props
export default function Pokemon(PokemonProps: {pokemon: any}) {

    const [img, setImg] = useState('/default.jpg');

    function checkStatus() {
        if(navigator.onLine) {
            setImg('');
        }
    }    

    function upperCase(value:string): string {
        return value.toUpperCase();
    }

    function capitalLetter(value:string): string {
        return value.charAt(0).toUpperCase()+value.substring(1);
    }

    //UseEffect
    useEffect(() => {
        checkStatus();
    }, [])

    return(
        <>
            <br />
            <Card  className='shadow'>
                <Card.Img variant="top" src={img === '/default.jpg' ? 'default.jpg' : PokemonProps.pokemon.sprites.front_default} />
                <Card.Header as='h4'> {upperCase(PokemonProps.pokemon.name)} </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>
                            <b>{capitalLetter(PokemonProps.pokemon.name)}</b>{` has the following abilities:`}
                        </p>
                        <ol>
                            {//Loop
                                PokemonProps.pokemon.abilities.map((a:any) => {
                                    return (
                                        <li key={a.key}>
                                            {capitalLetter(a.ability.name)}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                        
                    </Card.Text>
                    <Link to={`/pokemon/${PokemonProps.pokemon.name}`}> 
                        <div className='text-center'>
                            <Button variant="primary">
                                See more...
                            </Button>
                        </div>
                    </Link>
                </Card.Body>
            </Card>
            <br />
        </>
    )
}
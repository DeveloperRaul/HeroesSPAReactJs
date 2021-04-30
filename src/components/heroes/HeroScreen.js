import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroesById } from '../../selectors/getHeroesById';

export const HeroScreen = ({history}) => {

    const { heroeId } = useParams();

    const hero = useMemo(() => getHeroesById(heroeId), [heroeId]);

    // const hero = getHeroesById(heroeId);

    console.log(hero);

    if (!hero) {
        return <Redirect to="/"/>
    }

    const handleBack = () => {

        if (history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <img
                    src={`../assets/heroes/${heroeId}.jpg`}
                    alt={ hero.superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-md-8">
                <h3>{ hero.superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter Ego: </b> { hero.alter_ego } </li>
                    <li className="list-group-item"><b>Publisher: </b> { hero.publisher } </li>
                    <li className="list-group-item"><b>First Appearance: </b> { hero.first_appearance } </li>

                    <h5>Characters</h5>
                    <p>{ hero.characters }</p>

                    <button className="btn btn-outline-info" onClick={handleBack}>
                        Regresar
                    </button>
                </ul>
            </div>
        </div>
    )
}

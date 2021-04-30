import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../heroes/HeroCard';
import { useLocation } from 'react-router';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
    console.log(q);

    const [formValues, handleInputChange ] = useForm({
        searchText: q
    });

    const { searchText } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [ q ]);
    // const heroesFiltered = getHeroesByName(searchText);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
        // console.log(searchText);
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <h3>Buscar Heroes</h3>
                <hr/>

                <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        placeholder="Buscar"
                        className="form-control"
                        autoComplete="off"
                        name="searchText"
                        value={ searchText }
                        onChange={ handleInputChange }
                    />

                    <button 
                        type="submit"
                        className="btn m-1 btn-block btn-outline-primary"
                    >
                        Buscar
                    </button>
                </form>
            </div>
            <div className="col-md-8">
                <h4>Resultados encontrados</h4>
                <hr/>

                {
                    (q === '') &&
                    <div className="alert alert-info">
                        Busque un Heroe...
                    </div>
                }

                {
                    (q !== '' && heroesFiltered.length === 0) &&
                    <div className="alert alert-danger">
                        No se encontraron heroes con { q }
                    </div>
                }

                {
                    heroesFiltered.map( hero => (
                        <HeroCard key={hero.id} { ...hero } />
                    ))
                }
            </div>
        </div>
    )
}

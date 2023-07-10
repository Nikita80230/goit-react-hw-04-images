import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
    const [valueToFind, setValueToFind] = useState('');
    // state = {
    //     valueToFind: '',
    // };

    const onHandleChange = event => {
        setValueToFind(event.target.value);
    };

    const onHandleSubmit = event => {
        event.preventDefault();
        onSubmit(valueToFind);
    };

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={onHandleSubmit}>
                <button className={css.SearchFormButton} type="submit">
                    <span>Search</span>
                </button>

                <input
                    onChange={onHandleChange}
                    value={valueToFind}
                    name="input"
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

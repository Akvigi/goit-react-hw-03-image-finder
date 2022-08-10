import { Component } from "react";
import styles from "./SearchForm.module.css"

class SearchForm extends Component {
    state = {
        query: '',
    }

    onHandleInput = (e) => {
        const { value } = e.currentTarget;
        this.setState({query: value.toLowerCase().trim()})
    }
  
    onHandleSubmit = (e) => {
        e.preventDefault();
        const { query } = this.state;
        this.props.onSubmitFunc(query);
        this.setState({query: ""})
    }
    
    render() {
        return (
            <div className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={(e) => this.onHandleSubmit(e)}>
                    <input
                        className={styles.SearchFormInput} onChange={this.onHandleInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                    <button type="submit">
                        <span>Search</span>
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchForm;
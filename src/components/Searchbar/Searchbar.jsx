import { Component } from "react";

export default class SearchBar extends Component {
    state = {
        value: ''    
    }

    handleInputChange = event => {
        this.setState({ value: event.currentTarget.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ value: '' });
        const { value } = this.state;

        if (value.trim() === '') {
            alert('Please enter search query');
        } else this.props.onSubmit(value);
    }

    render() {
        const {value} = this.state
        return (
            <header onSubmit={this.handleSubmit} className="Searchbar">
                <form className="SearchForm">
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>
                    <input
                        className="SearchForm-input"
                        type="text"
                        value={value}
                        onChange={this.handleInputChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>                  
        )
    }
}
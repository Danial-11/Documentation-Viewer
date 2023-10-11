import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const Input = styled.input`
    width: 700px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    font-size: 16px;
`;

const ErrorMessage = styled.div`
    display: flex;
    justify-content: center;
    color: red;
    margin-top: 5px;
`;

const SearchButton = styled.button`
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-left: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #4183C4;
`;

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = React.useState('');
    const [error, setError] = React.useState('');

    return (
        <>
            <Container>
                <Input
                    type="text"
                    placeholder="Enter Documentation URL"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <SearchButton
                    onClick={() => {
                        if (!search) {
                            setError('Please enter a valid URL.');
                            return;
                        }
                        setError('');
                        onSearch(search);
                    }}
                >
                    Search
                </SearchButton>
            </Container>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
}

export default SearchBar;
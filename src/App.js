import React, { useState } from "react";
import PageContent from "./Components/PageView/PageContent";
import SearchBar from "./Components/SearchBar/SearchBar";

function App() {
    const [showPageContent, setShowPageContent] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearch = (searchValue) => {
        setSearch(searchValue);
        setShowPageContent(true);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {showPageContent && (
                <PageContent apiUrl={search} />
            )}
        </div>
    );
}

export default App;

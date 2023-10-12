import React, { useState } from "react";
import PageContent from "./Components/PageView/PageContent";
import SearchBar from "./Components/SearchBar/SearchBar";

function App() {
    const [showPageContent, setShowPageContent] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const handleSearch = (searchValue: string) => {
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

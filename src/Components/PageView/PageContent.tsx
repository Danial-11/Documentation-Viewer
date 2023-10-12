import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import { getJSONData } from "../../APIs/getJSONData";

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Container = styled.div`
    display: flex;
    border: 1px solid black;
    width: 80%;
    height: 80vh;
`;

const MenuPanel = styled.div`
    border-right: 1px solid #ccc;
`;

const MenuHeader = styled.h2`
    font-size: 20px;
    margin-bottom: 15px;
    text-align: center;
    border-bottom: 1px solid #ccc;
`;

const MenuItem = styled.div<{ isSelected: boolean }>`
    padding: 5px 10px;
    cursor: pointer;
    background-color: ${({ isSelected }) => (isSelected ? "#f7f7f7" : "transparent")};
    color: ${({ isSelected }) => (isSelected ? "blue" : "black")};

    &:hover {
        background-color: #f7f7f7;
    }
`;

const ContentContainer = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const TitleBox = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    margin-bottom: 10px;
`;

const ContentBox = styled.div`
    padding: 10px;
    overflow-y: auto;
`;

const ErrorMessage = styled.div`
    font-size: 24px;
    color: red;
    text-align: center;
    flex: 1;
`;

interface PageProps {
    apiUrl: string;
}

interface Page {
    title: string;
    bodyText: string;
}

const PageContent: React.FC<PageProps> = ({ apiUrl }) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [error, setError ] = useState<string>('');
    
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getJSONData(apiUrl);
                console.log("data", data);
                if (data && data.Pages) {
                    setPages(data.Pages);
                    setSelectedPage(data.Pages[0]);
                    setError('');
                }
            } catch (error) {
                setPages([]);
                setSelectedPage(null);
                setError('Error fetching data 404 not found');
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [apiUrl]);

    return (
        <MainContainer>
            <Container>
            { error ? <ErrorMessage>{error}</ErrorMessage> : (
                <>
                    <MenuPanel>
                        <MenuHeader>Menu</MenuHeader>
                        {pages.map((page) => (
                            <MenuItem 
                                key={page.title} 
                                onClick={() => setSelectedPage(page)} 
                                isSelected={selectedPage === page}
                            >
                                {page.title}
                            </MenuItem>
                        ))}
                    </MenuPanel>
                    <ContentContainer>
                        <TitleBox>
                            {selectedPage && selectedPage.title}
                        </TitleBox>
                        <ContentBox>
                            {selectedPage && <ReactMarkdown>{selectedPage.bodyText}</ReactMarkdown>}
                        </ContentBox>
                    </ContentContainer>
                </>
            )}
            </Container>
        </MainContainer>
    );
}

export default PageContent;

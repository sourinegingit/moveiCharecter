// import { allCharacters } from "../data/data";
import CharecterDetail from "./component/CharecterDetail";
import CharecterList from "./component/CharecterList";
import Navbar, { Favorites, Search, SearchResult } from "./component/Navbar";
import "./App.css";
import {  useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";


function App() {
  // const [characters, SetCharecters] = useState(allCharacters);

  const [query, SetQuery] = useState("");
 // ---------------------- customHook---------------------------------------
  const {isLoading,characters}=useCharacters(query)
  const[favorites,setFavorites]=useLocalStorage("favorites",[]);
// --------------------------------------------------------------------------

  const [selectedId, SetSelectedId] = useState(null);
  
  // for show detail of each charecter
  const handleSelectCharecter = (id) => {
    // SetSelectedId(id)
    SetSelectedId((prevId) => (prevId === id ? null : id));
  };

  // console.log(selectedId);

  const handleAddFavorites = (character) => {
    setFavorites([...favorites, character]);
  };

  const isAddToFavorites = favorites.map((fav) => fav.id).includes(selectedId);
  const handleDeletFavorites=(id)=>{
    setFavorites(favorites.filter((prevFav)=>prevFav.id !==id))
    toast.success('Successfully DELETED')
  }


 
  return (
    <div className="app">
      <Toaster />
      {/* <Modal title="modal test title" open={true} style={{color:"white"}}>this is modal</Modal> */}
      <Navbar characters={characters} >
        <Search query={query} SetQuery={SetQuery} />
        <SearchResult OnSearchResult={characters} />
        <Favorites favorites={favorites} handleDeletFavorites={handleDeletFavorites} />
      </Navbar>
      <Main characters={characters}>
        <CharecterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectedCharecter={handleSelectCharecter}
        />
        <CharecterDetail
          isAddToFavorites={isAddToFavorites}
          selectedId={selectedId}
          OnAddFavorite={handleAddFavorites}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}

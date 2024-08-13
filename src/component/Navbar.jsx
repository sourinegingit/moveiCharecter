import { HeartOutline, TrashOutline } from "heroicons-react";
import Modal from "./Modal";
import { useState } from "react";
import { Charecter } from "./CharecterList";
function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />

      {children}
    </nav>
  );
}

export default Navbar;
function Logo() {
  return <div className="navbar__logo">LOGO 😍</div>;
}
export function Search({ query, SetQuery }) {
  return (
    <input
      type="text"
      name=""
      id=""
      value={query}
      onChange={(e) => SetQuery(e.target.value)}
      className="text-field"
      placeholder="search ...."
    />
  );
}
export function SearchResult({ OnSearchResult }) {
  return (
    <div className="navbar__result">
      found {OnSearchResult.length} charecter
    </div>
  );
}
export function Favorites({ favorites,handleDeletFavorites }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal open={isOpen} onOpen={setIsOpen}>
        {favorites.map((item) => (
          <Charecter
            key={item.id}
            item={item}
            // onSelectedCharecter={onSelectedCharecter}
            // selectedId={selectedId}
          >
            <button onClick={() => handleDeletFavorites(item.id)}>
              <TrashOutline className="icon red" />
            </button>
          </Charecter>
        ))}
      </Modal>
      <button className="heart">
        <HeartOutline className="icon" onClick={() => setIsOpen((is) => !is)} />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}

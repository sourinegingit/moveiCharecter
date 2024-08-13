import { EyeOff, EyeOutline } from "heroicons-react";
import Loader from "./Loader";
function CharecterList({
  characters,
  isLoading,
  onSelectedCharecter,
  selectedId,
}) {
  if (isLoading) {
    return (
      <div className="characters-list">
        <Loader />
      </div>
    );
  }
  return (
    <div className="characters-list">
      {characters.map((item) => {
        return (
          <Charecter
            item={item}
            key={item.id}
            onSelectedCharecter={onSelectedCharecter}
            selectedId={selectedId}
          >
            <button
              className="icon red"
              onClick={() => onSelectedCharecter(item.id)}
            >
              {selectedId === item.id ? <EyeOff /> : <EyeOutline />}
            </button>
          </Charecter>
        );
      })}
    </div>
  );
}

export default CharecterList;

export function Charecter({ item, children }) {
  return (
    <div className="list__item" key={item.id}>
      <img src={item.image} alt={item.name} />
      <CharecterName item={item} />
      <CharecterInfo item={item} />
      {children}
    </div>
  );
}

function CharecterName({ item }) {
  return (
    <h3 className="name">
      <span className="">{item.gender === "Male" ? "👩‍🦰" : "👨‍🦱"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharecterInfo({ item }) {
  return (
    <div className="list-item__info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span>{item.status}</span>
      <span>-{item.species}</span>
    </div>
  );
}

import { ArrowCircleUpOutline } from "heroicons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";
function CharecterDetail({ selectedId, OnAddFavorite, isAddToFavorites }) {
  const [character, SetCharecter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function FetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        SetCharecter(data);
        // console.log(data);

        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        // console.log(episodeId);
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes([episodeData].flat().slice(0, 4));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) FetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "white" }}>please select character</div>
    );

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo character={character} OnAddFavorite={OnAddFavorite} isAddToFavorites={isAddToFavorites}/>
      <EpisodeList episodes={episodes}/>
    </div>
  );
}

export default CharecterDetail;

const CharacterSubInfo = ({ character, OnAddFavorite, isAddToFavorites }) => {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👩" : "👨"}</span>
          <span>&nbsp; {character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span>&nbsp;{character.species}</span>
        </div>

        <div className="location">
          <p>the last location is</p>
          <p>&nbsp;{character.location.name}</p>
        </div>

        <div className="actions">
          {isAddToFavorites ? (
            <p>already exist here ✅</p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => {
                OnAddFavorite(character);
              }}
            >
              Add To Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EpisodeList = ({ episodes }) => {
  const [sorteBy, SetSortBy] = useState(true);
  let sortedEpisode;
  if (sorteBy) {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>list of episodes</h2>
        <button onClick={() => SetSortBy((is)=>!is)}>
          <ArrowCircleUpOutline className="icon" />
        </button>
      </div>
      <ul>
        {sortedEpisode.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} {item.episodes}:
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
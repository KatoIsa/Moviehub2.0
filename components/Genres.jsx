"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";

const Genres = ({ selectedgenre, setSelectedgenre, page, setPage, type }) => {
  const handleAdd = (genre) => {
    setSelectedgenre([...selectedgenre, genre]);
    setGenres(genres.filter((gen) => gen.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedgenre(selectedgenre.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const [genres, setGenres] = useState([]);
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    console.log(selectedgenre);
  }, []);

  return (
    <div className="genres">
      {selectedgenre.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          varient="outlined"
          style={{ margin: "7px 10px 7px 0" }}
          clickable
          size="small"
          onDelete={() => handleRemove(g)}
        />
      ))}
      {genres.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          varient="outlined"
          style={{ margin: "5px 10px" }}
          clickable
          size="small"
          onClick={() => handleAdd(g)}
        />
      ))}
    </div>
  );
};

export default Genres;

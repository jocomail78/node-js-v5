import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";
// import useDropdown from "./useDropdown";

const SeachParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("dog");
  //   const [breed, setBreed] = useState("");
  //   const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  //   const [breed, BreeedDropdown] = useDropdown("Breed", "", breeds);

  //   const [breeds, setBreeds] = useState([]);

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option value="">All</option>
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        {/* <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
            disabled={breeds.length === 0}
          >
            <option value="">All</option>
            {breeds.map((breedString) => (
              <option key={breedString} value={breedString}>
                {breedString}
              </option>
            ))}
          </select>
        </label> */}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SeachParams;

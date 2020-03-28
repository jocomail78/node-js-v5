import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  //   const [animal, setAnimal] = useState("dog");
  //   const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreeedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      //wait for this to finish and get me back the "animals"
      location,
      breed,
      type: animal,
    });
    //it will arrive here only after finishing the request and getting back the animals

    setPets(animals || []); //set pets with either what's comming from animals or set it to an empty array
    console.log(animals);
  }

  //adding an effect, which will be scheduled to run after rendering the DOM content
  useEffect(() => {
    // pet.breeds("dog").then(console.log, console.error);
    setBreeds([]);
    setBreed("");

    //this is an API call.
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); //defining the effect dependencies, basically the parameters or values,
  //which, in case if they are changed, should schedule this effect to run again. If you want it to run once and
  //never again, just add an empty array as the dependency array. If you want to run it every time it updates,
  //then remove the empty array, which will mean that it depends on everything. Basically that will be an infinite loop.
  //Which is not good at all.

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
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
        <AnimalDropdown />
        <BreeedDropdown />

        <button>Submit</button>
      </form>
      <Results pets={pets} />;
    </div>
  );
};

export default SearchParams;

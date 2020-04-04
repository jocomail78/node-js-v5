import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  //experimental version:
  state = { loading: true, error: false };

  //old version
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: true,
  //   };
  // }
  componentDidMount() {
    //Throwing an error from here would trigger the ErrorBoundary.
    //throw new Error("Testing Error boundaries");

    //runs at first startup, and won't run again
    //good for loading ajax
    pet
      .animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      }, console.error)
      .catch((err) => {
        console.log(
          "There was an error, perhasp due to the missing animal: " + err
        );
      });
  }
  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }
    const { animal, breed, location, description, name, media } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

// export default Details;

export default function DetailsWithErrorBoundary(props) {
  // Passing through the props comming from parent to the Details, with this {...props}
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

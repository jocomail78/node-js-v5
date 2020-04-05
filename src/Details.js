import React, { lazy } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";

/*
//Includig two really big JS library, to slow down the loading of the page
import _ from "lodash";
import moment from "moment";

console.log(_, moment);
*/

// We can do code split on JS libraries as well, by replacing
// import Modal from "./Modal";
// with
const Modal = lazy(() => import("./Modal"));
// Which will load modal only if it's strictly needed. Modal will be shown only if the user clicks the Adopt me
// button. Until then Modal won't be loaded and isn't available.

// Suspens component is not necessary here, if it was added on the top level.
// Otherwise it has to be added on this page as well, to point out which part has its own
// way of loading things.

class Details extends React.Component {
  //experimental version:
  state = { loading: true, error: false, showModal: false };

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
          url: animal.url,
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
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);
  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }
    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
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

import configureStore from "redux-mock-store";
import * as data from "../../../db.json";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

const store = (id) => {
    const state = {
      actors: [...data.actors, {
        name: "Daiana",
        summary:
          "Fear is the path to the dark side. Fear leads to anger; anger leads to hate; hate leads to suffering. I sense much fear in you",
        age: "25",
        movies: "Daianeta",
        image:
          "https://difusoribero.files.wordpress.com/2021/07/meme_famoso.png",
        id: 6
      }],
      actorDetail:
        id !== 5 ? data.actors[id - 1] : [...data.actors, actor_test],
    };
    return mockStore(state);
};

export default store;
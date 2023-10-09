import configureStore from "redux-mock-store";
import * as data from "../../../db.json";
import thunk from "redux-thunk";

export const state = ( state ) => {
    const stateDefault = {
        actors: data.actors,
        actorDetail: data.actors[0],
    };

    return state ? state : stateDefault;
};

let store;
const mockStore = configureStore([thunk]);
store = mockStore(state());

export default store;
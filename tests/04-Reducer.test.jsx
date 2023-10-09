// testing
import { describe, test, expect, vi } from "vitest";
import rootReducer from "../src/redux/reducer";
import "@testing-library/jest-dom";
import * as data from "../db.json";

// actions types
import {
  GET_ALL_ACTORS,
  GET_ACTOR_DETAIL,
  CREATE_ACTOR,
  DELETE_ACTOR
} from "../src/redux/actions/action-types";

vi.mock("../src/redux/actions/index", () => ({
  __esModule: true,
  GET_ALL_ACTORS,
  GET_ACTOR_DETAIL,
  CREATE_ACTOR,
  DELETE_ACTOR,

  createActor: (payload) => ({
    type: CREATE_ACTOR,
    payload,
  }),
  getActorDetail: (payload) => ({
    type: GET_ACTOR_DETAIL,
    payload,
  }),
  getAllActors: (payload) => ({
    type: GET_ALL_ACTORS,
    payload,
  }),
  deleteActor: (payload) => ({
    type: DELETE_ACTOR,
    payload,
  }),
}));

describe("Reducer", () => {
  test("Si no existe un action.type, debe devolver el estado sin cambios", () => {
    const reducerContent = rootReducer(undefined, { type: "NO_EXISTE" });
    expect(reducerContent).toStrictEqual({ actors: [], actorDetail: {} });
  });

  test("Si el action.type es GET_ALL_ACTORS, debe devolver el estado actors que contenga los actores obtenidos del servidor", () => {
    const reducerContent = rootReducer(undefined, { type: GET_ALL_ACTORS, payload: data.actors });
    expect(reducerContent.actors).toStrictEqual(data.actors);
  });

  test("Si el action.type es GET_ACTOR_DETAIL, debe devolver el estado actorDetail que contenga el detalle del actor obtenido del servidor", () => {
    const reducerContent = rootReducer(undefined, { type: GET_ACTOR_DETAIL, payload: data.actors[3] });
    expect(reducerContent.actorDetail).toStrictEqual(data.actors[3]);
  });

  test("Si el action.type es CREATE_ACTOR, debe devolver el estado actors que contenga al actor creado", () => {
    const state = {
      actors: data.actors,
      actorDetail: {},
    };

    const payload = {
      id: 6,
      name: "Jennifer Lawrence",
      movies: "The Hunger Games",
      age: 33,
      summary: "Jennifer Lawrence is an American actress, recipient of the Academy Award for Best Actress, and part of the Forbes 100 Most Influential People list. She is recognized for her performances in films such as Silver Linings Playbook (2012), American Hustle (2013), and The Hunger Games series.",
      imagen: "https://www.ecartelera.com/carteles/3500/3507/008.jpg"
    };

    const action = {
      type: CREATE_ACTOR,
      payload,
    };
    
    const reducerContent = rootReducer(state, action);
    expect(reducerContent.actors).toStrictEqual([...data.actors, payload]);
    expect(reducerContent).toHaveProperty("actorDetail");
  });

  test("Si el action.type es DELETE_ACTOR, debe devolver el estado actors sin el actor eliminado por ID", () => {
    const state = {
      actors: data.actors,
      actorDetail: {},
    };

    const action = {
      type: DELETE_ACTOR,
      payload: 1,
    };

    const action5 = {
      type: DELETE_ACTOR,
      payload: 5,
    };

    const reducerContentOne = rootReducer(state, action);
    const reducerContentFive = rootReducer(state, action5); 
    const deleteActorOne = state.actors.filter((actor) => actor.id !== action.payload);
    const deleteActorFive = state.actors.filter((actor) => actor.id !== action5.payload);
    expect(reducerContentOne.actors).toStrictEqual(deleteActorOne);
    expect(reducerContentFive.actors).toStrictEqual(deleteActorFive);
  });
});
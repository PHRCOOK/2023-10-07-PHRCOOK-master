// @jest-environment node
// testing
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import nock from "nock";

// helpers
import apiMock from "./helpers/apiMock";

// support
import store, { state } from "./helpers/support/configStore";

// json
import * as data from "../db.json";

// actions types and creators
import {
    GET_ALL_ACTORS,
    GET_ACTOR_DETAIL,
    CREATE_ACTOR,
    DELETE_ACTOR
} from "../src/redux/actions/action-types";

import {
    getAllActors,
    getActorDetail,
    createActor,
    deleteActor
} from "../src/redux/actions/index";

describe("Actions", () => {
  state({actors: []});

  beforeEach(() => {
    store.clearActions();
    apiMock(6);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getAllActors", () => {
    test("Debe hacer un dispatch de la action GET_ALL_ACTORS y como payload tener la respuesta de la direccion http://localhost:3001/actors", async () => {
      return store
        .dispatch(getAllActors())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].payload.length).toBe(5);
          expect(actions[0].type).toBe(GET_ALL_ACTORS);
          expect(actions[0].payload).toEqual(data.actors);
        })
        .catch((err) => {
          console.log(err);
          expect(err).toBe(null);
        });
    });
  });

  describe("getActorDetail", () => {
    test("Debe hacer un dispatch de la action GET_ACTOR_DETAIL y como payload tener la respuesta de la direccion http://localhost:3001/actors/:id", async () => {
      const payload = data.actors[0];
      const actions = store.getActions();
      return store
        .dispatch(getActorDetail(payload.id))
        .then(() => {
          expect(actions[0].type).toBe(GET_ACTOR_DETAIL);
          expect(actions[0].payload).toEqual(data.actors[0]);
        })
        .catch((err) => {
          console.log(err);
          expect(err).toBe(null);
        });
    });

    test("Debe retornar el actor correcto según el id pasado como argumento", () => {
      const payload = data.actors[4];
      const actions = store.getActions();
      return store
        .dispatch(getActorDetail(payload.id))
        .then(() => {
          expect(actions[0].type).toBe(GET_ACTOR_DETAIL);
          expect(actions[0].payload).toEqual(data.actors[0]);
        })
        .catch((err) => {
          console.log(err);
          expect(err).toBe(null);
        });
    });
  });

  describe("createActor", () => {
    test("Debe hacer un dispatch de la action CREATE_ACTOR y como payload tener el/la actor/actriz creado/a con un ID incremental", async () => {
      const payload = {
        name: "Jennifer Lawrence",
        movies: ["Don't Look Up", "Mother!", "The Hunger Games"],
        age: 33,
        summary: "Jennifer Lawrence is an American actress, recipient of the Academy Award for Best Actress, and part of the Forbes 100 Most Influential People list. She is recognized for her performances in films such as Silver Linings Playbook (2012), American Hustle (2013), and The Hunger Games series.",
        imagen: "https://www.ecartelera.com/carteles/3500/3507/008.jpg",
        id: 6,
      };

      expect(createActor(payload)).toEqual({
        type: CREATE_ACTOR,
        payload: payload
      });
    });
  });

  describe("deleteActor", () => {
    test("Debe hacer un dispatch de la action DELETE_ACTOR y como payload tener el ID del actor a eliminar", async () => {
      expect(deleteActor(1)).toEqual({
        type: DELETE_ACTOR,
        payload: 1,
      });

      expect(deleteActor(2)).toEqual({
        type: DELETE_ACTOR,
        payload: 2,
      });
    });
  });
});
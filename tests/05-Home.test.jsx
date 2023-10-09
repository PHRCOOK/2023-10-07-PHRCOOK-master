// testing
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import nock from "nock";

// components
import Home from "../src/components/Home/Home";

// helpers
import store, { state } from "./helpers/support/configStore";
import componentToUse from "./helpers/componentToUse";
import apiMock from "./helpers/apiMock";

// action types
import { GET_ALL_ACTORS } from "../src/redux/actions/action-types";

//
import mainImage from "../src/assets/logo.jpg";
import * as data from "../db.json";

vi.mock("../src/redux/actions/index", () => ({
  getAllActors: (payload) => ({
    type: GET_ALL_ACTORS,
    payload,
  }),
}));

describe("<Home/>", () => {
  beforeEach(() => {
    state({ actors: data.actors, actorDetail: {} });
    apiMock(6);
    store.clearActions();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    nock.cleanAll();
  });

  test("Debe renderizar un h1 con el texto 'Henry Actors'", () => {
    render(componentToUse(<Home />));
    const h1 = screen.getAllByRole("heading");
    let success = false;
    h1.forEach((element) => {
      if (element.textContent.includes("Henry Actors")) success = true;
    });
    expect(screen.getByTestId("Home")).toBeTruthy();
    expect(success).toBeTruthy();
  });

  test("Debe renderizar un tag <img> con la imagen logo.jpg en la carpeta assets", async () => {
    render(componentToUse(<Home />));
    const imgElement = await screen.findByTestId("logo");
    expect(imgElement).toHaveAttribute("src", mainImage);
  });

  test("El tag <img> debe tener el atributo alt con el valor 'logo'", async () => {
    render(componentToUse(<Home />));
    const imgElement = await screen.findByTestId("logo");
    expect(imgElement).toHaveAttribute("alt", "logo");
  });

  test("Debe traer el estado global actors de redux", async () => {
    render(componentToUse(<Home />));
    expect(store.getState().actors).toEqual(data.actors);
  });

  test("Debe traer a la funcion getAllActors del archivo actions y hacer un dispatch de la misma", async () => {
    render(componentToUse(<Home />));
    expect(store.getActions()[0].type).toBe("GET_ALL_ACTORS");
  });

  test("Debe utilizar el hook useEffect ", async () => {
    const useEffectMock = vi.spyOn(React, "useEffect");
    render(componentToUse(<Home />));
    expect(useEffectMock).toHaveBeenCalled();
  });

  test("Debe extraer todos los actores del estado global actors y renderizar un componente Card por cada una de ellas", async () => {
    render(componentToUse(<Home />));
    const actorCard = await screen.findAllByTestId("Card");
    expect(actorCard.length).toBe(data.actors.length);
  });

  test("Debe pasar como prop a cada componente Card el actor correspondiente", async () => {
    render(componentToUse(<Home />));
    const actorCards = await screen.findAllByTestId("Card");

    const getActorName = (actorCard) => {
      const titleElement = actorCard.querySelector("h2");
      const aux = titleElement ? titleElement.textContent : null;
      return aux;
    };
    expect(getActorName(actorCards[0])).toBe(data.actors[0].name);
    expect(getActorName(actorCards[1])).toBe(data.actors[1].name);
    expect(getActorName(actorCards[2])).toBe(data.actors[2].name);
  });
});

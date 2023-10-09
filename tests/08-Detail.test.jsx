// testing
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
import "@testing-library/jest-dom";
import React from "react";
import nock from "nock";

// action-types
import { GET_ACTOR_DETAIL } from "../src/redux/actions/action-types";

// helpers
import componentToUse from "./helpers/08-Detail/componentToUse";
import elementFiltered from "./helpers/08-Detail/elementFiltered";
import apiMock from "./helpers/apiMock";

// json
import * as data from "../db.json";


vi.mock("../src/redux/actions/index.js", () => ({
  getActorDetail: (payload) => ({ type: GET_ACTOR_DETAIL, payload }),
}));

let callElementFiltered;

describe("<Detail/>", () => {
  beforeEach(() => {
    apiMock();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    nock.cleanAll();
  });

  test("Debe utilizar el hook useEffect para llamar a la accion getActorDetail con el id del actor", () => {
    const useEffectMock = vi.spyOn(React, "useEffect");
    render(componentToUse(1));

    expect(useEffectMock).toHaveBeenCalled();
  });

  describe("Estructura", () => {
    test("Debe renderizar un tag <img> con la imagen del actor y una prop alt con el nombre del mismo", () => {
      render(componentToUse(1));
      callElementFiltered = elementFiltered("IMG", "img");

      expect(callElementFiltered.length).toBe(1);
      expect(callElementFiltered[0]).toHaveAttribute("src", data.actors[0].image);
      expect(callElementFiltered[0]).toHaveAttribute("alt", data.actors[0].name);
    });

    test("Debe renderizar un tag <h1> con el nombre del actor", async () => {
      render(componentToUse(1));
      callElementFiltered = elementFiltered("H1") 

      expect(callElementFiltered.length).toBe(1);
      expect(callElementFiltered[0].textContent).toBe(data.actors[0].name);
    });

    test("Debe renderizar un tag <h2> con la prop 'age' del actor", async () => {
      render(componentToUse(2));
      callElementFiltered = elementFiltered("H2")

      expect(callElementFiltered.length).toBe(1);
      expect(callElementFiltered[0].textContent).toBe(data.actors[1].age.toString());
    });

    test("Debe renderizar un tag <h3> con la prop 'movies' del actor", async () => {
      render(componentToUse(3));
      callElementFiltered = elementFiltered("H3")

      expect(callElementFiltered.length).toBe(1);
      expect(callElementFiltered[0].textContent).toBe(data.actors[2].movies);
    });

    test("Debe renderizar un tag <h5> con la prop 'summary' del actor", async () => {
      render(componentToUse(1));
      callElementFiltered = elementFiltered("H5")

      expect(callElementFiltered.length).toBe(1);
      expect(callElementFiltered[0].textContent).toBe(data.actors[0].summary);
    });
  });

  describe("Hooks", () => {
    test("Debe utilizar el hook useParams para obtener el id del actor", () => {
      vi.mock("react-router-dom", async () => {
        const actual = await vi.importActual("react-router-dom");
        return {
          ...actual,
          useParams: vi.fn().mockReturnValue({
            id: "1",
          }),
        };
      });

      render(componentToUse(1));
      expect(useParams).toHaveBeenCalled();
    });
  });
});
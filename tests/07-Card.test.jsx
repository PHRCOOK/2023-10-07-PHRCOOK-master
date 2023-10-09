// testing
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

// helpers
import store, { state } from "./helpers/support/configStore";

// component
import Card from "../src/components/Card/Card";

// actions types
import { DELETE_ACTOR } from "../src/redux/actions/action-types";

// json
import * as data from "../db.json";

vi.mock("../src/redux/actions", () => ({
  deleteActor: (payload) => ({type: DELETE_ACTOR, payload}),
}));

describe("<Card/>", () => {
  state({ actors: [], actorDetail: {} });

  let componentToUse = ({ name, id, age, movies, image}) => {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <Card
              key={id}
              name={name}
              id={id}
              age={age}
              movies={movies}
              image={image}
            />
        </MemoryRouter>
      </Provider>
    );
  };

  describe("Estructura", () => {
    test("Debe renderizar un boton con la letra 'X'", () => {
      render(componentToUse(data.actors[0]));
      expect(screen.getByRole("button").textContent).toBe("X");
    });

    test("Debe renderizar un solo heading de tipo `h2` con el nombre del actor", () => {
      render(componentToUse(data.actors[0]));
      const heading = screen.getByRole("heading");
      expect(heading.textContent).toBe(data.actors[0].name);  
    });

    test("Debe renderizar la url de la imagen del actor y un atributo alt con el nombre del mismo", () => {
      render(componentToUse(data.actors[0]));
      expect(screen.getByRole("img").tagName).toBe("IMG");
      expect(screen.getByRole("img").src).toBe(data.actors[0].image);
      expect(screen.getByRole("img").alt).toBe(data.actors[0].name);
    });

    test("Debe renderizar un tag <p/> con el atributo 'age' del actor", () => {
      render(componentToUse(data.actors[0]));
      expect(screen.getByText(data.actors[0].age).tagName).toBe("P");
    });

    test("Debe asociar un Link a la ruta `/actors/:id` con el id del actor al hacer click en la imagen de la tarjeta", () => {
      render(componentToUse(data.actors[0]));
      expect(screen.getByRole("link").href).toBe(
        `http://localhost:3000/actors/${data.actors[0].id}`
      );
    });

    test("Debe hacer un dispatch de la accion `deleteActor` al hacer click en el boton con la letra 'X'", () => {
      render(componentToUse(data.actors[0]));
      fireEvent.click(screen.getByRole("button"));
      expect(store.getActions()).toEqual([
        {type: DELETE_ACTOR, payload: data.actors[0].id},
      ]);
    });
  });
});
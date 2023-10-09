// testing
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";

// helpers
import store, { state } from "./helpers/support/configStore";
import componentToUse from "./helpers/componentToUse";

// components
import Create from "../src/components/Create/Create";

// actions types
import { CREATE_ACTOR } from "../src/redux/actions/action-types";

// json
import * as data from "../db.json";

vi.mock("../src/redux/actions/index", () => ({
  createActor: (payload) => ({
    type: CREATE_ACTOR,
    payload: {
      ...payload,
      id: 6,
    },
  }),
}));

describe("<Create/>", () => {
  state({ actors: data.actors, actorDetail: {} });

  const callComponentToUse = componentToUse("/create", <Create />);

  describe("Formulario", () => {
    test("Debe renderizar un label para cada input con los siguientes strings: 'Name:' , 'Movies:' , 'Age:', 'Summary:', 'Image:'", () => {
      render(callComponentToUse);
      const labels = screen.getAllByRole("textbox");
      console.log(labels.length);

      expect(labels).toHaveLength(5);
      expect(screen.getByText("Name:")).toBeInTheDocument();
      expect(screen.getByText("Movies:")).toBeInTheDocument();
      expect(screen.getByText("Age:")).toBeInTheDocument();
      expect(screen.getByText("Summary:")).toBeInTheDocument();
      expect(screen.getByText("Image:")).toBeInTheDocument();
    });

    test("Debe renderizar un input de tipo text con el atributo 'name' igual al 'name' ", () => {
      render(callComponentToUse);
      const inputs = screen.getAllByRole("textbox");

      let success = false;
      inputs.forEach((input) => {
        if (input.name === "name") success = true;
      });

      expect(success).toBe(true);
    });
  });

  test("Debe renderizar un input de tipo textarea con el atributo 'name' igual al 'summary' ", () => {
    render(callComponentToUse);
    const inputs = screen.getAllByRole("textbox");

    let success = false;
    inputs.forEach((input) => {
      if (input.name === "summary") success = true;
    });

    expect(success).toBe(true);
  });

  test("Debe renderizar un input de tipo text con el atributo 'name' igual al 'movies' ", () => {
    render(callComponentToUse);
    const inputs = screen.getAllByRole("textbox");

    let success = false;
    inputs.forEach((input) => {
      if (input.name === "movies") success = true;
    });

    expect(success).toBe(true);
  });

  test("Debe renderizar un input de tipo text con el atributo 'name' igual al 'age' ", () => {
    render(callComponentToUse);
    const inputs = screen.getAllByRole("textbox");

    let success = false;
    inputs.forEach((input) => {
      if (input.name === "age") success = true;
    });

    expect(success).toBe(true);
  });

  test("Debe renderizar un input de tipo text con el atributo 'name' igual al 'image' ", () => {
    render(callComponentToUse);
    const inputs = screen.getAllByRole("textbox");

    let success = false;
    inputs.forEach((input) => {
      if (input.name === "image") success = true;
    });

    expect(success).toBe(true);
  });

  test("Debe renderizar un boton con el texto 'Create' ", async () => {
    render(callComponentToUse);

    expect(await screen.findByRole("button")).toHaveTextContent("Create");
  });

  describe("Estados", () => {
    test("Debe inicializar el estado del formulario con los siguientes valores: name: '', movies: '', age: '', summary: '', image: ''", async () => {
      const useStateMock = vi.spyOn(React, "useState");
      render(callComponentToUse);
      expect(useStateMock).toHaveBeenCalledWith({
        name: "",
        movies: "",
        age: "",
        summary: "",
        image: "",
      });
    });
  });

  describe("Manejo de errores", () => {
    test("Debe rendrizarse el mensaje de error 'The name must be five characters long')cuando el nombre sea menor a 5 caracteres", async () => {
      render(callComponentToUse);

      let inputs = screen.getAllByRole("textbox");

      const nameActor = inputs.find((input) => input.name === "name");

      fireEvent.change(nameActor, { target: { value: "tit" } });

      const submitButton = await screen.findByRole("button");
      fireEvent.click(submitButton);

      expect(
        await screen.findByText("The name must be five characters long")
      ).toBeInTheDocument();
    });

    test("Debe rendrizarse el mensaje de error 'The name must be less than twenty characters long')cuando el nombre sea mayor a 20 caracteres", async () => {
      render(callComponentToUse);

      let inputs = screen.getAllByRole("textbox");

      const nameActor = inputs.find((input) => input.name === "name");

      fireEvent.change(nameActor, {
        target: {
          value:
            "We hope that all of you pass this exam, and we will continue to see you in the next module. Best wishes to all!",
        },
      });

      const submitButton = await screen.findByRole("button");
      fireEvent.click(submitButton);

      expect(
        await screen.findByText(
          "The name must be less than twenty characters long"
        )
      ).toBeInTheDocument();
    });

    test("Debe renderizarse el mensaje de error 'Only numbers' en caso de recibir letras o simbolos en la edad", async () => {
      render(callComponentToUse);

      let inputs = screen.getAllByRole("textbox");

      const age = inputs.find((input) => input.name === "age");

      fireEvent.change(age, { target: { value: "age" } });

      const submitButton = await screen.findByRole("button");
      fireEvent.click(submitButton);

      expect(await screen.findByText("Only numbers")).toBeInTheDocument();
    });

    test("Debe renderizarse el mensaje de error 'The age must be two digits' en caso de recibir un numero de menos de 2 digitos", async () => {
      render(callComponentToUse);

      let inputs = screen.getAllByRole("textbox");

      const age = inputs.find((input) => input.name === "age");

      fireEvent.change(age, { target: { value: "3" } });

      const submitButton = await screen.findByRole("button");
      fireEvent.click(submitButton);

      expect(
        await screen.findByText("The age must be two digits")
      ).toBeInTheDocument();
    });

    test("Debe renderizarse el mensaje de error 'The summary must be fifty characters long' en caso de recibir una descripcion de menos de 50 caracteres", async () => {
      render(callComponentToUse);

      let inputs = screen.getAllByRole("textbox");

      const summary = inputs.find((input) => input.name === "summary");

      fireEvent.change(summary, { target: { value: "summary" } });

      const submitButton = await screen.findByRole("button");
      fireEvent.click(submitButton);

      expect(
        await screen.findByText("The summary must be fifty characters long")
      ).toBeInTheDocument();
    });

    test("Debe renderizarse el mensaje de error 'The movies must be five characters long' en caso de recibir una movie de menos de 5 caracteres", async () => {
      render(callComponentToUse);

      let inputs = screen.getAllByRole("textbox");

      const movies = inputs.find((input) => input.name === "movies");

      fireEvent.change(movies, { target: { value: "mov" } });

      const submitButton = await screen.findByRole("button");
      fireEvent.click(submitButton);

      expect(
        await screen.findByText("The movies must be five characters long")
      ).toBeInTheDocument();
    });

    test("Debe renderizarse el error 'The image must be a URL' en caso de recibir una imagen que no sea una URL", async () => {
      render(callComponentToUse);

      let inputs = screen.getAllByRole("textbox");

      const image = inputs.find((input) => input.name === "image");

      fireEvent.change(image, { target: { value: "image" } });

      const submitButton = await screen.findByRole("button");
      fireEvent.click(submitButton);

      expect(
        await screen.findByText("The image must be a URL")
      ).toBeInTheDocument();
    });
  });

  describe("Dispatch", () => {
    test("Debe llamar al dispatch con el objeto creado por el formulario cuando se haga submit", async () => {
      const dispatchMock = vi.spyOn(store, "dispatch");
      render(callComponentToUse);

      let inputs = screen.getAllByRole("textbox");

      const summary = inputs.find((input) => input.name === "summary");
      const nameActor = inputs.find((input) => input.name === "name");
      const movies = inputs.find((input) => input.name === "movies");
      const image = inputs.find((input) => input.name === "image");
      const age = inputs.find((input) => input.name === "age");

      const actor_test = {
        name: "Daiana",
        summary:
          "Fear is the path to the dark side. Fear leads to anger; anger leads to hate; hate leads to suffering. I sense much fear in you",
        age: "25",
        movies: "Daianeta",
        image:
          "https://difusoribero.files.wordpress.com/2021/07/meme_famoso.png",
        id: 6,
      };

      fireEvent.change(summary, { target: { value: actor_test.summary } });
      fireEvent.change(nameActor, { target: { value: actor_test.name } });
      fireEvent.change(movies, { target: { value: actor_test.movies } });
      fireEvent.change(image, { target: { value: actor_test.image } });
      fireEvent.change(age, { target: { value: actor_test.age } });

      const button = await screen.findByRole("button");
      fireEvent.click(button);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: CREATE_ACTOR,
        payload: actor_test,
      });
    });
  });
});

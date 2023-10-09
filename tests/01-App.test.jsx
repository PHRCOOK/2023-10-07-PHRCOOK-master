// testing
import { describe, beforeEach, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// helpers
import componentToUse from "./helpers/componentToUse";
import apiMock from "./helpers/apiMock";


describe("<App/>", () => {
  const routes = ["/", "/actors/1", "/create"];

  beforeEach(async () => {
    apiMock();
  });

  componentToUse();

  describe("Nav:", () => {
    test("El componente Nav debe ser renderizado en la ruta /", () => {
      render(componentToUse(routes[0]));
      expect(screen.getByTestId("Nav")).toBeInTheDocument();
    });

    test("El componente Nav debe ser renderizado en la ruta /actors/:id", () => {
      render(componentToUse(routes[1]));
      expect(screen.getByTestId("Nav")).toBeInTheDocument();
    });

    test("El componente Nav debe ser renderizado en la ruta /create", () => {
      render(componentToUse(routes[2]));
      expect(screen.getByTestId("Nav")).toBeInTheDocument();
    });
  });

  describe("Home:", () => {
    test("El componente Home debe ser renderizado en la ruta /", () => {
      render(componentToUse(routes[0]));
      expect(screen.getByTestId("Home")).toBeInTheDocument();
    });

    test("El componente Home NO debe renderizarse en ninguna otra ruta", () => {
      render(componentToUse(routes[1]));
      expect(screen.queryByTestId("Home")).not.toBeInTheDocument();
    });
  });

  describe("Detail:", () => {
    test("El componente Detail debe ser renderizado la ruta /actors/:id", () => {
      render(componentToUse(routes[1]));
      expect(screen.getByTestId("Detail")).toBeInTheDocument();
    });

    test("El componente Detail NO debe renderizarse en ninguna otra ruta", () => {
      render(componentToUse(routes[0]));
      expect(screen.queryByTestId("Detail")).not.toBeInTheDocument();
    });
  });

  describe("Create:", () => {
    test("El componente Create debe ser renderizado en la ruta /create", () => {
      render(componentToUse(routes[2]));
      expect(screen.getByTestId("Create")).toBeInTheDocument();
    });

    test("El componente Create NO debe renderizarse en ninguna otra ruta", () => {
      render(componentToUse(routes[0]));
      expect(screen.queryByTestId("Create")).not.toBeInTheDocument();
    });
  });
});
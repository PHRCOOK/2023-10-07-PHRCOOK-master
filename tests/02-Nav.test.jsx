//testing
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import nock from "nock";

// helpers
import componentToUse from "./helpers/componentToUse";
import apiMock from "./helpers/apiMock";

// support
import store from "./helpers/support/configStore";

// components
import Nav from "../src/components/Nav/Nav";

describe("<Nav/>", () => {
  beforeEach(() => {
    apiMock(10);
    store.clearActions();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("Debe renderizar dos etiquetas <Link/>. Una a la ruta / y otra a la ruta /create", () => {
    render(componentToUse(<Nav />));
    expect(screen.getAllByRole("link")[0]).toHaveAttribute("href", "/");
    expect(screen.getAllByRole("link")[1]).toHaveAttribute("href", "/create");
  });

  test("Debe haber una etiqueta <Link/> con el texto 'Home' y otra con el texto 'Create'", () => {
    render(componentToUse(<Nav />));
    expect(screen.getAllByRole("link")[0]).toHaveTextContent("Home");
    expect(screen.getAllByRole("link")[1]).toHaveTextContent("Create");
  });
});

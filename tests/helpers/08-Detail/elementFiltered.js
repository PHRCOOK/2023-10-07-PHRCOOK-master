import { screen } from "@testing-library/react";

const elementFiltered = (tagName, element = "heading") => {
    const list = screen.getAllByRole(element);
    const listFiltered = list.filter(element => element.tagName === tagName);

    return listFiltered;
};

export default elementFiltered;
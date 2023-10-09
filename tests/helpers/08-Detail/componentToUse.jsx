import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Detail from "../../../src/components/Detail/Detail";
import store from "./store";
import match from "./match";

const componentToUse = (id) => {
    return (
      <Provider store={store(id)}>
        <MemoryRouter initialEntries={[`/actors/${id}`]}>
          <Detail match={match(id)} />
        </MemoryRouter>
      </Provider>
    );
};

export default componentToUse;
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./support/configStore";
import App from "../../src/App";

const componentToUse = (route, component = <App />) => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
       {component}
      </MemoryRouter>
    </Provider>
  );
};

export default componentToUse;
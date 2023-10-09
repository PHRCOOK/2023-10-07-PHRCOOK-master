import corsHeaders from "./corsHeaders";
import * as data from "../../db.json";
import nock from "nock";

const apiMock = (ID = null) => {
  let id = ID;
  
  const api = nock("http://localhost:3001").persist();
  api.get("/actors").reply(200, data.actors, corsHeaders);
  
  api
    .get((uri) => {
      id = Number(uri.split("/").pop());
      return !!id;
    })
    .reply(200, () => {
      return data.actors.find((actor) => actor.id === id || {});
    });
};

export default apiMock;
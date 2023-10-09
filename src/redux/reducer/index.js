// Importa las action-types aca
import {
  GET_ALL_ACTORS,
  GET_ACTOR_DETAIL,
  CREATE_ACTOR,
  DELETE_ACTOR,
} from "../actions/action-types"
/*
En este ejercicio tendrás que crear los casos de un reducer para gestionar la información de tu estado global.

📢¡Sigue las instrucciones de los TEST!📢

REQUISITOS
🟢 Crea un caso default, que devuelva el estado global sin cambios.
🟢 Crea un caso en el que, dentro del estado "actors", se guarden todos los actores.
🟢 Crea un caso en el que, dentro del estado "actorDetail", se guarde el detalle de un actor.
🟢 Crea un caso en el que, dentro del estado "actors", se agregue un nuevo actor.
    [PISTA]: puedes utilizar el spread operator.
🟢 Crea un caso en el que, dentro del estado "actors", se elimine aquel actor cuyo ID es igual al recibido.
*/

const initialState = {
  actors: [],
  actorDetail: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ACTORS:
      return { 
        ...state,
        actors : action.payload,
      }
    case GET_ACTOR_DETAIL: 
      return {
        ...state,
        actorDetail : action.payload,
      }
    case CREATE_ACTOR: 
      return {
        ...state,
        actors : [ ...state.actors, action.payload],
      }
    case DELETE_ACTOR:
      return {
        ...state,
        actors: state.actors.filter(
          (actor)=> actor.id !== action.payload
        )
      }
    default:
      return state;
  }
};

export default reducer;

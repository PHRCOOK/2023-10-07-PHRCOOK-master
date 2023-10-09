// Acá importa las action-types que necesitas para trabajar las actions-creators
export const GET_ALL_ACTORS = "GET_ALL_ACTORS";
export const GET_ACTOR_DETAIL = "GET_ACTOR_DETAIL";
export const CREATE_ACTOR = "CREATE_ACTOR";
export const DELETE_ACTOR = "DELETE_ACTOR";

// axios
import axios from "axios";

/* 3️⃣ ***ACTIONS*** 3️⃣ */

// 📢 Puedes utilizar axios si lo deseas, ya se encuentra importado 📢
// 📢 Recuerda RETORNAR las peticiones que hagan tus action-creators 📢
// Ej: return fetch(...) o return axios(...)

// 🟢 getAllActors:
// Esta función debe realizar una petición al Back-End. Luego despachar una action con la data recibida.
// End-Point: 'http://localhost:3001/actors'.
export const getAllActors = () => {
  return (dispatch) => {
    return axios 
      .get('http://localhost:3001/actors')
      .then((response) => {
        dispatch({
          type: GET_ALL_ACTORS,
          payload: response.data
      })
    })
  }
};
// 🟢 getActorDetail:
// Esta función debe hacer una petición al Back-End. Ten en cuenta que tiene que recibir la variable "id" por
// parámetro. Luego despachar una action con la data recibida.
// End-Point: 'http://localhost:3001/actors/:id'.

export const getActorDetail = (id) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3001/actors/${id}`)
    .then((response) => {
      dispatch({
        type: GET_ACTOR_DETAIL,
        payload : response.data,
      })
    })
  }
};

// 🟢 createActor:
// Esta función debe recibir una variable "newActor" por parámetro.
// Luego retornar una action que, en su propiedad payload:
//    - haga un spread operator de la variable newActor, para copiar todo su contenido.
//    - tenga una nueva propiedad "id" igual a la variable de abajo, pero con un incremento +1.
// Descomenta esta variable cuando la necesites.

let id = 6;
export const createActor = (newActor) => {
  return {
    type: "CREATE_ACTOR",
    payload: {
      ...newActor,
      id: id++,
    }
  }
};

// 🟢 deleteActor:
// Esta función debe retornar una action. En su propiedad "payload" guardarás el ID recibido por parámetro.

export const deleteActor = (id) => {
  return {
    type: "DELETE_ACTOR",
    payload : id
  }
};

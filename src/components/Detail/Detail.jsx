import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActorDetail } from "../../redux/actions";
import "./Detail.css";

/* 8️⃣ ***COMPONENTE Detail*** 8️⃣

Implementar el componente Detail. En este ejercicio tendrás que renderizar las diferentes propiedades del actor.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Tendrás que despachar una action con el "id" del actor cuando se monta el componente. Luego, traer esa 
información de tu estado global.
🟢 Tendrás que renderizar algunos datos del actor correspondiente.

IMPORTANTE
❗Este componente debe ser FUNCIONAL.
❗Para obtener el "id" puedes utilizar useParams pero no puedes usar destructuring.
      ❗ Recuerda los casos de uso del optional chaining 👀
❗No hacer un destructuring de los hooks de React, debes utilizarlos con la siguiente forma:
      - 'React.useState' 
      - 'React.useEffect'
❗NO elimines las etiquetas ni sus atributos ya que si lo haces, no funcionarán los tests.
*/

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;
  const actor = useSelector((state) => state.actorDetail);

  React.useEffect(() => {
    if (id) {
      dispatch(getActorDetail(id))
    }
  }, []);

  if (!actor) {
    return <div>Cargando...</div>
  }

  return (
     <div data-testid="Detail" className="detail-container"> 
      <img src={actor.image} alt={actor.name} className="actor-image" /> 
      <h1 className="actor-name">{actor.name}</h1>
      <h2 className="actor-age">{actor.age}</h2>
      <h3 className="actor-movies">{actor.movies}</h3> 
      <h5 className="actor-summary">{actor.summary}</h5> 
    </div>
  );
};
export default Detail
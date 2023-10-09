import { Link } from "react-router-dom";
import { deleteActor } from "../../redux/actions";
import { useDispatch } from "react-redux";

/* 7️⃣ *** COMPONENTE Card *** 7️⃣

Implementar el componente Card.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Tendrás que renderizar una serie de etiquetas HTML que incluyan texto y propiedades.
🟢 Tendrás que despachar una action para eliminar un actor específico.

IMPORTANTE
❗Este componente debe ser FUNCIONAL.
❗NO elimines las etiquetas ni sus atributos ya que si lo haces, no funcionarán los tests.
*/

const Card = ({ id, name, image, movies, age }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteActor (id))
  }
  return (
    <div className="Card" data-testid="Card">
    <h2 className="actor-name">{name}</h2>
    <button className="delete-button" onClick={handleDelete}>X</button>
    <Link to={`/actors/${id}`}>
      <img className="actor-image" src={image} alt={name} />
    </Link>
    <p className="actor-age">{age}</p>
  </div>
  );
};

export default Card;

import { Link } from "react-router-dom";
import "./Nav.css"

/* 2️⃣ ***COMPONENTE NAV*** 2️⃣
Implementar el componente Nav. En este ejercicio tendrás que asociar dos etiquetas <Link to='' /> a 
distintos elementos.

REQUISITOS
🟢 El primer <Link> debe dirigir a "/" con el texto "Home".
🟢 El segundo <Link> debe dirigir a "/create" con el texto "Create".

IMPORTANTE
❗Este componente debe ser FUNCIONAL.
❗NO elimines las etiquetas ni sus atributos ya que si lo haces, no funcionarán los tests.
*/

const Nav = () => {
  return (
    <div className="nav-container" data-testid="Nav">
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
    </div>
  );
};

export default Nav;
import React from "react";
import { useDispatch } from "react-redux";
import { createActor } from "../../redux/actions";
import "./Create.css";

/* 6️⃣ *** COMPONENTE Create *** 6️⃣

Implementar el componente Create. Este consistirá en un formulario controlado con estados de React.
📢¡Sigue las instrucciones de los TEST!📢

REQUISITOS
🟢 Aquí tendrás que renderizar una serie de elementos HTML con distintos atibutos e información dentro.
🟢 Debes manejar cada uno de los inputs de tu formulario mediante un estado local llamado "input".
🟢 La información del formulario se debe despachar al estado global cuando se hace un submit.
🟢 Debes manejar los errores que pueden tener los inputs del formulario.

IMPORTANTE   
❗Este componente debe ser FUNCIONAL.
❗¡Puedes implementar el manejo de errores como mejor prefieras! Sólo recuerda renderizar el error apropiado en cada caso.
❗NO hacer un destructuring de los hooks de React, debes utilizarlos con la siguiente forma:
      - 'React.useState'
      - 'React.useEffect'
❗NO elimines las etiquetas ni sus atributos ya que si lo haces, no funcionarán los tests.
*/

const Create = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({});
  const [input, setInput] = React.useState({
    name: "",
    summary: "",
    age: "",
    image: "",
    movies: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!input.name || input.name.length < 5) {
      newErrors.name = "The name must be five characters long";
    }
    if (input.name.length >= 20) {
      newErrors.name = "The name must be less than twenty characters long";
    }

    if (!/^[a-zA-Z\s]+$/.test(input.movies) || input.movies.length < 5) {
      newErrors.movies = "The movies must be five characters long";
    }

    if (!/^\d{2}$/.test(input.age)) {
      newErrors.age = "The age must be two digits";
    }
    if (!/^\d+$/.test(input.age)) {
      newErrors.age = "Only numbers";
    }

    if (!input.summary || input.summary.length < 50) {
      newErrors.summary = "The summary must be fifty characters long";
    }

    if (!/^https?:\/\/\S+$/.test(input.image)) {
      newErrors.image = "The image must be a URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    isValid && dispatch(createActor(input));
  };

  return (
    <form className="form" data-testid="Create" onSubmit={handleSubmit}>
      <label className="label" htmlFor="name">
        Name:
      </label>
      <input
        className="input"
        type="text"
        name="name"
        value={input.name}
        onChange={handleInputChange}
      />
      {errors.name && <span>{errors.name}</span>}
      <label className="label" htmlFor="movies">
        Movies:
      </label>
      <input
        className="input"
        type="text"
        name="movies"
        value={input.movies}
        onChange={handleInputChange}
      />
      {errors.movies && <span>{errors.movies}</span>}
      <label className="label" htmlFor="age">
        Age:
      </label>
      <input
        className="input"
        type="text"
        name="age"
        value={input.age}
        onChange={handleInputChange}
      />
      {errors.age && <span>{errors.age}</span>}
      <label className="label" htmlFor="image">
        Image:
      </label>
      <input
        className="input"
        type="text"
        name="image"
        value={input.image}
        onChange={handleInputChange}
      />
      {errors.image && <span>{errors.image}</span>}
      <label htmlFor="summary">Summary:</label>
      <input
        className="input"
        type="text"
        name="summary"
        value={input.summary}
        onChange={handleInputChange}
      />
      {errors.summary && <span>{errors.summary}</span>}
      <button className="button" type="submit">
        Create
      </button>
    </form>
  );
};

export default Create;

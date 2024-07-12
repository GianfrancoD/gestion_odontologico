import { useState } from "react";
import { ServicesAll } from "../services/servicespost";
//import { handleTarget } from "../helpers/formhelper";
import useTarget from "../helpers/formhelper";

export const Formulario = () => {
  /**const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
  });*/
  const [mensaje, setMensaje] = useState("");
  const [usuarioexiste, setUsuarioExiste] = useState(false);
  const [target, setTarget] = useTarget({ nombre: "", apellido: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(target);

    /**
     * Endpoint: va la direccion del endpoint del a base de datos
     * Id: es numerico se refiere a parametros usando metodos PUT o DELETE
     * Data: es la informacion del formulario que tengas guardado en algun array
     * Method: es la solicitud HTTP [GET, POST, PUT, DELETE]
     */
    ServicesAll("create", undefined, target, "post")
      .then((response) => {
        console.log(response.data);
        setMensaje("Usuario Creado con exito");
        setUsuarioExiste(true);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.message === "El usuario ya existe") {
          setUsuarioExiste(true);
          setMensaje("");
        } else {
          setUsuarioExiste(false);
          setMensaje("Error al crear el usuario");
        }
      });
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          value={target.nombre}
          pattern="[a-zA-Z]+"
          placeholder="nombre"
          onChange={setTarget}
          name="nombre"
          required
        />
        <label></label>
        <input
          type="text"
          value={target.apellido}
          pattern="[a-zA-Z]+"
          placeholder="apellido"
          onChange={setTarget}
          name="apellido"
          required
        />
        <button>Enviar</button>
      </form>
      {mensaje ? (
        <p style={{ color: "green" }}>{mensaje}</p>
      ) : usuarioexiste ? (
        <p style={{ color: "red" }}>El usuario ya existe</p>
      ) : (
        <p></p>
      )}
    </>
  );
};

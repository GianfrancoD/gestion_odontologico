import useServicesAll from "../services/servicespost";
import useTarget from "../helpers/formhelper";

export const Formulario = () => {
  const [target, setTarget] = useTarget({ nombre: "", apellido: "" });
  const { ServicesAll, mensaje, usuarioexiste } = useServicesAll();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(target);

    /**
     * @param Endpoint: va la direccion del endpoint del a base de datos
     * @param Id: es numerico se refiere a parametros usando metodos PUT o DELETE
     * @param Data: es la informacion del formulario que tengas guardado en algun array
     * @param Method: es la solicitud HTTP [GET, POST, PUT, DELETE]
     */
    ServicesAll("create", undefined, target, "post");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <p style={{ color: "red" }}>{usuarioexiste}</p>
      ) : (
        <p></p>
      )}
    </>
  );
};

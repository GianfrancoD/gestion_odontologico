import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const useServicesAll = () => {
  const [mensaje, setMensaje] = useState("");
  const [usuarioexiste, setUsuarioExiste] = useState(false);

  const ServicesAll = (endpoint, id, data, method) => {
    let url = `${VITE_API_URL}/${endpoint}`;
    if (id) {
      url += `/${id}`;
    }

    return axios[method](url, data, {
      headers: {
        "content-type": "application/json",
        mode: "no-cache",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setMensaje(response.data.message);
        setUsuarioExiste(true);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.message) {
          setUsuarioExiste(true);
          setMensaje(error.response.data.message);
        } else {
          setUsuarioExiste(false);
          setMensaje("Error al crear el usuario ⚠️");
        }
      });
  };

  return { ServicesAll, mensaje, usuarioexiste };
};

export default useServicesAll;

useServicesAll.prototype = {
  method: PropTypes.oneOf(["get", "post", "put", "delete"]).isRequired,
  id: PropTypes.number,
  data: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
};

import Perfil from "./componets/Perfil";
import ReposList from "./componets/RepoList";
import { useState } from "react";

function App() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  return (
    <>
      <div className="usuarioEntrada">
        <label>Insira o usuário do Github: </label>
        <input type="text" onBlur={(e) => setNomeUsuario(e.target.value)} />
      </div>

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}
    </>
  );
}

export default App;

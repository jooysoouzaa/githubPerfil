import { useEffect, useState } from "react";
import styles from "./RepoList.module.css";

const ReposList = ({ nomeUsuario }) => {
  const [repos, setRepos] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setEstaCarregando(true);
    setErro(null); // Reseta o erro ao buscar novamente
    fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Usuário não encontrado");
        }
        return res.json();
      })
      .then((resJson) => {
        setTimeout(() => {
          setEstaCarregando(false);
          setRepos(resJson);
        }, 3000);
      })
      .catch((err) => {
        setEstaCarregando(false);
        setErro(err.message);
      });
  }, [nomeUsuario]);

  return (
    <div className="container">
      {estaCarregando ? (
        <h1>Carregando...</h1>
      ) : erro ? (
        <h1>{erro}</h1>
      ) : (
        <ul className={styles.list}>
          {repos.map((repositorio) => (
            <li className={styles.listItem} key={repositorio.id}>
              <div className={styles.itemName}>
                <b>Nome:</b> {repositorio.name}
              </div>

              <div className={styles.itemLanguage}>
                <b>Linguagem:</b> {repositorio.language}
              </div>

              <a
                className={styles.itemLink}
                target="_blank"
                rel="noopener noreferrer"
                href={repositorio.html_url}
              >
                Visitar no Github
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReposList;



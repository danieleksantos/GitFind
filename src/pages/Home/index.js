import { useState } from "react";
import { Header } from "../../components/Header";
import background from "../../assets/background.png"
import "./styles.css";
import ItemList from "../../components/ItemList";
import { wait } from "@testing-library/user-event/dist/utils";

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return <div className="App">
    <Header />
    <div className="content">
      <img src={background} className="background" alt="background app" />
      <div className="informations">
        <div>

          <input
            name="usuario" value={user} onChange={event => setUser(event.target.value)}
            placeholder="username" />
          <button onClick={handleGetData} >Buscar</button>
        </div>

        {currentUser?.name ? (
          <>
            <div className="profile">
              <img src={currentUser.avatar_url} alt="foto perfil" className="profile-photo" />
              <div className="profile-info">
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr />
          </>
        ) : (null)}

        {repos?.length ? (
          <div className="repository">
            <h4 className="repository-title">Repositórios</h4>
            {repos.map(repo => (
              <ItemList title={repo.name} description={repo.description} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  </div>;
}

export default App;


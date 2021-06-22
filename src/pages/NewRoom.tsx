import { Link } from 'react-router-dom';

import { Button } from '../components/Button';
import { AsideIllustration } from '../components/AsideIllustration';
// import { useAuth } from '../hooks/useAuth;

import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss'

export function NewRoom() {
  // const { user } = useAuth();

  return (
    <div id="page-auth">
      <AsideIllustration />
      <main>
        <div className="main-content">
          <img src={ logoImg } alt="Letmeask"/>
          <h2>Criar uma nova sala</h2>
          <form>
            <input type="text" placeholder="Digite o nome da sala" />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/#">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}
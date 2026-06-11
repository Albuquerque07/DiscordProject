import { getUsuarios } from './actions';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioTable from '../components/UsuarioTable';

export default async function Home() {
  const usuarios = await getUsuarios();

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gerenciamento de Usuários</h1>

      <UsuarioForm />
      <UsuarioTable usuarios={usuarios} />
    </main>
  );
}

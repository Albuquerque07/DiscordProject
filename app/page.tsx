import { getUsuarios } from './actions';
import Sidebar from '../components/Sidebar';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioTable from '../components/UsuarioTable';

export default async function Home() {
  const usuarios = await getUsuarios();

  return (
    <main className="p-10 max-w-6xl mx-auto flex gap-6">
      <Sidebar />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Gerenciamento de Usuários</h1>

        <UsuarioForm />
        <UsuarioTable usuarios={usuarios} />
      </div>
    </main>
  );
}

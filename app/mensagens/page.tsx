import { getUsuarios, getContatos } from '../actions';
import Sidebar from '../../components/Sidebar';
import ContatoForm from '../../components/ContatoForm';
import ContatoTable from '../../components/ContatoTable';

export default async function Mensagens() {
  const usuarios = await getUsuarios();
  const contatos = await getContatos();

  return (
    <main className="p-10 max-w-6xl mx-auto flex gap-6">
      <Sidebar />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Caixa de Mensagens</h1>

        <ContatoForm usuarios={usuarios} />
        <ContatoTable contatos={contatos} usuarios={usuarios} />
      </div>
    </main>
  );
}

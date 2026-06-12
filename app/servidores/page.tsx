import Sidebar from '../../components/Sidebar';
import ServidorForm from '../../components/ServidorForm';
import ServidorSeletor from '../../components/ServidorSeletor';
import ServidorMensagensTable from '../../components/ServidorMensagensTable';
import MensagemForm from '../../components/MensagemForm';
import CanalSeletor from '../../components/CanalSeletor';
import CanalForm from '../../components/CanalForm';
import CategoriaForm from '../../components/CategoriaForm';
import CategoriaList from '../../components/CategoriaList';
import CanalList from '../../components/CanalList';
import ParticipaForm from '../../components/ParticipaForm';
import ServidorList from '../../components/ServidorList';
import {
  getServidores,
  getCanaisPorServidor,
  getCategoriaPorServidor,
  getMensagensComUsuario,
  getUsuariosPorServidor,
  getUsuariosForaDoServidor,
} from '../actions';

export default async function Servidores({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;

  const servidores = await getServidores();

  const servidorId = params.serverId
    ? parseInt(params.serverId as string)
    : servidores[0]?.idServer;

  const [canais, categorias, usuarios, usuariosForaDoServidor] = servidorId
    ? await Promise.all([
        getCanaisPorServidor(servidorId),
        getCategoriaPorServidor(servidorId),
        getUsuariosPorServidor(servidorId),
        getUsuariosForaDoServidor(servidorId),
      ])
    : [[], [], [], []];

  const primeiroCanal = canais.find(c => c.tipoCanal === 'texto') ?? canais[0];

  const canalId = params.canalId
    ? parseInt(params.canalId as string)
    : primeiroCanal?.idCanal;

  const canalAtivo = canais.find(c => c.idCanal === canalId);
  const mensagens = canalId ? await getMensagensComUsuario(canalId) : [];

  return (
    <main className="p-10 max-w-6xl mx-auto flex gap-6">
      <Sidebar />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Servidores</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Navegação</h2>
          <ServidorSeletor servidores={servidores} servidorIdAtivo={servidorId} />
          <CanalSeletor canais={canais} servidorId={servidorId} canalIdAtivo={canalId} />
          <ServidorMensagensTable mensagens={mensagens} nomeCanal={canalAtivo?.nomeCanal} />
          <MensagemForm usuarios={usuarios} canalId={canalId} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Gerenciamento</h2>
          <ServidorForm />
          <ServidorList servidores={servidores} />
          <ParticipaForm usuarios={usuariosForaDoServidor} servidorId={servidorId} />
          <CategoriaForm servidorId={servidorId} />
          <CategoriaList categorias={categorias} />
          <CanalForm categorias={categorias} servidorId={servidorId} />
          <CanalList canais={canais} />
        </section>
      </div>
    </main>
  );
}

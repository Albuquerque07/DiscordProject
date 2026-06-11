import Sidebar from '../../components/Sidebar';

export default function Mensagens() {
  return (
    <main className="p-10 max-w-6xl mx-auto flex gap-6">
      <Sidebar />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Caixa de Mensagens</h1>

        {/* CRUD de mensagens diretas entre usuarios (contatoDireto) */}
      </div>
    </main>
  );
}

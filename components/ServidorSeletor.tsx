import { servidor } from '../app/db/schema';

type Servidor = typeof servidor.$inferSelect;

export default function ServidorSeletor({
  servidores,
  servidorIdAtivo,
}: {
  servidores: Servidor[];
  servidorIdAtivo: number | undefined;
}) {
  return (
    <form method="GET" className="mb-6 flex gap-4 items-center bg-gray-100 p-4 rounded-lg">
      <label className="font-semibold text-gray-700 whitespace-nowrap">Servidor:</label>
      <select name="serverId" defaultValue={servidorIdAtivo} className="border p-2 rounded flex-1">
        {servidores.length === 0 && <option value="">Nenhum servidor cadastrado</option>}
        {servidores.map(s => (
          <option key={s.idServer} value={s.idServer}>{s.nomeServer}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Acessar
      </button>
    </form>
  );
}

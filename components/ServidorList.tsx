import { servidor } from '../app/db/schema';
import { deleteServidor } from '../app/actions';

type Servidor = typeof servidor.$inferSelect;

export default function ServidorList({ servidores }: { servidores: Servidor[] }) {
  if (servidores.length === 0) return null;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-4">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nome</th>
            <th className="p-3">Nível de Impulso</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {servidores.map(s => (
            <tr key={s.idServer} className="border-b">
              <td className="p-3">{s.idServer}</td>
              <td className="p-3">{s.nomeServer}</td>
              <td className="p-3">{s.nivelImpulso}</td>
              <td className="p-3">
                <form action={async () => {
                  'use server';
                  await deleteServidor(s.idServer);
                }}>
                  <button className="text-red-600 font-bold hover:underline">Excluir</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

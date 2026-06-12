import { deleteCanal } from '../app/actions';

type Canal = { idCanal: number; nomeCanal: string; tipoCanal: string };

export default function CanalList({ canais }: { canais: Canal[] }) {
  if (canais.length === 0) return null;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-4">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nome</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {canais.map(c => (
            <tr key={c.idCanal} className="border-b">
              <td className="p-3">{c.idCanal}</td>
              <td className="p-3">{c.tipoCanal === 'texto' ? '# ' : '[voz] '}{c.nomeCanal}</td>
              <td className="p-3">{c.tipoCanal}</td>
              <td className="p-3">
                <form action={async () => {
                  'use server';
                  await deleteCanal(c.idCanal);
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

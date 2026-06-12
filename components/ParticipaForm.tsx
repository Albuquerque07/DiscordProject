import { addParticipa } from '../app/actions';

type Usuario = { idUser: number; apelidoUser: string };

export default function ParticipaForm({
  usuarios,
  servidorId,
}: {
  usuarios: Usuario[];
  servidorId: number | undefined;
}) {
  if (!servidorId) return null;

  if (usuarios.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 bg-gray-100 p-4 rounded-lg">
        Todos os usuários já participam deste servidor.
      </p>
    );
  }

  return (
    <form action={addParticipa} className="mt-4 flex gap-4 bg-gray-100 p-4 rounded-lg">
      <input type="hidden" name="idServer" value={servidorId} />
      <select name="idUser" className="border p-2 rounded flex-1" required>
        {usuarios.map(u => (
          <option key={u.idUser} value={u.idUser}>{u.apelidoUser}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap">
        Adicionar ao Servidor
      </button>
    </form>
  );
}

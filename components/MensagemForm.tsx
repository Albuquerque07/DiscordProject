import { addMensagem } from '../app/actions';

type Usuario = { idUser: number; apelidoUser: string };

export default function MensagemForm({
  usuarios,
  canalId,
}: {
  usuarios: Usuario[];
  canalId: number | undefined;
}) {
  if (!canalId || usuarios.length === 0) return null;

  return (
    <form action={addMensagem} className="mb-6 flex gap-4 bg-gray-100 p-4 rounded-lg">
      <input type="hidden" name="idCanal" value={canalId} />
      <select name="idUser" className="border p-2 rounded w-40" required>
        {usuarios.map(u => (
          <option key={u.idUser} value={u.idUser}>{u.apelidoUser}</option>
        ))}
      </select>
      <input
        type="text"
        name="conteudo"
        placeholder="Escreva uma mensagem..."
        className="border p-2 rounded flex-1"
        required
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 whitespace-nowrap">
        Enviar
      </button>
    </form>
  );
}

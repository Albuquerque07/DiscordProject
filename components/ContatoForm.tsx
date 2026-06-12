import { addContato } from '../app/actions';
import { usuario } from '../app/db/schema';

type Usuario = typeof usuario.$inferSelect;

export default function ContatoForm({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <form action={addContato} className="mb-8 flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
      <div className="flex gap-4">
        <select name="remetente" className="border p-2 rounded w-full" required>
          <option value="">Remetente</option>
          {usuarios.map((u) => (
            <option key={u.idUser} value={u.idUser}>{u.apelidoUser}</option>
          ))}
        </select>

        <select name="destinatario" className="border p-2 rounded w-full" required>
          <option value="">Destinatário</option>
          {usuarios.map((u) => (
            <option key={u.idUser} value={u.idUser}>{u.apelidoUser}</option>
          ))}
        </select>
      </div>

      <input type="text" name="apelido" placeholder="Apelido (opcional)" className="border p-2 rounded w-full" />

      <textarea name="conteudo" placeholder="Mensagem" className="border p-2 rounded w-full" required />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-start">
        Enviar
      </button>
    </form>
  );
}

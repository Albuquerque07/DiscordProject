import { usuario } from '../app/db/schema';
import { deleteUsuario, updateUsuario } from '../app/actions';

type Usuario = typeof usuario.$inferSelect;

export default function UsuarioTable({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Apelido</th>
            <th className="p-3">E-mail</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.idUser} className="border-b">
              <td className="p-3">{u.idUser}</td>
              <td className="p-3">
                <input type="text" name="apelido" form={`editar-${u.idUser}`} defaultValue={u.apelidoUser} className="border p-1 rounded w-full" />
              </td>
              <td className="p-3">{u.emailUser}</td>
              <td className="p-3">
                <select name="status" form={`editar-${u.idUser}`} defaultValue={u.statusUser} className="border p-1 rounded">
                  <option value="online">online</option>
                  <option value="ausente">ausente</option>
                  <option value="ocupado">ocupado</option>
                  <option value="offline">offline</option>
                </select>
              </td>
              <td className="p-3">
                <div className="flex gap-3 items-center">
                  <form id={`editar-${u.idUser}`} action={async (formData: FormData) => {
                    'use server';
                    await updateUsuario(u.idUser, formData);
                  }}>
                    <button className="text-blue-600 font-bold hover:underline">Salvar</button>
                  </form>

                  <form action={async () => {
                    'use server';
                    await deleteUsuario(u.idUser);
                  }}>
                    <button className="text-red-600 font-bold hover:underline">Excluir</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

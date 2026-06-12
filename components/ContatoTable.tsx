import { contatoDireto, usuario } from '../app/db/schema';
import { deleteContato } from '../app/actions';

type Contato = typeof contatoDireto.$inferSelect;
type Usuario = typeof usuario.$inferSelect;

export default function ContatoTable({ contatos, usuarios }: { contatos: Contato[]; usuarios: Usuario[] }) {
  const nomeUsuario = (id: number) => usuarios.find((u) => u.idUser === id)?.apelidoUser ?? `#${id}`;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Remetente</th>
            <th className="p-3">Destinatário</th>
            <th className="p-3">Mensagem</th>
            <th className="p-3">Apelido</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {contatos.map((c) => (
            <tr key={c.idContato} className="border-b">
              <td className="p-3">{nomeUsuario(c.idUserRemetente)}</td>
              <td className="p-3">{nomeUsuario(c.idUserDestinatario)}</td>
              <td className="p-3">{c.conteudoContato}</td>
              <td className="p-3">{c.apelidoContato}</td>
              <td className="p-3">
                <form action={async () => {
                  'use server';
                  await deleteContato(c.idContato);
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

import { getUsuarios, addUsuario, deleteUsuario } from './actions';

export default async function Home() {
  const usuarios = await getUsuarios();

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gerenciamento de Usuários</h1>

      {/* Formulário CREATE */}
      <form action={addUsuario} className="mb-8 flex gap-4 bg-gray-100 p-4 rounded-lg">
        <input type="text" name="apelido" placeholder="Apelido" className="border p-2 rounded w-full" required />
        <input type="email" name="email" placeholder="E-mail" className="border p-2 rounded w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Adicionar
        </button>
      </form>

      {/* Tabela READ & DELETE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Apelido</th>
              <th className="p-3">E-mail</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.idUser} className="border-b">
                <td className="p-3">{u.idUser}</td>
                <td className="p-3">{u.apelidoUser}</td>
                <td className="p-3">{u.emailUser}</td>
                <td className="p-3">
                  <form action={async () => {
                    'use server';
                    await deleteUsuario(u.idUser);
                  }}>
                    <button className="text-red-600 font-bold hover:underline">Excluir</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
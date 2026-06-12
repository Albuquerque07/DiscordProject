import { deleteCategoria } from '../app/actions';

type Categoria = { idCategoria: number; nomeCategoria: string };

export default function CategoriaList({ categorias }: { categorias: Categoria[] }) {
  if (categorias.length === 0) return null;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-4">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nome</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c.idCategoria} className="border-b">
              <td className="p-3">{c.idCategoria}</td>
              <td className="p-3">{c.nomeCategoria}</td>
              <td className="p-3">
                <form action={async () => {
                  'use server';
                  await deleteCategoria(c.idCategoria);
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

import { addCategoria } from '../app/actions';

export default function CategoriaForm({ servidorId }: { servidorId: number | undefined }) {
  if (!servidorId) return null;

  return (
    <form action={addCategoria} className="mt-4 flex gap-4 bg-gray-100 p-4 rounded-lg">
      <input type="hidden" name="idServer" value={servidorId} />
      <input
        type="text"
        name="nome"
        placeholder="Nome da categoria"
        className="border p-2 rounded flex-1"
        required
      />
      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 whitespace-nowrap">
        Adicionar Categoria
      </button>
    </form>
  );
}

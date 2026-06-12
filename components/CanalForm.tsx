import { addCanal } from '../app/actions';

type Categoria = { idCategoria: number; nomeCategoria: string };

export default function CanalForm({
  categorias,
  servidorId,
}: {
  categorias: Categoria[];
  servidorId: number | undefined;
}) {
  if (!servidorId) return null;

  if (categorias.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 bg-gray-100 p-4 rounded-lg">
        Nenhuma categoria neste servidor. Crie uma categoria antes de adicionar canais.
      </p>
    );
  }

  return (
    <form action={addCanal} className="mt-4 flex gap-4 bg-gray-100 p-4 rounded-lg">
      <input
        type="text"
        name="nome"
        placeholder="Nome do canal"
        className="border p-2 rounded flex-1"
        required
      />
      <select name="tipo" className="border p-2 rounded">
        <option value="texto">Texto</option>
        <option value="voz">Voz</option>
      </select>
      <select name="idCategoria" className="border p-2 rounded">
        {categorias.map(c => (
          <option key={c.idCategoria} value={c.idCategoria}>{c.nomeCategoria}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 whitespace-nowrap">
        Adicionar Canal
      </button>
    </form>
  );
}

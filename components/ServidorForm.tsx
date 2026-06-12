import { addServidor } from '../app/actions';

export default function ServidorForm() {
  return (
    <form action={addServidor} className="mb-6 flex gap-4 bg-gray-100 p-4 rounded-lg">
      <input
        type="text"
        name="nome"
        placeholder="Nome do servidor"
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="number"
        name="impulso"
        placeholder="Nível de impulso"
        defaultValue={0}
        min={0}
        className="border p-2 rounded w-32"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap">
        Adicionar
      </button>
    </form>
  );
}

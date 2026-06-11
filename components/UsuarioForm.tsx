import { addUsuario } from '../app/actions';

export default function UsuarioForm() {
  return (
    <form action={addUsuario} className="mb-8 flex gap-4 bg-gray-100 p-4 rounded-lg">
      <input type="text" name="apelido" placeholder="Apelido" className="border p-2 rounded w-full" required />
      <input type="email" name="email" placeholder="E-mail" className="border p-2 rounded w-full" required />
      <input type="password" name="senha" placeholder="Senha" className="border p-2 rounded w-full" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Adicionar
      </button>
    </form>
  );
}

import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="w-56 bg-gray-800 text-white p-4 rounded-lg flex flex-col gap-3 h-fit">
      <Link href="/" className="hover:underline">
        Gerenciamento de Usuários
      </Link>
      <Link href="/mensagens" className="hover:underline">
        Caixa de Mensagens
      </Link>
      <Link href="/servidores" className="hover:underline">
        Servidores
      </Link>
    </nav>
  );
}

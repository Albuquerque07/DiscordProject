import { deleteMensagem } from '../app/actions';

type MensagemRow = {
  idMsg: number;
  conteudoMsg: string;
  horarioMsg: Date;
  apelidoUser: string;
};

export default function ServidorMensagensTable({
  mensagens,
  nomeCanal,
}: {
  mensagens: MensagemRow[];
  nomeCanal: string | undefined;
}) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
      <div className="bg-gray-800 text-white p-3 font-semibold">
        {nomeCanal ? `# ${nomeCanal}` : 'Selecione um servidor para ver as mensagens'}
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 w-36">Usuário</th>
            <th className="p-3">Mensagem</th>
            <th className="p-3 w-44">Horário</th>
            <th className="p-3 w-20">Ações</th>
          </tr>
        </thead>
        <tbody>
          {mensagens.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                {nomeCanal ? 'Nenhuma mensagem neste canal.' : 'Nenhum canal de texto disponível.'}
              </td>
            </tr>
          ) : (
            mensagens.map(m => (
              <tr key={m.idMsg} className="border-b">
                <td className="p-3 font-semibold text-gray-800">{m.apelidoUser}</td>
                <td className="p-3 text-gray-700">{m.conteudoMsg}</td>
                <td className="p-3 text-sm text-gray-500">
                  {new Date(m.horarioMsg).toLocaleString('pt-BR')}
                </td>
                <td className="p-3">
                  <form action={async () => {
                    'use server';
                    await deleteMensagem(m.idMsg);
                  }}>
                    <button className="text-red-600 font-bold hover:underline">Excluir</button>
                  </form>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

'use client'

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

type Canal = {
  idCanal: number;
  nomeCanal: string;
  tipoCanal: string;
};

export default function CanalSeletor({
  canais,
  servidorId,
  canalIdAtivo,
}: {
  canais: Canal[];
  servidorId: number | undefined;
  canalIdAtivo: number | undefined;
}) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

  if (canais.length === 0) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const select = form.elements.namedItem('canalId') as HTMLSelectElement;
    const canalId = parseInt(select.value);
    const canal = canais.find(c => c.idCanal === canalId);

    if (canal?.tipoCanal === 'voz') {
      audioRef.current?.play();
    }

    const params = new URLSearchParams();
    if (servidorId) params.set('serverId', String(servidorId));
    params.set('canalId', String(canalId));
    router.push(`/servidores?${params.toString()}`);
  }

  return (
    <>
      <audio ref={audioRef} src="/discord-join.mp3" preload="auto" />
      <form onSubmit={handleSubmit} className="flex gap-4 items-center bg-gray-100 p-4 rounded-lg">
        <label className="font-semibold text-gray-700 whitespace-nowrap">Canal:</label>
        <select name="canalId" defaultValue={canalIdAtivo} className="border p-2 rounded flex-1">
          {canais.map(c => (
            <option key={c.idCanal} value={c.idCanal}>
              {c.tipoCanal === 'texto' ? '# ' : '[voz] '}{c.nomeCanal}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Entrar
        </button>
      </form>
    </>
  );
}

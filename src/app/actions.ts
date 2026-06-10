'use server'

import { db } from '@/db';
import { usuario, servidor, canal, mensagem } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// ==========================================
// CRUD: USUÁRIOS
// ==========================================

export async function getUsuarios() {
  return await db.select().from(usuario).orderBy(desc(usuario.idUser));
}

export async function addUsuario(formData: FormData) {
  const apelido = formData.get('apelido') as string;
  const email = formData.get('email') as string;
  const senha = formData.get('senha') as string; // Em dev/prod, precisa de hash (ex: bcrypt)
  const temNitro = formData.get('temNitro') === 'true';
  const status = formData.get('status') as string || 'online';

  await db.insert(usuario).values({
    apelidoUser: apelido,
    emailUser: email,
    senhaUser: senha,
    statusUser: status,
    temNitro: temNitro,
  });
  
  revalidatePath('/');
}

export async function updateUsuario(id: number, formData: FormData) {
  const apelido = formData.get('apelido') as string;
  const status = formData.get('status') as string;

  await db.update(usuario)
    .set({ apelidoUser: apelido, statusUser: status })
    .where(eq(usuario.idUser, id));
    
  revalidatePath('/');
}

export async function deleteUsuario(id: number) {
  await db.delete(usuario).where(eq(usuario.idUser, id));
  revalidatePath('/');
}

// ==========================================
// CRUD: SERVIDORES
// ==========================================

export async function getServidores() {
  return await db.select().from(servidor).orderBy(desc(servidor.idServer));
}

export async function addServidor(formData: FormData) {
  const nome = formData.get('nome') as string;
  const nivelImpulso = parseInt(formData.get('impulso') as string) || 0;

  await db.insert(servidor).values({
    nomeServer: nome,
    nivelImpulso: nivelImpulso,
  });
  
  revalidatePath('/servidores');
}

export async function deleteServidor(id: number) {
  await db.delete(servidor).where(eq(servidor.idServer, id));
  revalidatePath('/servidores');
}

// ==========================================
// CRUD: CANAIS
// ==========================================

export async function getCanais() {
  return await db.select().from(canal);
}

export async function addCanal(formData: FormData) {
  const nome = formData.get('nome') as string;
  const tipo = formData.get('tipo') as string; // 'texto', 'voz', etc.
  const idCategoria = parseInt(formData.get('idCategoria') as string);
  const isPrivado = formData.get('privado') === 'true';

  await db.insert(canal).values({
    nomeCanal: nome,
    tipoCanal: tipo,
    idCategoria: idCategoria,
    canalEPriv: isPrivado
  });
  
  revalidatePath('/canais');
}

// ==========================================
// CRUD: MENSAGENS
// ==========================================

// Retorna mensagens de um canal específico
export async function getMensagensPorCanal(idCanal: number) {
  return await db.select()
    .from(mensagem)
    .where(eq(mensagem.idCanal, idCanal))
    .orderBy(desc(mensagem.horarioMsg));
}

export async function addMensagem(formData: FormData) {
  const conteudo = formData.get('conteudo') as string;
  const idCanal = parseInt(formData.get('idCanal') as string);
  const idUser = parseInt(formData.get('idUser') as string);

  await db.insert(mensagem).values({
    conteudoMsg: conteudo,
    idCanal: idCanal,
    idUser: idUser,
  });
  
  revalidatePath(`/canal/${idCanal}`); // Revalida a página específica do canal
}

export async function deleteMensagem(id: number) {
  await db.delete(mensagem).where(eq(mensagem.idMsg, id));
  revalidatePath('/'); 
}
'use server'

import { db } from './db';
import { usuario, servidor, canal, mensagem, contatoDireto, categoria, participa } from './db/schema';
import { eq, desc, and, isNull } from 'drizzle-orm';
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

export async function deleteCategoria(id: number) {
  await db.delete(categoria).where(eq(categoria.idCategoria, id));
  revalidatePath('/servidores');
}

export async function deleteCanal(id: number) {
  await db.delete(canal).where(eq(canal.idCanal, id));
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
  
  revalidatePath('/servidores');
}

export async function addCategoria(formData: FormData) {
  const nome = formData.get('nome') as string;
  const idServer = parseInt(formData.get('idServer') as string);

  await db.insert(categoria).values({
    nomeCategoria: nome,
    idServer: idServer,
  });

  revalidatePath('/servidores');
}

export async function getCategoriaPorServidor(idServer: number) {
  return await db.select({
    idCategoria: categoria.idCategoria,
    nomeCategoria: categoria.nomeCategoria,
  })
  .from(categoria)
  .where(eq(categoria.idServer, idServer));
}

export async function getUsuariosPorServidor(idServer: number) {
  return await db.select({
    idUser: usuario.idUser,
    apelidoUser: usuario.apelidoUser,
  })
  .from(usuario)
  .innerJoin(participa, eq(usuario.idUser, participa.idUser))
  .where(eq(participa.idServer, idServer));
}

export async function getUsuariosForaDoServidor(idServer: number) {
  return await db.select({
    idUser: usuario.idUser,
    apelidoUser: usuario.apelidoUser,
  })
  .from(usuario)
  .leftJoin(
    participa,
    and(eq(participa.idUser, usuario.idUser), eq(participa.idServer, idServer))
  )
  .where(isNull(participa.idServer));
}

export async function addParticipa(formData: FormData) {
  const idServer = parseInt(formData.get('idServer') as string);
  const idUser = parseInt(formData.get('idUser') as string);

  try {
    await db.insert(participa).values({ idServer, idUser });
  } catch {
    // Usuário já participa do servidor (violação de PK composta)
    return;
  }

  revalidatePath('/servidores');
}

export async function getCanaisPorServidor(idServer: number) {
  return await db.select({
    idCanal: canal.idCanal,
    nomeCanal: canal.nomeCanal,
    tipoCanal: canal.tipoCanal,
  })
  .from(canal)
  .innerJoin(categoria, eq(canal.idCategoria, categoria.idCategoria))
  .where(eq(categoria.idServer, idServer));
}

// ==========================================
// CRUD: MENSAGENS
// ==========================================

export async function getMensagensComUsuario(idCanal: number) {
  return await db.select({
    idMsg: mensagem.idMsg,
    conteudoMsg: mensagem.conteudoMsg,
    horarioMsg: mensagem.horarioMsg,
    apelidoUser: usuario.apelidoUser,
  })
  .from(mensagem)
  .innerJoin(usuario, eq(mensagem.idUser, usuario.idUser))
  .where(eq(mensagem.idCanal, idCanal))
  .orderBy(desc(mensagem.horarioMsg));
}

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
  
  revalidatePath('/servidores');
}

export async function deleteMensagem(id: number) {
  await db.delete(mensagem).where(eq(mensagem.idMsg, id));
  revalidatePath('/servidores');
}

// ==========================================
// CRUD: MENSAGENS DIRETAS
// ==========================================

export async function getContatos() {
  return await db.select().from(contatoDireto).orderBy(desc(contatoDireto.idContato));
}

export async function addContato(formData: FormData) {
  const remetente = parseInt(formData.get('remetente') as string);
  const destinatario = parseInt(formData.get('destinatario') as string);
  const apelido = formData.get('apelido') as string;
  const conteudo = formData.get('conteudo') as string;

  await db.insert(contatoDireto).values({
    idUserRemetente: remetente,
    idUserDestinatario: destinatario,
    apelidoContato: apelido,
    conteudoContato: conteudo,
  });

  revalidatePath('/mensagens')
}

export async function deleteContato(id: number) {
  await db.delete(contatoDireto).where(eq(contatoDireto.idContato, id));
  revalidatePath('/mensagens');
}
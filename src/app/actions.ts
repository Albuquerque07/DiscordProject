'use server'

import { db } from '@/db';
import { usuario } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Ler
export async function getUsuarios() {
    return await db.select().from(usuario);
}
// Criar
export async function addUsuario(formData: FormData){
    const apelido = formData.get('apelido') as String;
    const email = formData.get('email') as string;

    await db.insert(usuario).values({
        apelidoUser: apelido,
        emailUser: email,
        senhaUser: 'senha_padrao'
    });
    revalidatePath('/');
}

export async function deleteUsuario(id: number) {
    await db.delete(usuario).where(eq(usuario.idUser, id));
    revalidatePath('/');
}
import { 
  pgTable, 
  serial, 
  varchar, 
  date, 
  boolean, 
  integer, 
  text, 
  timestamp, 
  primaryKey 
} from 'drizzle-orm/pg-core';

// USUARIO
export const usuario = pgTable('usuario', {
  idUser: serial('iduser').primaryKey(),
  apelidoUser: varchar('apelidouser', { length: 50 }).notNull(),
  emailUser: varchar('emailuser', { length: 100 }).notNull().unique(),
  senhaUser: varchar('senhauser', { length: 255 }).notNull(),
  dataInicioUser: date('datainiciouser').defaultNow().notNull(),
  statusUser: varchar('statususer', { length: 20 }).default('online').notNull(),
  temNitro: boolean('temnitro').default(false).notNull(),
});

// SERVIDOR
export const servidor = pgTable('servidor', {
  idServer: serial('idserver').primaryKey(),
  nomeServer: varchar('nomeserver', { length: 100 }).notNull(),
  dataInicioServer: date('datainicioserver').defaultNow().notNull(),
  nivelImpulso: integer('nivelimpulso').default(0).notNull(),
});

// CATEGORIA
export const categoria = pgTable('categoria', {
  idCategoria: serial('idcategoria').primaryKey(),
  nomeCategoria: varchar('nomecategoria', { length: 80 }).notNull(),
  catEPrivada: boolean('cateprivada').default(false).notNull(),
  idServer: integer('idserver').notNull().references(() => servidor.idServer, { onDelete: 'cascade' }),
});

// CANAL
export const canal = pgTable('canal', {
  idCanal: serial('idcanal').primaryKey(),
  nomeCanal: varchar('nomecanal', { length: 80 }).notNull(),
  tipoCanal: varchar('tipocanal', { length: 20 }).notNull(),
  canalEPriv: boolean('canalepriv').default(false).notNull(),
  idCategoria: integer('idcategoria').notNull().references(() => categoria.idCategoria, { onDelete: 'cascade' }),
});

// MENSAGEM
export const mensagem = pgTable('mensagem', {
  idMsg: serial('idmsg').primaryKey(),
  conteudoMsg: text('conteudomsg').notNull(),
  horarioMsg: timestamp('horariomsg').defaultNow().notNull(),
  idCanal: integer('idcanal').notNull().references(() => canal.idCanal, { onDelete: 'cascade' }),
  idUser: integer('iduser').notNull().references(() => usuario.idUser, { onDelete: 'cascade' }),
});

// CONTATODIRETO (PK Composta)
export const contatoDireto = pgTable('contatodireto', {
  idUserDestinatario: integer('iduser_destinatario').notNull().references(() => usuario.idUser, { onDelete: 'cascade' }),
  idUserRemetente: integer('iduser_remetente').notNull().references(() => usuario.idUser, { onDelete: 'cascade' }),
  conteudoContato: text('conteudocontato').notNull(),
  apelidoContato: varchar('apelidocontato', { length: 50 }),
}, (table) => ({
  pk: primaryKey({ columns: [table.idUserDestinatario, table.idUserRemetente] })
}));

// VIRAAMIGODE (PK Composta)
export const viraAmigoDe = pgTable('viraamigode', {
  idUserSolicitante: integer('iduser_solicitante').notNull().references(() => usuario.idUser, { onDelete: 'cascade' }),
  idUserReceptor: integer('iduser_receptor').notNull().references(() => usuario.idUser, { onDelete: 'cascade' }),
  dataInicio: date('datainicio').defaultNow().notNull(),
  status: varchar('status', { length: 20 }).default('pendente').notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.idUserSolicitante, table.idUserReceptor] })
}));

// PARTICIPA (PK Composta)
export const participa = pgTable('participa', {
  idServer: integer('idserver').notNull().references(() => servidor.idServer, { onDelete: 'cascade' }),
  idUser: integer('iduser').notNull().references(() => usuario.idUser, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.idServer, table.idUser] })
}));

// CARGO
export const cargo = pgTable('cargo', {
  idCargo: serial('idcargo').primaryKey(),
  nomeCargo: varchar('nomecargo', { length: 50 }).notNull(),
  corCargo: varchar('corcargo', { length: 7 }).default('#99AAB5').notNull(),
  idServer: integer('idserver').notNull().references(() => servidor.idServer, { onDelete: 'cascade' }),
});

// QUALIFICA (PK Composta)
export const qualifica = pgTable('qualifica', {
  idCargo: integer('idcargo').notNull().references(() => cargo.idCargo, { onDelete: 'cascade' }),
  idUser: integer('iduser').notNull().references(() => usuario.idUser, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.idCargo, table.idUser] })
}));

// PERMISSAO
export const permissao = pgTable('permissao', {
  idPermissao: serial('idpermissao').primaryKey(),
  nomePermissao: varchar('nomepermissao', { length: 60 }).notNull(),
  tipoPermissao: varchar('tipopermissao', { length: 30 }).notNull(),
});

// POSSUIPERM (PK Composta)
export const possuiPerm = pgTable('possuiperm', {
  idCargo: integer('idcargo').notNull().references(() => cargo.idCargo, { onDelete: 'cascade' }),
  idPermissao: integer('idpermissao').notNull().references(() => permissao.idPermissao, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.idCargo, table.idPermissao] })
}));

// BOT
export const bot = pgTable('bot', {
  idBot: serial('idbot').primaryKey(),
  nomeBot: varchar('nomebot', { length: 80 }).notNull(),
  funcaoBot: varchar('funcaobot', { length: 100 }).notNull(),
});

// POSSUIBOT (PK Composta)
export const possuiBot = pgTable('possuibot', {
  idBot: integer('idbot').notNull().references(() => bot.idBot, { onDelete: 'cascade' }),
  idServer: integer('idserver').notNull().references(() => servidor.idServer, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.idBot, table.idServer] })
}));
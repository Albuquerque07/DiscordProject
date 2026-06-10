import { pgTable, serial, varchar, date, boolean } from 'drizzle-orm/pg-core';

export const usuario = pgTable('usuario', {
    idUser: serial('iduser').primaryKey(),
    apelidoUser: varchar('apelidouser', { length: 50 }).notNull(),
    emailUser: varchar('emailuser', { length:100 }).notNull().unique(),
    statusUser: varchar('statususer', { length:20 }).default('online'),
    temNitro: boolean('teamnitro').default(false),
})
import {
    pgTable,
    serial,
    varchar,
    timestamp,
    uniqueIndex,
  } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const userTable = pgTable(
    'users',
    {
      id: serial('id').primaryKey(),
      firstName: varchar('firstname', { length: 256 }).notNull(),
      lastName: varchar('lastname', { length: 256 }).notNull(),
      email: varchar('email', { length: 256 }).notNull(),
      password: varchar('password', { length: 256 }).notNull(),
      createdAt: timestamp('createdat').defaultNow().notNull(),
    },
    (users) => {
      return {
        uniqueIdx: uniqueIndex('email_idx').on(users.email),
      };
    },
  );
export type User = InferModel<typeof userTable>; // return type when queried
export type NewUser = InferModel<typeof userTable, "insert">; // insert type
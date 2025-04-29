import {Knex} from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    transations: {
        id: string;
        tittle: string;
        value: number;
        created_at: string;
        session_id?: string;

    };
  }
}

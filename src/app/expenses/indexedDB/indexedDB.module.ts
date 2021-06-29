import { NgModule } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db: any, transaction: any) => {
      console.log(db);
      const store1 = transaction.objectStore('expenses');
      store1.createIndex('item', 'item', { unique: true });
      store1.createIndex('frequency', 'frequency', { unique: false });
      
      const store2 = transaction.objectStore('salary');
      store2.createIndex('person', 'person', { unique: true });
      store2.createIndex('amount', 'amount', { unique: false });
      store2.createIndex('frequency', 'frequency', { unique: false });
    }
  };
}

const dbConfig: DBConfig  = {
  name: 'RRDB',
  version: 1,
  objectStoresMeta: [{
    store: 'expenses',
    storeConfig: { keyPath: 'item', autoIncrement: false },
    storeSchema: [
      { name: 'item', keypath: 'item', options: { unique: true } },
      { name: 'frequency', keypath: 'frequency', options: { unique: false } }
    ]
  },{
    store: 'salary',
    storeConfig: { keyPath: 'person', autoIncrement: false },
    storeSchema: [
      { name: 'person', keypath: 'person', options: { unique: true } },
      { name: 'amount', keypath: 'amount', options: { unique: false } },
      { name: 'frequency', keypath: 'frequency', options: { unique: false } }
    ]
  }],
  migrationFactory
};

@NgModule({
  imports: [
    NgxIndexedDBModule.forRoot(dbConfig)
  ]
})
export class IndexedDBModule { }
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');
  // connect to DB and version to use
  const jateDb = await openDB('jate', 1);
  // create new transaction. Specifies which DB to post to and what priveleges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const objStore = tx.objectStore('jate');
  // pass in content
  const req = objStore.put({ id: id, value: value })
  // confirm data added 
  const res = await req;
  console.log('data saved to database', res);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from the database');
  // connect to DB and version to use
  const jateDb = await openDB('jate', 1);
  // create new transaction. Specifies which DB to post to and what priveleges.
  const tx = jateDb.transaction('jate', 'readonly');
  // open the object store
  const objStore = tx.objectStore('jate');
  // pass in content
  const req = objStore.getAll();
  // confirm data added 
  const res = await req;
  console.log('res.value', res);
  return res;
}

initdb();

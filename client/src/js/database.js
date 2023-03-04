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
  // connects to the database and specifies version number
  const jateDb = await openDB('jate', 1);

  // creates a new transaction and specifies the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // opens up object store
  const store = tx.objectStore('jate');

  // uses the .add() method on the store and pass in the content
  const request = store.add({ id: 1, content: content });

  // consolelogs confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
    // connects to the database and specifies version number
    const jateDb = await openDB('jate', 1);

    // creates a new transaction and specifies the database and data privileges
    const tx = jateDb.transaction('jate', 'readonly');
  
    // opens up object store
    const store = tx.objectStore('jate');
  
    // uses the .getAll() method to get all the data in the database
    const request = store.get(1);
  
    // consolelogs confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result;
}

initdb();

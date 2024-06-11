# PersistDB

PersistDB is a TypeScript package that provides a convenient interface for working with IndexedDB in web applications. It allows you to perform common operations such as adding, updating, removing, and retrieving data from an IndexedDB database.

## Installation

You can install the package via npm:

```bash
npm install persistdb
```

# Usage

```bash
import PersistDB from 'persistdb';

const db = new PersistDB('MyDatabase', 'MyStore');
```

# Methods

#### Example : add<T>(item: T): Promise<number>

- Adds an item to the IndexedDB store.
- item: The item to be added.
- Returns: A promise that resolves with the generated key (ID) of the added item.

```bash
// Adding an object

db.add({ id: 1, name: 'Item 1', data: [1, 2, 3] })
  .then(id => {
    console.log('Item added with id:', id);
  })
  .catch(error => {
    console.error('Error adding item:', error);
  });
```

#### Example : update<T>(id: number, item: T): Promise<void>

- Updates an existing item in the IndexedDB store.
- id: The ID of the item to update.
- item: The updated item.
- Returns: A promise that resolves when the item is successfully updated.

```bash
// Updating an item

db.update(1, { id: 1, name: 'Updated Item 1', data: [4, 5, 6] })
  .then(() => {
    console.log('Item updated');
  })
  .catch(error => {
    console.error('Error updating item:', error);
  });
```

#### Example : remove(id: number): Promise<void>

- Removes an item from the IndexedDB store.
- id: The ID of the item to remove.
- Returns: A promise that resolves when the item is successfully removed.

```bash
// Removing an item

db.remove(1)
  .then(() => {
    console.log('Item removed');
  })
  .catch(error => {
    console.error('Error removing item:', error);
  });
```

#### Example : get<T>(id: number): Promise<T | undefined>

- Retrieves an item from the IndexedDB store by its ID.
- id: The ID of the item to retrieve.
- Returns: A promise that resolves with the retrieved item, or undefined if not found.

```bash
// Getting an item by ID

db.get<{ id: number; name: string; data: number[] }>(1)
  .then(item => {
    console.log('Retrieved item:', item);
  })
  .catch(error => {
    console.error('Error getting item:', error);
  });
```

#### Example : getAll<T>(): Promise<T[]>

- Retrieves all items from the IndexedDB store.

- Returns: A promise that resolves with an array of all items in the store.

```bash
// Getting all items

db.getAll<{ id: number; name: string; data: number[] }>()
  .then(items => {
    console.log('All items:', items);
  })
  .catch(error => {
    console.error('Error getting all items:', error);
  });
```

Feel free to customize the README according to your package's specific features and usage instructions.

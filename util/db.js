// Import SQLite module from Expo
import * as SQLite from "expo-sqlite";
// Import Nature model
import { Nature } from "../models/nature";

// Open or create SQLite database named "nature.db"
const db = SQLite.openDatabase("nature.db");

// Function to initialize the database and create the necessary table
export function init() {
  // Create a promise for asynchronous handling
  const promise = new Promise((resolve, reject) => {
    // Execute a transaction to create the table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS nature (
              id INTEGER PRIMARY KEY NOT NULL,
              title TEXT NOT NULL,
              imageUri TEXT NOT NULL,
              address TEXT NOT NULL,
              lat REAL NOT NULL,
              lng REAL NOT NULL
          )`,
        [],
        // Success callback
        () => {
          resolve(); // Resolve the promise if table creation is successful
        },
        // Error callback
        (_, error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });

  return promise; // Return the promise
}

// Function to add a nature entry to the database
export function addNature(nature) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        // SQL query to insert nature data into the table
        `INSERT INTO nature (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          nature.title,
          nature.imageUri,
          nature.address,
          nature.location.lat,
          nature.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result); // Resolve the promise if insertion is successful
        },
        (_, error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });

  return promise; // Return the promise
}

// Function to fetch all nature entries from the database
export function fetchNature() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM nature",
        [],
        (_, result) => {
          const nature = [];

          // Iterate over the result rows and create Nature objects
          for (const dp of result.rows._array) {
            nature.push(
              new Nature(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }

          resolve(nature); // Resolve the promise with the fetched data
        },
        (_, error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });

  return promise; // Return the promise
}

// Function to fetch details of a specific nature entry from the database
export function fetchNatureDetails(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM nature WHERE id = ?",
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            // If a nature entry with the given id is found, create a Nature object
            const dbNature = result.rows.item(0);
            const nature = new Nature(
              dbNature.title,
              dbNature.imageUri,
              {
                lat: dbNature.lat,
                lng: dbNature.lng,
                address: dbNature.address,
              },
              dbNature.id // Include id property
            );
            resolve(nature); // Resolve the promise with the fetched data
          } else {
            console.error("No nature found with id:", id);
            reject("Nature not found"); // Reject the promise if nature entry is not found
          }
        },
        (_, error) => {
          console.error("Error executing SQL:", error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });

  return promise; // Return the promise
}

// Function to delete a nature entry from the database
export function deleteNature(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM nature WHERE id = ?",
        [id],
        (_, result) => {
          resolve(result); // Resolve the promise if deletion is successful
        },
        (_, error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });

  return promise; // Return the promise
}

// Function to update a nature entry in the database
export function updateNature(nature) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        // SQL query to update the title of a nature entry based on its id
        `UPDATE nature 
           SET title = ?
           WHERE id = ?`,
        [nature.title, nature.id],
        (_, result) => {
          console.log(result);
          resolve(result); // Resolve the promise if update is successful
        },
        (_, error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });

  return promise; // Return the promise
}

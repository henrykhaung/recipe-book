import * as mongodb from 'mongodb';
import { Recipe } from './recipe';
import { User } from './user';

export const collections: {
  serverrecipes?: mongodb.Collection<Recipe>;
  users?: mongodb.Collection<User>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db('recipeBookDB');
  await applySchemaValidation(db);

  const serverrecipesCollection = db.collection<Recipe>('serverrecipes');
  collections.serverrecipes = serverrecipesCollection;
  const usersCollection = db.collection<User>('users');
  collections.users = usersCollection;
}

// copied and adapted from mongodb post
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const recipeJsonSchema = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'description', 'imagePath', 'ingredients'],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: 'string',
          description: "'name' is required and is a string",
        },
        description: {
          bsonType: 'string',
          description: "'description' is required and is a string",
        },
        imagePath: {
          bsonType: 'string',
          description: "'imagePath' is required and is a string",
        },
        ingredients: {
          bsonType: 'array',
          description:
            "'ingredients' are required and is an array of Ingredient",
          items: {
            bsonType: 'object',
            required: ['name', 'amount', 'unit'],
            properties: {
              name: {
                bsonType: 'string',
                description: "'name' is required and is a string",
              },
              amount: {
                bsonType: 'number',
                description: "'amount' is required and is a number",
              },
              unit: {
                bsonType: 'string',
                description: "'unit' is required and is a string",
              },
            },
          },
        },
      },
    },
  };

  const userJsonSchema = {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'email',
        '_token',
        '_tokenExpirationDate',
        'recipes',
        'shoppinglist',
      ],
      additionalProperties: false,
      properties: {
        _id: {},
        email: {
          bsonType: 'string',
          description: "'email' is required and is a string",
        },
        _token: {
          bsonType: 'string',
          description: "'_token' is required and is a string",
        },
        _tokenExpirationDate: {
          bsonType: 'date',
          description: "'_tokenExpirationDate' is required and is a date",
        },
        recipes: {
          bsonType: 'array',
          description: "'recipes' are required and is an array of Recipe",
          items: recipeJsonSchema.$jsonSchema,
        },
        shoppinglist: {
          bsonType: 'array',
          description:
            "'shoppinglist' are required and is an array of Ingredient",
          items: recipeJsonSchema.$jsonSchema.properties.ingredients.items,
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: 'serverrecipes',
      validator: recipeJsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection('serverrecipes', {
          validator: recipeJsonSchema,
        });
      }
    });

  await db
    .command({
      collMod: 'users',
      validator: userJsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection('users', { validator: userJsonSchema });
      }
    });
}

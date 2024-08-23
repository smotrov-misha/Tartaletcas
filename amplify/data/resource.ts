import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a
  .schema({
    Ingredients: a.customType({
      name: a.string(),
      quantity: a.float(),
      unit: a.string(),
      checkmark: a.boolean(),
    }),
    Dishes: a.model({
      name: a.string(),
      image: a.string(),
      description: a.string(),
      recipe: a.string(),
      weight: a.float(),
      calories: a.float(),
      ingredients: a.ref("Ingredients").array(),
      templates: a.hasMany("DishesTemplates", "dishId"),
      orders: a.hasMany("OrdersDishes", "dishId"),
    }),
    Templates: a.model({
      name: a.string(),
      dishes: a.hasMany("DishesTemplates", "templateId"),
    }),
    DishesTemplates: a.model({
      dishId: a.id(),
      templateId: a.id(),
      quantity: a.integer(),
      template: a.belongsTo("Templates", "templateId"),
      dish: a.belongsTo("Dishes", "dishId"),
    }),
    Orders: a.model({
      name: a.string(),
      description: a.string(),
      notes: a.string(),
      deadline: a.string(),
      prepared: a.boolean(),
      isDone: a.boolean(),
      isInHistory: a.boolean().default(false),
      percents: a.string().default("0%"),
      dishes: a.hasMany("OrdersDishes", "orderId"),
      ingredients: a.ref("Ingredients").array(),
    }),
    OrdersDishes: a.model({
      dishId: a.id(),
      orderId: a.id(),
      quantity: a.integer(),
      quantityMade: a.integer().default(0),
      order: a.belongsTo("Orders", "orderId"),
      dish: a.belongsTo("Dishes", "dishId"),
    }),
  })
  .authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

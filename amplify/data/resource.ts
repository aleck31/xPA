import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/** STEP 1
 * Define your data models
 * @see https://docs.amplify.aws/gen2/build-a-backend/data/
 */

// Define the schema using the programmatic API
const schema = a.schema({
  // AI conversation route for the assistant
  chat: a.conversation({
    aiModel: a.ai.model('Claude 3.5 Sonnet'),
    systemPrompt: 'You are a helpful personal assistant that helps users manage their finances and schedule.',
  })
  .authorization((allow: any) => allow.owner()),

  // AI generation route for financial insights
  generateFinancialInsight: a.generation({
    aiModel: a.ai.model('Claude 3.5 Sonnet'),
    systemPrompt: 'You are a financial advisor that provides insights based on transaction data.',
  })
  .arguments({
    transactionData: a.string(),
    timeframe: a.string(),
  })
  .returns(
    a.customType({
      summary: a.string(),
      insights: a.string().array(),
      recommendations: a.string().array(),
    })
  )
  .authorization((allow: any) => allow.authenticated()),

  // Removed AI Response subscription temporarily
  // onAIResponse: a.subscription()
  // .arguments({
  //   prompt: a.string(),
  //   modelId: a.string(),
  //   maxTokens: a.integer(),
  //   temperature: a.float(),
  // })
  // .authorization((allow: any) => allow.authenticated()),

  // User profile information
  User: a.model({
    id: a.id(),
    email: a.string().required(),
    fullName: a.string().required(),
    preferredName: a.string(),
    profilePicture: a.string(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
  }).authorization((allow: any) => allow.owner()),

  // Budget categories
  Category: a.model({
    id: a.id(),
    name: a.string().required(),
    description: a.string(),
    type: a.enum(['EXPENSE', 'INCOME']),
    icon: a.string(),
    color: a.string(),
    budgets: a.hasMany('Budget', 'categoryId'),
    transactions: a.hasMany('Transaction', 'categoryId'),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
  }).authorization((allow: any) => allow.owner()),

  // Budget for a specific category
  Budget: a.model({
    id: a.id(),
    name: a.string().required(),
    amount: a.float().required(),
    period: a.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM']),
    startDate: a.date().required(),
    endDate: a.date(),
    // 保留外键
    categoryId: a.string(),
    category: a.belongsTo('Category', 'categoryId'),
    transactions: a.hasMany('Transaction', 'budgetId'),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
  }).authorization((allow: any) => allow.owner()),

  // Financial transactions
  Transaction: a.model({
    id: a.id(),
    amount: a.float().required(),
    date: a.date().required(),
    description: a.string().required(),
    type: a.enum(['EXPENSE', 'INCOME']),
    // 添加外键
    categoryId: a.string(),
    budgetId: a.string(),
    category: a.belongsTo('Category', 'categoryId'),
    budget: a.belongsTo('Budget', 'budgetId'),
    receipt: a.string(),
    isRecurring: a.boolean().required(),
    recurringDetails: a.customType({
      frequency: a.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),
      interval: a.integer().required(),
      endDate: a.date(),
      count: a.integer(),
    }),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
  }).authorization((allow: any) => allow.owner()),

  // Calendar events
  Event: a.model({
    id: a.id(),
    title: a.string().required(),
    description: a.string(),
    startDate: a.datetime().required(),
    endDate: a.datetime(),
    allDay: a.boolean().required(),
    location: a.string(),
    color: a.string(),
    isRecurring: a.boolean().required(),
    recurringDetails: a.customType({
      frequency: a.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),
      interval: a.integer().required(),
      endDate: a.date(),
      count: a.integer(),
    }),
    reminders: a.hasMany('Reminder', 'eventId'),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
  }).authorization((allow: any) => allow.owner()),

  // Reminders for events
  Reminder: a.model({
    id: a.id(),
    eventId: a.string(),
    event: a.belongsTo('Event', 'eventId'),
    reminderTime: a.datetime().required(),
    notificationType: a.enum(['EMAIL', 'PUSH', 'BOTH']),
    status: a.enum(['PENDING', 'SENT', 'FAILED']),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required(),
  }).authorization((allow: any) => allow.owner()),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
});

/** STEP 2
  * Go to your frontend source code. From your client-side code, 
  * generate a Data client to make CRUDL requests to your table. 
 * @see https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
 */ 

/** STEP 3
  * Fetch records from the database and use them in your frontend component. 
 */

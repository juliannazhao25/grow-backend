const { gql } = require('apollo-server-express')

module.exports = gql`

# These scalars are resolved in /lib/scalars.js and can be used as input or output type in schema.
scalar DateTime
scalar Date
scalar Time
scalar EmailAddress
scalar PhoneNumber

type Query {
    user(id: ID!): User!
    viewer: Viewer!
    lawsByUserId(userId: ID!): [Law]!
    goalsByUserId(userId: ID!): [Goal]!
    habitsByUserId(userId: ID!): [Habit]!
    logByHabitId(habitId: ID!): HabitDetails!
  }

  type Mutation {
    login(username: String!, password: String!): Viewer!
    register(input: RegisterInput!): Viewer!
    addGoal(userId: ID!, goal: String!, reward: String!, punishment: String!, vermin1: String!, vermin2: String, vermin3: String, vermin4: String, vermin5: String): ID!
    addLaw(userId: ID!, law: String!, punishment: String!, reward: String): ID!
    addHabit(userId: ID!, habit: String!, description: String): ID!
    addHabitLog(habitId: ID!, date: Date!): ID!
  }

  interface UserTraits {
    id: ID!
    username: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User implements UserTraits {
    id: ID!
    username: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Viewer implements UserTraits {
    id: ID!
    username: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthReturn {
    token: String!
    user: User!
  }

  input RegisterInput {
    username: String!
    password: String!
    firstName: String!
  }

  type Law {
    id: ID!
    userId: ID!
    law: String!
    punishment: String!
    reward: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Goal {
    id: ID!
    userId: ID!
    goal: String!
    reward: String!
    punishment: String!
    vermin1: String!
    vermin2: String
    vermin3: String
    vermin4: String
    vermin5: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Habit {
    id: ID!
    userId: ID!
    habit: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type HabitDetails {
    habitId: ID!
    habit: String!
    description: String
    doneToday: Boolean!
    totalDays: Int!
    successDays: Int!
    streak: Int!
    lastMonth: [Date]!
  }
`

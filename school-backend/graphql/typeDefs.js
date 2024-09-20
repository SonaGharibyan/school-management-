const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: Int!
    email: String!
    role: Role!
  }

  type Teacher {
    id: Int!
    name: String!
    subjects: [Subject!]
  }

  type Pupil {
    id: Int!
    name: String!
    grade: Int!
    subjects: [Subject!]
  }

  type Subject {
    id: Int!
    name: String!
    teacher: Teacher
    pupils: [Pupil!]
  }

  enum Role {
    ADMIN
    TEACHER
    PUPIL
  }

  type Query {
    teachers: [Teacher!]!
    pupils: [Pupil!]!
    subjects: [Subject!]!
  }

  input TeacherUpdateInput {
    name: String
    subjectIds: [ID!]
  }

  input PupilUpdateInput {
    name: String
    grade: Int
    subjectIds: [ID!] # Assuming a pupil is assigned to multiple subjects
  }

  input SubjectUpdateInput {
    name: String
    teacherId: ID
  }

  type Mutation {
    signup(email: String!, password: String!, role: String!): String
    login(email: String!, password: String!): String
    addTeacher(data: TeacherUpdateInput!): Teacher!
    addPupil(name: String!, grade: Int!): Pupil!
    addSubject(name: String!, teacherId: Int): Subject!
    assignSubjectToPupil(pupilId: Int!, subjectId: Int!): Pupil!

    updateTeacher(id: ID!, data: TeacherUpdateInput!): Teacher!
    updatePupil(id: ID!, data: PupilUpdateInput!): Pupil!
    updateSubject(id: ID!, data: SubjectUpdateInput!): Subject!

    deleteTeacher(id: ID!): Teacher!
    deletePupil(id: ID!): Pupil!
    deleteSubject(id: ID!): Subject!
  }
`;
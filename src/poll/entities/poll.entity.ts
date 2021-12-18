import { Entity } from 'typeorm';

// TODO #TASK 3 Complete the poll schema
//* The Schema MUST be
//*  {
//*    id: number
//*    question: string
//*    isClose: boolean       <----------- name_in_table = is_close, default_value = false
//*    author: User           <----------- Many To One Relationship
//*    users: User[]          <----------- Many To Many Relationship
//*    closedDate: Date       <----------- name_in_table = closed_date, dafault_value = null, nullable
//*    createdDate: Date      <----------- name_in_table = created_date
//*    updatedDate: Date      <----------- name_in_table = updated_date
//*    deletedDate: Date      <----------- name_in_table = deleted_date
//*  }
//*
//*  After complete the scheme then create and run the poll's migration file
//*  HINT auto create the migration file run command `typeorm:auto-create <migration file name>`
//*  HINT run the migration files run command `typeorm:run`

@Entity()
export class Poll {}

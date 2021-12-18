import { Entity } from 'typeorm';

//  TODO #TASK 2 Create the user schema
//* The Schema MUST be
//*  {
//*    id: number
//*    username: string       <----------- unique, index
//*    password: string
//*    displayName: string    <----------- name_in_table = display_name
//*    createdDate: Date      <----------- name_in_table = created_date
//*    updatedDate: Date      <----------- name_in_table = updated_date
//*    deletedDate: Date      <----------- name_in_table = deleted_date
//*  }
//*
//*  After created the scheme then create and run the user's migration file
//*  HINT auto create the migration file run command `typeorm:auto-create <migration file name>`
//*  HINT run the migration files run command `typeorm:run`

@Entity()
export class User {}

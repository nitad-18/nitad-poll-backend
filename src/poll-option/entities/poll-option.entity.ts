import { Entity } from 'typeorm';

// TODO #TASK 4 Complete the poll-option schema
//* The Schema MUST be
//*  {
//*    id: number
//*    topic: string
//*    votes: number          <----------- default_value = 0
//*    poll: Poll             <----------- Many To One Relationship
//*    createdDate: Date      <----------- name_in_table = created_date
//*    updatedDate: Date      <----------- name_in_table = updated_date
//*    deletedDate: Date      <----------- name_in_table = deleted_date
//*  }
//*
//*  After complete the scheme then create and run the poll-option's migration file
//*  HINT auto create the migration file run command `typeorm:auto-create <migration file name>`
//*  HINT run the migration files run command `typeorm:run`

@Entity()
export class PollOption {}

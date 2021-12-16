import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablePoll1639648828574 implements MigrationInterface {
  name = 'createTablePoll1639648828574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "poll" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "is_close" boolean NOT NULL DEFAULT false, "closed_date" TIMESTAMP, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, CONSTRAINT "PK_03b5cf19a7f562b231c3458527e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "poll"`);
  }
}

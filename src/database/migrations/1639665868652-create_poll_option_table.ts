import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPollOptionTable1639665868652 implements MigrationInterface {
  name = 'createPollOptionTable1639665868652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "poll_option" ("id" SERIAL NOT NULL, "topic" character varying NOT NULL, "votes" integer NOT NULL DEFAULT '0', "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, CONSTRAINT "PK_5fdd46d449ddcc8201aed9b5a1b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "poll_option"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelationshipPollPollOption1639666786911 implements MigrationInterface {
  name = 'addRelationshipPollPollOption1639666786911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "poll_option" ADD "pollId" integer`);
    await queryRunner.query(
      `ALTER TABLE "poll_option" ADD CONSTRAINT "FK_a1200fcfcdab6145351545f26ea" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "poll_option" DROP CONSTRAINT "FK_a1200fcfcdab6145351545f26ea"`,
    );
    await queryRunner.query(`ALTER TABLE "poll_option" DROP COLUMN "pollId"`);
  }
}

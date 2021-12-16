import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelationshipUserPoll1639653404701 implements MigrationInterface {
  name = 'addRelationshipUserPoll1639653404701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "poll_users_user" ("pollId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_68bb8b488339dac1d16b3fb6639" PRIMARY KEY ("pollId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e8005b34dfa57d9d67059ea5" ON "poll_users_user" ("pollId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6c075a892e16f127e420a27750" ON "poll_users_user" ("userId") `,
    );
    await queryRunner.query(`ALTER TABLE "poll" ADD "authorId" integer`);
    await queryRunner.query(
      `ALTER TABLE "poll" ADD CONSTRAINT "FK_a1fddeb1242e06fb38de24cec7c" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "poll_users_user" ADD CONSTRAINT "FK_f0e8005b34dfa57d9d67059ea5f" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "poll_users_user" ADD CONSTRAINT "FK_6c075a892e16f127e420a277505" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "poll_users_user" DROP CONSTRAINT "FK_6c075a892e16f127e420a277505"`,
    );
    await queryRunner.query(
      `ALTER TABLE "poll_users_user" DROP CONSTRAINT "FK_f0e8005b34dfa57d9d67059ea5f"`,
    );
    await queryRunner.query(`ALTER TABLE "poll" DROP CONSTRAINT "FK_a1fddeb1242e06fb38de24cec7c"`);
    await queryRunner.query(`ALTER TABLE "poll" DROP COLUMN "authorId"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6c075a892e16f127e420a27750"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f0e8005b34dfa57d9d67059ea5"`);
    await queryRunner.query(`DROP TABLE "poll_users_user"`);
  }
}

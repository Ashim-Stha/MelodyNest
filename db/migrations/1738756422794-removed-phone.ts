import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedPhone1738756422794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "apiKey" character varying NOT NULL DEFAULT 'default-api-key'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "apiKey"`);
  }
}

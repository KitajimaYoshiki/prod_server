import { MigrationInterface, QueryRunner } from "typeorm";

export class createTaskTable1676275566147 implements MigrationInterface {
    name = 'createTaskTable1676275566147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_5de4ca0d640b180ab3b0597be69\` FOREIGN KEY (\`author\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check_list\` ADD CONSTRAINT \`FK_0142ccfffa1649cd2b77ebe4a4b\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD CONSTRAINT \`FK_3ccfdbde3988e8917fd997c5761\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tags\` DROP FOREIGN KEY \`FK_3ccfdbde3988e8917fd997c5761\``);
        await queryRunner.query(`ALTER TABLE \`check_list\` DROP FOREIGN KEY \`FK_0142ccfffa1649cd2b77ebe4a4b\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_5de4ca0d640b180ab3b0597be69\``);
    }

}

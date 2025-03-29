import { Migration } from '@mikro-orm/migrations';

export class Migration20250322215513 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "base_product" drop column "test";`);
  }

}

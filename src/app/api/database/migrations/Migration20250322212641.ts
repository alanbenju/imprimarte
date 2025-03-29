import { Migration } from '@mikro-orm/migrations';

export class Migration20250322212641 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "base_product" add column "test" varchar(255) not null;`);
  }

}

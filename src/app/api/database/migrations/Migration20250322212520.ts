import { Migration } from '@mikro-orm/migrations';

export class Migration20250322212520 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "base_product" ("id" uuid not null default gen_random_uuid(), "type" text check ("type" in ('TSHIRT', 'HOODIE', 'SWEATSHIRT')) not null, "name" varchar(255) not null, "color" varchar(255) not null, "available_sizes" text[] not null, "price" numeric(10,2) not null, "front_image" varchar(255) not null, "back_image" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "base_product_pkey" primary key ("id"));`);

    this.addSql(`create table "product_image_details" ("id" uuid not null default gen_random_uuid(), "x_pos" int not null, "y_pos" int not null, "width_px" int not null, "height_px" int not null, "width_cm" int not null, "height_cm" int not null, "product_id" uuid not null, constraint "product_image_details_pkey" primary key ("id"));`);

    this.addSql(`create table "user" ("id" uuid not null default gen_random_uuid(), "email" varchar(255) not null, "password" varchar(255) not null, "name" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "reset_token" varchar(255) null, "reset_token_expiry" timestamptz null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "company_store" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "banner_image" varchar(255) null, "logo_image" varchar(255) null, "color_panel" varchar(255) not null default '#000000', "color_text" varchar(255) not null default '#FFFFFF', "background_color" varchar(255) not null default '#FFFFFF', "buy_button_color" varchar(255) not null default '#000000', "product_text_color" varchar(255) null default '#333333', "show_store_name" boolean not null default true, "user_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "company_store_pkey" primary key ("id"));`);

    this.addSql(`create table "store_product" ("id" uuid not null default gen_random_uuid(), "front_image_details_id" uuid null default gen_random_uuid(), "back_image_details_id" uuid null default gen_random_uuid(), "name" varchar(255) not null, "description" varchar(255) null, "price" numeric(10,2) not null, "available_sizes" text[] not null, "front_image" varchar(255) not null, "back_image" varchar(255) not null, "front_image_details" uuid null, "front_image_details_x_pos" int null, "front_image_details_y_pos" int null, "front_image_details_width_px" int null, "front_image_details_height_px" int null, "front_image_details_width_cm" int null, "front_image_details_height_cm" int null, "front_image_details_product_id" uuid null, "back_image_details" uuid null, "back_image_details_x_pos" int null, "back_image_details_y_pos" int null, "back_image_details_width_px" int null, "back_image_details_height_px" int null, "back_image_details_width_cm" int null, "back_image_details_height_cm" int null, "back_image_details_product_id" uuid null, "final_front_image" varchar(255) null, "final_back_image" varchar(255) null, "base_product_id" uuid not null, "company_store_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "store_product_pkey" primary key ("id", "front_image_details_id", "back_image_details_id"));`);

    this.addSql(`alter table "company_store" add constraint "company_store_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "store_product" add constraint "store_product_base_product_id_foreign" foreign key ("base_product_id") references "base_product" ("id") on update cascade;`);
    this.addSql(`alter table "store_product" add constraint "store_product_company_store_id_foreign" foreign key ("company_store_id") references "company_store" ("id") on update cascade;`);
  }

}

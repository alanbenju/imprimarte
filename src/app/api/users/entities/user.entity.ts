import {
  Entity,
  PrimaryKey,
  Property,
  Unique,
  BeforeCreate,
} from "@mikro-orm/core";
import bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  @Unique()
  email!: string;

  @Property({ hidden: true }) // This will exclude the password from serialization
  password!: string;

  @Property({ nullable: true })
  name?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  resetToken?: string;

  @Property({ nullable: true })
  resetTokenExpiry?: Date;

  @BeforeCreate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  constructor(data: {
    email: string;
    password: string;
    name?: string;
  }) {
    this.email = data.email;
    this.password = data.password;
    if (data.name) this.name = data.name;
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
} 
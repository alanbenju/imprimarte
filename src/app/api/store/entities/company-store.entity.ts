import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Ref,
} from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity";
// Use type import to avoid circular dependency
import type { StoreProduct } from "./store-product.entity";

@Entity()
export class CompanyStore {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  bannerImage?: string;

  @Property({ nullable: true })
  logoImage?: string;

  @Property({ default: "#000000" })
  colorPanel: string = "#000000";

  @Property({ default: "#FFFFFF" })
  colorText: string = "#FFFFFF";

  @Property({ default: "#FFFFFF" })
  backgroundColor: string = "#FFFFFF";

  @Property({ default: "#000000" })
  buyButtonColor: string = "#000000";
  
  @Property({ default: "#333333", nullable: true })
  productTextColor?: string;
  
  @Property({ default: true })
  showStoreName: boolean = true;

  @ManyToOne(() => User)
  user!: User;

  // Use forward reference to break circular dependency
  @OneToMany({ entity: () => "StoreProduct", mappedBy: "companyStore" })
  products = new Collection<StoreProduct>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(data: {
    name: string;
    user: User;
    bannerImage?: string;
    logoImage?: string;
    colorPanel?: string;
    colorText?: string;
    backgroundColor?: string;
    buyButtonColor?: string;
    productTextColor?: string;
    showStoreName?: boolean;
  }) {
    this.name = data.name;
    this.user = data.user;
    if (data.bannerImage) this.bannerImage = data.bannerImage;
    if (data.logoImage) this.logoImage = data.logoImage;
    if (data.colorPanel) this.colorPanel = data.colorPanel;
    if (data.colorText) this.colorText = data.colorText;
    if (data.backgroundColor) this.backgroundColor = data.backgroundColor;
    if (data.buyButtonColor) this.buyButtonColor = data.buyButtonColor;
    if (data.productTextColor) this.productTextColor = data.productTextColor;
    if (data.showStoreName !== undefined) this.showStoreName = data.showStoreName;
  }
} 
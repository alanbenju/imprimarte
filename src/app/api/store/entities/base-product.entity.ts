import {
  Entity,
  Property,
  PrimaryKey,
  OneToMany,
  Collection,
  Enum,
  Ref,
} from "@mikro-orm/core";
// Use type import for StoreProduct to avoid circular dependency
import type { StoreProduct } from "./store-product.entity";

// Replace enums with const objects
export const ProductType = {
  TSHIRT: "TSHIRT",
  HOODIE: "HOODIE",
  SWEATSHIRT: "SWEATSHIRT",
} as const;

// Define a type from the const object
export type ProductType = keyof typeof ProductType;

// Replace enums with const objects
export const ProductSize = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
} as const;

// Define a type from the const object
export type ProductSize = keyof typeof ProductSize;

@Entity()
export class BaseProduct {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Enum({ items: () => Object.values(ProductType) })
  type!: keyof typeof ProductType;

  @Property()
  name!: string;

  @Property()
  color!: string;

  @Property({ type: "array" })
  availableSizes!: (keyof typeof ProductSize)[];

  @Property({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Property()
  frontImage!: string;

  @Property()
  backImage!: string;

  // Use forward reference to break circular dependency
  @OneToMany({ entity: () => "StoreProduct", mappedBy: "baseProduct" })
  products = new Collection<StoreProduct>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(data: {
    type: keyof typeof ProductType;
    name: string;
    color: string;
    availableSizes: (keyof typeof ProductSize)[];
    price: number;
    frontImage: string;
    backImage: string;
  }) {
    this.type = data.type;
    this.name = data.name;
    this.color = data.color;
    this.availableSizes = data.availableSizes;
    this.price = data.price;
    this.frontImage = data.frontImage;
    this.backImage = data.backImage;
  }
} 
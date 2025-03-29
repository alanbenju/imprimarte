import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Enum,
  Embedded,
  Reference,
} from "@mikro-orm/core";
// Use type import to avoid circular dependency
import type { CompanyStore } from "./company-store.entity";
import { BaseProduct, ProductSize } from "./base-product.entity";

@Entity()
export class ProductImageDetails {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property({ type: "number" })
  xPos!: number;

  @Property({ type: "number" })
  yPos!: number;

  @Property({ type: "number" })
  widthPx!: number;

  @Property({ type: "number" })
  heightPx!: number;

  @Property({ type: "number" })
  widthCm!: number;

  @Property({ type: "number" })
  heightCm!: number;

  @Property({ type: "uuid" })
  productId!: string;
}

@Entity()
export class StoreProduct {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Property({ type: "array" })
  availableSizes!: (keyof typeof ProductSize)[];

  @Property()
  frontImage!: string;

  @Property()
  backImage!: string;

  @Embedded(() => ProductImageDetails, { nullable: true })
  frontImageDetails?: ProductImageDetails;

  @Embedded(() => ProductImageDetails, { nullable: true })
  backImageDetails?: ProductImageDetails;

  @Property({ nullable: true })
  finalFrontImage?: string;

  @Property({ nullable: true })
  finalBackImage?: string;

  @ManyToOne(() => BaseProduct)
  baseProduct!: BaseProduct;

  // Use forward reference to break circular dependency
  @ManyToOne({ entity: () => "CompanyStore" })
  companyStore: any; // Use any type here instead of Ref<CompanyStore> to avoid type issues

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(data: {
    name: string;
    price: number;
    availableSizes: (keyof typeof ProductSize)[];
    frontImage: string;
    backImage: string;
    baseProduct: BaseProduct;
    companyStore: CompanyStore;
    description?: string;
    frontImageDetails?: ProductImageDetails;
    backImageDetails?: ProductImageDetails;
    finalFrontImage?: string;
    finalBackImage?: string;
  }) {
    this.name = data.name;
    this.price = data.price;
    this.availableSizes = data.availableSizes;
    this.frontImage = data.frontImage;
    this.backImage = data.backImage;
    this.baseProduct = data.baseProduct;
    this.companyStore = Reference.create(data.companyStore);
    if (data.description) this.description = data.description;
    if (data.frontImageDetails) this.frontImageDetails = data.frontImageDetails;
    if (data.backImageDetails) this.backImageDetails = data.backImageDetails;
    if (data.finalFrontImage) this.finalFrontImage = data.finalFrontImage;
    if (data.finalBackImage) this.finalBackImage = data.finalBackImage;
  }
} 
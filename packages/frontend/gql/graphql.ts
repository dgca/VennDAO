/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any };
};

export enum Aggregation_Interval {
  Day = "day",
  Hour = "hour",
}

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Order = {
  __typename?: "Order";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  daoFee: Scalars["BigInt"]["output"];
  encryptedFields: Scalars["String"]["output"];
  id: Scalars["Bytes"]["output"];
  orderId: Scalars["BigInt"]["output"];
  orderSubtotal: Scalars["BigInt"]["output"];
  orderTotal: Scalars["BigInt"]["output"];
  placedBy: Scalars["Bytes"]["output"];
  product: Product;
  productId: Scalars["BigInt"]["output"];
  publicFields: Array<Scalars["String"]["output"]>;
  quantity: Scalars["BigInt"]["output"];
  refundRecipient: Scalars["Bytes"]["output"];
  status: Scalars["Int"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Order_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Order_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  daoFee?: InputMaybe<Scalars["BigInt"]["input"]>;
  daoFee_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  daoFee_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  daoFee_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  daoFee_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  daoFee_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  daoFee_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  daoFee_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  encryptedFields?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_contains?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_gt?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_gte?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  encryptedFields_lt?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_lte?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_not?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  encryptedFields_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  encryptedFields_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Order_Filter>>>;
  orderId?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  orderId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  orderSubtotal?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderSubtotal_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderSubtotal_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderSubtotal_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  orderSubtotal_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderSubtotal_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderSubtotal_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderSubtotal_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  orderTotal?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderTotal_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderTotal_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderTotal_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  orderTotal_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderTotal_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderTotal_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  orderTotal_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  placedBy?: InputMaybe<Scalars["Bytes"]["input"]>;
  placedBy_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  placedBy_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  placedBy_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  placedBy_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  placedBy_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  placedBy_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  placedBy_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  placedBy_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  placedBy_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  product?: InputMaybe<Scalars["String"]["input"]>;
  productId?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  productId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  product_?: InputMaybe<Product_Filter>;
  product_contains?: InputMaybe<Scalars["String"]["input"]>;
  product_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  product_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  product_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  product_gt?: InputMaybe<Scalars["String"]["input"]>;
  product_gte?: InputMaybe<Scalars["String"]["input"]>;
  product_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  product_lt?: InputMaybe<Scalars["String"]["input"]>;
  product_lte?: InputMaybe<Scalars["String"]["input"]>;
  product_not?: InputMaybe<Scalars["String"]["input"]>;
  product_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  product_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  product_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  product_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  product_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  product_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  product_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  product_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  product_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  publicFields?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  quantity?: InputMaybe<Scalars["BigInt"]["input"]>;
  quantity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  quantity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  quantity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  quantity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  quantity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  quantity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  quantity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  refundRecipient?: InputMaybe<Scalars["Bytes"]["input"]>;
  refundRecipient_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  refundRecipient_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  refundRecipient_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  refundRecipient_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  refundRecipient_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  refundRecipient_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  refundRecipient_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  refundRecipient_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  refundRecipient_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  status?: InputMaybe<Scalars["Int"]["input"]>;
  status_gt?: InputMaybe<Scalars["Int"]["input"]>;
  status_gte?: InputMaybe<Scalars["Int"]["input"]>;
  status_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  status_lt?: InputMaybe<Scalars["Int"]["input"]>;
  status_lte?: InputMaybe<Scalars["Int"]["input"]>;
  status_not?: InputMaybe<Scalars["Int"]["input"]>;
  status_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum Order_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  DaoFee = "daoFee",
  EncryptedFields = "encryptedFields",
  Id = "id",
  OrderId = "orderId",
  OrderSubtotal = "orderSubtotal",
  OrderTotal = "orderTotal",
  PlacedBy = "placedBy",
  Product = "product",
  ProductId = "productId",
  ProductActive = "product__active",
  ProductBlockNumber = "product__blockNumber",
  ProductBlockTimestamp = "product__blockTimestamp",
  ProductDescription = "product__description",
  ProductMaxOrderQuantity = "product__maxOrderQuantity",
  ProductMinOrderQuantity = "product__minOrderQuantity",
  ProductName = "product__name",
  ProductPrice = "product__price",
  ProductProductId = "product__productId",
  ProductTransactionHash = "product__transactionHash",
  ProductVendorTokenId = "product__vendorTokenId",
  PublicFields = "publicFields",
  Quantity = "quantity",
  RefundRecipient = "refundRecipient",
  Status = "status",
  TransactionHash = "transactionHash",
}

export type Product = {
  __typename?: "Product";
  active: Scalars["Boolean"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  description: Scalars["String"]["output"];
  encryptedFields: Array<Scalars["String"]["output"]>;
  id: Scalars["Bytes"]["output"];
  maxOrderQuantity: Scalars["BigInt"]["output"];
  minOrderQuantity: Scalars["BigInt"]["output"];
  name: Scalars["String"]["output"];
  orders: Array<Order>;
  price: Scalars["BigInt"]["output"];
  productId: Scalars["BigInt"]["output"];
  publicFields: Array<Scalars["String"]["output"]>;
  transactionHash: Scalars["Bytes"]["output"];
  vendor: Vendor;
  vendorTokenId: Scalars["BigInt"]["output"];
};

export type ProductOrdersArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Order_Filter>;
};

export type Product_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  active?: InputMaybe<Scalars["Boolean"]["input"]>;
  active_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  active_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  active_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<Product_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_gt?: InputMaybe<Scalars["String"]["input"]>;
  description_gte?: InputMaybe<Scalars["String"]["input"]>;
  description_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_lt?: InputMaybe<Scalars["String"]["input"]>;
  description_lte?: InputMaybe<Scalars["String"]["input"]>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  encryptedFields?: InputMaybe<Array<Scalars["String"]["input"]>>;
  encryptedFields_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  encryptedFields_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  encryptedFields_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  encryptedFields_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  encryptedFields_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  maxOrderQuantity?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxOrderQuantity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxOrderQuantity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxOrderQuantity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxOrderQuantity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxOrderQuantity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxOrderQuantity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxOrderQuantity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minOrderQuantity?: InputMaybe<Scalars["BigInt"]["input"]>;
  minOrderQuantity_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minOrderQuantity_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minOrderQuantity_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minOrderQuantity_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minOrderQuantity_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minOrderQuantity_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  minOrderQuantity_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Product_Filter>>>;
  orders_?: InputMaybe<Order_Filter>;
  price?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  price_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  price_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  productId?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  productId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  publicFields?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_contains_nocase?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_not?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_not_contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  publicFields_not_contains_nocase?: InputMaybe<
    Array<Scalars["String"]["input"]>
  >;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  vendor?: InputMaybe<Scalars["String"]["input"]>;
  vendorTokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  vendorTokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  vendorTokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  vendorTokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vendorTokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  vendorTokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  vendorTokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  vendorTokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  vendor_?: InputMaybe<Vendor_Filter>;
  vendor_contains?: InputMaybe<Scalars["String"]["input"]>;
  vendor_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vendor_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vendor_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vendor_gt?: InputMaybe<Scalars["String"]["input"]>;
  vendor_gte?: InputMaybe<Scalars["String"]["input"]>;
  vendor_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vendor_lt?: InputMaybe<Scalars["String"]["input"]>;
  vendor_lte?: InputMaybe<Scalars["String"]["input"]>;
  vendor_not?: InputMaybe<Scalars["String"]["input"]>;
  vendor_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  vendor_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vendor_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  vendor_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vendor_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  vendor_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vendor_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  vendor_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  vendor_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Product_OrderBy {
  Active = "active",
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Description = "description",
  EncryptedFields = "encryptedFields",
  Id = "id",
  MaxOrderQuantity = "maxOrderQuantity",
  MinOrderQuantity = "minOrderQuantity",
  Name = "name",
  Orders = "orders",
  Price = "price",
  ProductId = "productId",
  PublicFields = "publicFields",
  TransactionHash = "transactionHash",
  Vendor = "vendor",
  VendorTokenId = "vendorTokenId",
  VendorBlockNumber = "vendor__blockNumber",
  VendorBlockTimestamp = "vendor__blockTimestamp",
  VendorDescription = "vendor__description",
  VendorId = "vendor__id",
  VendorMember = "vendor__member",
  VendorName = "vendor__name",
  VendorTransactionHash = "vendor__transactionHash",
  VendorWebsite = "vendor__website",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  product?: Maybe<Product>;
  products: Array<Product>;
  vendor?: Maybe<Vendor>;
  vendors: Array<Vendor>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Order_Filter>;
};

export type QueryProductArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProductsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Product_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Product_Filter>;
};

export type QueryVendorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVendorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Vendor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vendor_Filter>;
};

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  product?: Maybe<Product>;
  products: Array<Product>;
  vendor?: Maybe<Vendor>;
  vendors: Array<Vendor>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Order_Filter>;
};

export type SubscriptionProductArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProductsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Product_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Product_Filter>;
};

export type SubscriptionVendorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVendorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Vendor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vendor_Filter>;
};

export type Vendor = {
  __typename?: "Vendor";
  blockNumber: Scalars["BigInt"]["output"];
  blockTimestamp: Scalars["BigInt"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["Bytes"]["output"];
  member: Scalars["Bytes"]["output"];
  name: Scalars["String"]["output"];
  products: Array<Product>;
  tokenId: Scalars["BigInt"]["output"];
  transactionHash: Scalars["Bytes"]["output"];
  website: Scalars["String"]["output"];
};

export type VendorProductsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Product_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<Product_Filter>;
};

export type Vendor_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Vendor_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_gt?: InputMaybe<Scalars["String"]["input"]>;
  description_gte?: InputMaybe<Scalars["String"]["input"]>;
  description_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_lt?: InputMaybe<Scalars["String"]["input"]>;
  description_lte?: InputMaybe<Scalars["String"]["input"]>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  description_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  member?: InputMaybe<Scalars["Bytes"]["input"]>;
  member_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  member_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  member_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  member_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  member_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  member_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  member_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  member_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  member_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Vendor_Filter>>>;
  products_?: InputMaybe<Product_Filter>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  website?: InputMaybe<Scalars["String"]["input"]>;
  website_contains?: InputMaybe<Scalars["String"]["input"]>;
  website_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  website_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  website_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  website_gt?: InputMaybe<Scalars["String"]["input"]>;
  website_gte?: InputMaybe<Scalars["String"]["input"]>;
  website_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  website_lt?: InputMaybe<Scalars["String"]["input"]>;
  website_lte?: InputMaybe<Scalars["String"]["input"]>;
  website_not?: InputMaybe<Scalars["String"]["input"]>;
  website_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  website_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  website_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  website_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  website_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  website_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  website_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  website_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  website_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Vendor_OrderBy {
  BlockNumber = "blockNumber",
  BlockTimestamp = "blockTimestamp",
  Description = "description",
  Id = "id",
  Member = "member",
  Name = "name",
  Products = "products",
  TokenId = "tokenId",
  TransactionHash = "transactionHash",
  Website = "website",
}

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]["output"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type OrdersByMemberQueryVariables = Exact<{
  member?: InputMaybe<Scalars["Bytes"]["input"]>;
}>;

export type OrdersByMemberQuery = {
  __typename?: "Query";
  vendors: Array<{
    __typename?: "Vendor";
    tokenId: any;
    products: Array<{
      __typename?: "Product";
      name: string;
      publicFields: Array<string>;
      encryptedFields: Array<string>;
      orders: Array<{
        __typename?: "Order";
        orderId: any;
        quantity: any;
        orderTotal: any;
        status: number;
        publicFields: Array<string>;
        encryptedFields: string;
      }>;
    }>;
  }>;
};

export type ProductsByMemberQueryVariables = Exact<{
  member?: InputMaybe<Scalars["Bytes"]["input"]>;
}>;

export type ProductsByMemberQuery = {
  __typename?: "Query";
  vendors: Array<{
    __typename?: "Vendor";
    name: string;
    products: Array<{
      __typename?: "Product";
      productId: any;
      active: boolean;
      name: string;
      description: string;
      price: any;
      minOrderQuantity: any;
      maxOrderQuantity: any;
      publicFields: Array<string>;
      encryptedFields: Array<string>;
    }>;
  }>;
};

export type AllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type AllProductsQuery = {
  __typename?: "Query";
  vendors: Array<{
    __typename?: "Vendor";
    name: string;
    website: string;
    description: string;
    products: Array<{
      __typename?: "Product";
      productId: any;
      active: boolean;
      name: string;
      description: string;
      price: any;
      minOrderQuantity: any;
      maxOrderQuantity: any;
      publicFields: Array<string>;
      encryptedFields: Array<string>;
    }>;
  }>;
};

export const OrdersByMemberDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "OrdersByMember" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "member" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Bytes" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "vendors" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "member" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "member" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "products" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "publicFields" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "encryptedFields" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "orders" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "orderId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "quantity" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "orderTotal" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "status" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "publicFields" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "encryptedFields" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OrdersByMemberQuery, OrdersByMemberQueryVariables>;
export const ProductsByMemberDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ProductsByMember" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "member" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Bytes" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "vendors" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "member" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "member" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "products" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "productId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "productId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "active" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "minOrderQuantity" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "maxOrderQuantity" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "publicFields" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "encryptedFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProductsByMemberQuery,
  ProductsByMemberQueryVariables
>;
export const AllProductsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllProducts" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "vendors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "website" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "products" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "where" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "active" },
                            value: { kind: "BooleanValue", value: true },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "productId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "productId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "active" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "minOrderQuantity" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "maxOrderQuantity" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "publicFields" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "encryptedFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllProductsQuery, AllProductsQueryVariables>;

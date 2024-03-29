/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query OrdersByMember($member: Bytes) {\n    vendors(where: { member: $member }) {\n      tokenId\n      products {\n        name\n        publicFields\n        encryptedFields\n        orders {\n          orderId\n          quantity\n          orderTotal\n          status\n          publicFields\n          encryptedFields\n        }\n      }\n    }\n  }\n": types.OrdersByMemberDocument,
    "\n  query ProductsByMember($member: Bytes) {\n    vendors(where: { member: $member }) {\n      name\n      products {\n        productId\n        active\n        name\n        description\n        price\n        minOrderQuantity\n        maxOrderQuantity\n        publicFields\n        encryptedFields\n      }\n    }\n  }\n": types.ProductsByMemberDocument,
    "\n  query VendorsIncludeProducts {\n    vendors {\n      name\n      website\n      description\n      products(where: { active: true }) {\n        productId\n        active\n        name\n        description\n        price\n        minOrderQuantity\n        maxOrderQuantity\n        publicFields\n        encryptedFields\n      }\n    }\n  }\n": types.VendorsIncludeProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OrdersByMember($member: Bytes) {\n    vendors(where: { member: $member }) {\n      tokenId\n      products {\n        name\n        publicFields\n        encryptedFields\n        orders {\n          orderId\n          quantity\n          orderTotal\n          status\n          publicFields\n          encryptedFields\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query OrdersByMember($member: Bytes) {\n    vendors(where: { member: $member }) {\n      tokenId\n      products {\n        name\n        publicFields\n        encryptedFields\n        orders {\n          orderId\n          quantity\n          orderTotal\n          status\n          publicFields\n          encryptedFields\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductsByMember($member: Bytes) {\n    vendors(where: { member: $member }) {\n      name\n      products {\n        productId\n        active\n        name\n        description\n        price\n        minOrderQuantity\n        maxOrderQuantity\n        publicFields\n        encryptedFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductsByMember($member: Bytes) {\n    vendors(where: { member: $member }) {\n      name\n      products {\n        productId\n        active\n        name\n        description\n        price\n        minOrderQuantity\n        maxOrderQuantity\n        publicFields\n        encryptedFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VendorsIncludeProducts {\n    vendors {\n      name\n      website\n      description\n      products(where: { active: true }) {\n        productId\n        active\n        name\n        description\n        price\n        minOrderQuantity\n        maxOrderQuantity\n        publicFields\n        encryptedFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query VendorsIncludeProducts {\n    vendors {\n      name\n      website\n      description\n      products(where: { active: true }) {\n        productId\n        active\n        name\n        description\n        price\n        minOrderQuantity\n        maxOrderQuantity\n        publicFields\n        encryptedFields\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
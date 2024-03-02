/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import { formatUnits } from "viem";
import { useWalletClient } from "wagmi";

import { Button, Card, Text } from "ui-kit";

import { decryptFields } from "@/utils/decryptFields";
import { useUpdateOrderStatus } from "@/web3/hooks/useUpdateOrderStatus";

const STATUS = [
  "Pending",
  "Accepted",
  "Fulfilled",
  "Cancelled",
  "Expired",
] as const;

const ENCRYPTED_DATA_INITIAL_STATE = "__ENCRYPTED__";

function OrderActions({
  orderId,
  status,
}: {
  orderId: bigint;
  status: number;
}) {
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const content = {
    0: (
      <>
        <Button
          variant="destructive"
          onClick={() =>
            updateStatus(
              {
                orderId,
                newStatus: 3,
              },
              {
                onError: (error) => {
                  console.error(error);
                },
              },
            )
          }
        >
          Decline
        </Button>
        <Button
          onClick={() =>
            updateStatus({
              orderId,
              newStatus: 1,
            })
          }
        >
          Accept
        </Button>
      </>
    ),
    1: (
      <>
        <Button
          variant="destructive"
          onClick={() =>
            updateStatus({
              orderId,
              newStatus: 3,
            })
          }
        >
          Cancel Order
        </Button>
        <Button
          onClick={() =>
            updateStatus({
              orderId,
              newStatus: 2,
            })
          }
        >
          Mark as Fulfilled
        </Button>
      </>
    ),
  }[status] || (
    <Text.Muted className="ml-auto">Status: {STATUS[status]}</Text.Muted>
  );

  return <div className="ml-auto flex gap-2">{content}</div>;
}

export function VendorOrderCard({
  orderId,
  productName,
  status,
  quantity,
  orderTotal,
  publicFields,
  publicFieldValues,
  encryptedFields,
  encryptedFieldsData,
}: {
  orderId: bigint;
  productName: string;
  status: number;
  quantity: bigint;
  orderTotal: bigint;
  publicFields: string[];
  publicFieldValues: string[];
  encryptedFields: string[];
  encryptedFieldsData: string;
}) {
  const wallet = useWalletClient();
  const [decryptedData, setDecryptedData] = useState(
    ENCRYPTED_DATA_INITIAL_STATE,
  );
  const hasEncryptedFields = encryptedFields.length > 0;
  const hasDecryptedData = decryptedData !== ENCRYPTED_DATA_INITIAL_STATE;
  const parsedDecryptedData = useMemo(() => {
    if (!hasDecryptedData) return null;
    try {
      return JSON.parse(decryptedData);
    } catch (error) {
      return ["error parsing decrypted data"];
    }
  }, [decryptedData, hasDecryptedData]);

  return (
    <Card className="py-4 px-6 w-full mb-6">
      <div className="flex items-center gap-2">
        <Text.Large>Product: {productName}</Text.Large>
        <Text.Muted>(Order id: {Number(orderId)})</Text.Muted>
        <OrderActions orderId={orderId} status={status} />
      </div>

      <div className="grid my-2">
        <div className="flex items-center gap-2">
          <Text.Muted>Status:</Text.Muted>
          <Text.Plain>{STATUS[status]}</Text.Plain>
        </div>
        <div className="flex items-center gap-2">
          <Text.Muted>Quantity:</Text.Muted>
          <Text.Plain>{Number(quantity)}</Text.Plain>
        </div>
        <div className="flex items-center gap-2">
          <Text.Muted>Order total:</Text.Muted>
          <Text.Plain>{formatUnits(orderTotal, 6)} USDC</Text.Plain>
        </div>
        <div>
          <Text.Muted>Public Fields:</Text.Muted>
          <div>
            {publicFields?.map((field, i) => {
              const isImage = field.includes("image");
              const fieldValue = publicFieldValues[i];
              return (
                <div
                  className={
                    isImage
                      ? "ml-4 flex flex-col gap-2"
                      : "ml-4 flex items-center gap-2"
                  }
                  key={i}
                >
                  <Text.Muted>
                    <span className="text-primary">•</span> {field}:
                  </Text.Muted>
                  {isImage ? (
                    <div>
                      <img alt="" height={100} width={100} src={fieldValue} />
                      <a href={fieldValue} target="_blank" rel="noreferrer">
                        <Text.Small className="text-blue-500 hover:underline">
                          Open in new tab
                        </Text.Small>
                      </a>
                    </div>
                  ) : (
                    <Text.Plain>{fieldValue}</Text.Plain>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Text.Muted>Encrypted Fields:</Text.Muted>
          <div>
            {hasEncryptedFields &&
              hasDecryptedData &&
              encryptedFields?.map((field, i) => (
                <div className="flex items-center gap-2" key={i}>
                  <Text.Muted className="ml-4">
                    <span className="text-destructive">•</span> {field}:
                  </Text.Muted>
                  <Text.Plain>{parsedDecryptedData[i]}</Text.Plain>
                </div>
              ))}
            {hasEncryptedFields && !hasDecryptedData && (
              <Button
                className="mt-2"
                variant="secondary"
                onClick={async () => {
                  const userAddress = wallet.data?.account.address;
                  if (!userAddress) return;
                  const decryptedData = await decryptFields(
                    encryptedFieldsData,
                    userAddress,
                  );
                  setDecryptedData(decryptedData);
                }}
              >
                Decrypt Fields
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

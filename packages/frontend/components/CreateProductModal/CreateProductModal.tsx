import { parseUnits } from "viem";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  Form,
  Input,
  Switch,
  Textarea,
  useToast,
} from "ui-kit";

import { getFormFields } from "@/utils/formUtils";
import { useCreateProduct } from "@/web3/hooks/useCreateProduct";

const FORM_FIELDS = {
  name: "name",
  price: "price",
  minOrderQuantity: "minOrderQuantity",
  maxOrderQuantity: "maxOrderQuantity",
  active: "active",
  publicFields: "publicFields",
  encryptedFields: "encryptedFields",
  description: "description",
} as const;

type Props = {
  vendorTokenId: bigint;
  onClose: () => void;
};

export function CreateProductModal({ vendorTokenId, onClose }: Props) {
  const createProduct = useCreateProduct();
  const { toast } = useToast();

  return (
    <Dialog
      open
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new product.
          </DialogDescription>
        </DialogHeader>
        <Form
          id="create-product-form"
          onSubmit={(e) => {
            e.preventDefault();

            const fields = Object.keys(
              FORM_FIELDS,
            ) as (keyof typeof FORM_FIELDS)[];
            const formFields = getFormFields(e.currentTarget.elements, fields);

            const publicFields =
              formFields.publicFields.trim().length > 0
                ? formFields.publicFields.split(",").map((s) => s.trim())
                : [];

            const encryptedFields =
              formFields.encryptedFields.trim().length > 0
                ? formFields.encryptedFields.split(",").map((s) => s.trim())
                : [];

            createProduct.mutate(
              [
                formFields.name,
                formFields.description,
                parseUnits(formFields.price, 6),
                BigInt(formFields.minOrderQuantity),
                BigInt(formFields.maxOrderQuantity),
                formFields.active === "true",
                vendorTokenId,
                publicFields,
                encryptedFields,
              ],
              {
                onSuccess: () => {
                  toast({
                    title: "Success!",
                    description: "Your product has been created successfully",
                  });
                  onClose();
                },
                onError: () => {
                  toast({
                    title: "Error!",
                    description: "There was an error creating your product",
                    variant: "destructive",
                  });
                  onClose();
                },
              },
            );
          }}
        >
          <Field label="Name">
            <Input name={FORM_FIELDS.name} autoComplete="off" />
          </Field>
          <Field label="Price">
            <Input name={FORM_FIELDS.price} autoComplete="off" />
          </Field>
          <div className="flex gap-4">
            <Field label="Mininum Order Quantity">
              <Input name={FORM_FIELDS.minOrderQuantity} autoComplete="off" />
            </Field>
            <Field label="Maxiumum Order Quantity">
              <Input name={FORM_FIELDS.maxOrderQuantity} autoComplete="off" />
            </Field>
          </div>
          <div className="flex gap-4">
            <Field label="Public Fields (comma separated)">
              <Input name={FORM_FIELDS.publicFields} autoComplete="off" />
            </Field>
            <Field label="Encrypted Fields (comma separated)">
              <Input name={FORM_FIELDS.encryptedFields} autoComplete="off" />
            </Field>
          </div>
          <Field label="Active">
            <Switch name={FORM_FIELDS.active} />
          </Field>
          <Field label="Description">
            <Textarea name={FORM_FIELDS.description} />
          </Field>
        </Form>
        <DialogFooter>
          <Button form="create-product-form">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

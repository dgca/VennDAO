import { useIsClient } from "usehooks-ts";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Form,
  Input,
  Switch,
  Textarea,
} from "ui-kit";

export function CreateOrderDialog() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new product.
          </DialogDescription>
        </DialogHeader>
        <Form>
          <Field label="Name">
            <Input autoComplete="off" />
          </Field>
          <Field label="Price">
            <Input autoComplete="off" />
          </Field>
          <div className="flex gap-4">
            <Field label="Mininum Order Quantity">
              <Input autoComplete="off" />
            </Field>
            <Field label="Maxiumum Order Quantity">
              <Input autoComplete="off" />
            </Field>
          </div>
          <Field label="Active">
            <Switch />
          </Field>
          <Field label="Description">
            <Textarea />
          </Field>
        </Form>
        <DialogFooter>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

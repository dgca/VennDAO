import { ReactNode, forwardRef } from "react";

import { cn } from "ui-utils";

import { Label } from "./label";
import { Text } from "./text";

type Props = {
  label: ReactNode;
  children: ReactNode;
  optional?: boolean;
  error?: string;
  className?: string;
};

const Field = forwardRef<HTMLLabelElement, Props>(
  ({ label, optional, error, children, className }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("grid w-full items-center gap-1.5", className)}
      >
        <Label asChild>
          <div>
            {label}
            {`${optional ? " (optional)" : ""}`}
          </div>
        </Label>
        {children}
        {error && <Text.Small className="text-red-500">{error}</Text.Small>}
      </label>
    );
  },
);

Field.displayName = "Field";

export { Field };

import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  RefAttributes,
} from "react";

import { cn } from "ui-utils";

type FormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type FormType = ForwardRefExoticComponent<
  FormProps & RefAttributes<HTMLFormElement>
> & {
  Actions: typeof Actions;
};

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <form ref={ref} className={cn("grid gap-6", className)} {...rest}>
        {children}
      </form>
    );
  },
) as FormType;

Form.displayName = "Form";

type ActionsProps = InputHTMLAttributes<HTMLDivElement>;

const Actions = forwardRef<HTMLDivElement, ActionsProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex justify-end gap-2 mt-2", className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Actions.displayName = "Actions";

Form.Actions = Actions;

export { Form };

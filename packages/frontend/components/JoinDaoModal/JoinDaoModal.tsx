import { useRouter } from "next/router";
import { CgSpinnerTwoAlt } from "react-icons/cg";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Text,
} from "ui-kit";

import { Steps } from "@/web3/hooks/useJoinDao";

type Props = {
  step: Steps;
  onClose: () => void;
};

export function JoinDaoModal({ step, onClose }: Props) {
  const router = useRouter();

  if (step === "pending") return null;

  const heading = {
    approve: "Approve spend",
    join: "Mint your membership",
    error: "Something went wrong",
    success: "Success!",
  }[step];
  const body = {
    approve:
      "The membership fee is $50 USDC. Please approve the spend so we can mint your membership.",
    join: "Confirm the transaction to join the DAO",
    error: "There was an error processing your request. Please try again.",
    success: "Welcome to the DAO 🎉!",
  }[step];

  return (
    <Dialog open>
      <DialogContent dismissable={false}>
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
        </DialogHeader>
        <Text.Plain>{body}</Text.Plain>
        <div className="flex justify-center text-xl">
          {step === "success" && (
            <Button
              className="grow"
              onClick={() => {
                router.push("/dao/products");
              }}
            >
              Get Started
            </Button>
          )}
          {step === "error" && (
            <Button className="grow" onClick={onClose}>
              Close
            </Button>
          )}
          {step !== "success" && step !== "error" && (
            <div className="animate-spin">
              <CgSpinnerTwoAlt />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

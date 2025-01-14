import { useState } from "react";
import { SlotMachine } from "../SlotMachine/SlotMachine";
import { useRollDraw } from "@/state/draws/useRollDraw";
import { Button } from "@/elements";

interface DrawMachineProps extends Common.ComponentProps {
  drawId: string;
}

export const DrawMachine = ({ testID, ...props }: DrawMachineProps) => {
  const { roll, selected, loading } = useRollDraw(props.drawId);

  return (
    <div data-testid={testID} className="grid p-5">
      <SlotMachine testID={testID} selected={selected} />
      <Button testID={`${testID}.roll`} onClick={roll} disabled={loading}>
        Roll
      </Button>
    </div>
  );
};
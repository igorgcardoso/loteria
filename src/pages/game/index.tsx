import { Separator } from "@/components/ui/separator";
import { Contest } from "./contest";
import { Generated } from "./generated";
import { Generator } from "./generator";
import { Header } from "./header";

export function Game() {
  return (
    <div className="flex max-h-screen flex-col gap-6">
      <Header />
      <div className="flex flex-col gap-5">
        <Contest />
        <Separator />
        <Generator />
        <Separator />
        <Generated />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <p className="text-rose-500">Hello World</p>
      <div className="flex w-full gap-2">
        <Button variant="elevated">I am Button</Button>
        <Input placeholder="Input" className="w-64" />
        <Progress value={50} className="w-64" />

        <Checkbox value="One" />
      </div>
    </div>
  );
}

import {Button} from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-column">
    <p className="text-3xl font-bold text-indigo-500">This is a protected route.</p>
    <Button>Click me</Button>
    </div>
  )
}

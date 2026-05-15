import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="py-32">
      <div className="mx-auto max-w-xl text-center glass rounded-2xl p-10">
        <Compass className="h-12 w-12 text-plotter mx-auto mb-4 animate-pulse" />
        <h1 className="font-display text-5xl font-bold text-foam mb-3">
          Lost at sea
        </h1>
        <p className="text-foam/70 mb-8">
          That page doesn't exist on this chart. Let's get you back on course.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <ButtonLink href="/" variant="primary">Home</ButtonLink>
          <ButtonLink href="/maps" variant="secondary">Browse Maps</ButtonLink>
        </div>
      </div>
    </Container>
  );
}

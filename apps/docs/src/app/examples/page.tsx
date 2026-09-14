import { permanentRedirect } from "next/navigation";

export default function ExamplesRedirect() {
  permanentRedirect("/recipes");
}

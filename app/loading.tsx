import { Slab } from "react-loading-indicators";

export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <Slab color={["#c32fc9", "#c9762f", "#35c92f", "#2f82c9"]} />;
}

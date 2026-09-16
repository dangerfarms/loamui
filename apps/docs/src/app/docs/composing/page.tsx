import { permanentRedirect } from "next/navigation";

export default function ComposingRedirect() {
  if (process.env.PAGES !== "true") permanentRedirect("/recipes/guide");

  const destination = `${process.env.BASE_PATH ?? ""}/recipes/guide/`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <p>
        This guide has moved to <a href={destination}>Building your own recipes</a>.
      </p>
    </>
  );
}

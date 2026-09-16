import { permanentRedirect } from "next/navigation";

export default function InstallationRedirect() {
  if (process.env.PAGES !== "true") permanentRedirect("/docs/installation");

  const destination = `${process.env.BASE_PATH ?? ""}/docs/installation/`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <p>
        This guide has moved to <a href={destination}>Installation</a>.
      </p>
    </>
  );
}

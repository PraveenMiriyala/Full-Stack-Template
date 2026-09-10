import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import config from "@payload-config";
import { importMap } from "../importMap";
import "@payloadcms/next/css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={async (args) => {
        "use server";
        return handleServerFunctions({
          ...args,
          config,
          importMap,
        });
      }}
    >
      {children}
    </RootLayout>
  );
}

import { type MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useRef, useState } from "react";
import initSwc, { transformSync } from "@swc/wasm-web";
import { useFetcher } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const fetcher = useFetcher<{ code: string }>();

  const compiledRef = useRef(false);

  const [_, updater] = useState(0);

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc();
      fetcher.load("/api/compile");
    }
    importAndRunSwcOnMount();
  }, []);

  useEffect(() => {
    if (compiledRef.current || fetcher.state !== "idle" || !fetcher.data) {
      return;
    }
    const code = fetcher.data.code;
    const result = transformSync(code, {
      jsc: {
        target: "es2022",
        parser: {
          syntax: "ecmascript",
          jsx: true,
        },
      },
      module: {
        type: "commonjs",
      },
    });
    compiledRef.current = true;
    console.log(result);
  }, [fetcher.state, fetcher.data]);

  function compile() {
    updater((prev) => prev + 1);
    // if (!initialized) {
    //   return;
    // }
  }

  return (
    <div className="App">
      <button onClick={compile}>Compile</button>
      <script
        type="importmap"
        dangerouslySetInnerHTML={{
          __html: `{
            "imports": {
              "react": "https://esm.sh/react@19.1.0",
              "react-dom/": "https://esm.sh/react-dom@19.1.0/"
            }
          }`,
        }}
      />
      <script src="https://esm.sh/react?raw"></script>
    </div>
  );
}

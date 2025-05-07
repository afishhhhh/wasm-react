import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import initSwc, { transformSync } from "@swc/wasm-web";
import { useFetcher, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const fetcher = useFetcher();

  const [initialized, setInitialized] = useState(false);

  // useEffect(() => {
  //   async function importAndRunSwcOnMount() {
  //     await initSwc();
  //     setInitialized(true);
  //   }
  //   importAndRunSwcOnMount();
  // }, []);

  function compile() {
    fetcher.load("/api/compile");
    // if (!initialized) {
    //   return;
    // }
    // const result = transformSync(sourceCode, {
    //   jsc: {
    //     target: "es2022",
    //     parser: {
    //       syntax: "ecmascript",
    //       jsx: true,
    //     },
    //   },
    //   module: {
    //     type: "es6",
    //   },
    // });
    // console.log(result);
  }

  console.log("fetcher: ", fetcher.state, fetcher.data);

  return (
    <div className="App">
      <button onClick={compile}>Compile</button>
    </div>
  );
}

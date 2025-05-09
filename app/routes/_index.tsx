import {
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import React, { useEffect, useMemo, useRef } from "react";
import { useLoaderData } from "@remix-run/react";
import { compile } from "~/compile.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json(await compile());
};

export default function Index() {
  const data = useLoaderData<{
    code: string;
    deps: string[];
    defaultExport: string;
  }>();

  useEffect(() => {
    const resolveComponent = () => {
      const code = data?.code;

      if (!code) {
        return;
      }

      let exports = {
        default: null,
      };
      const evalFn = eval(`(exports, require) => code => eval(code)`);
      evalFn(
        exports,
        (module: string) => (window as any).__require_modules__[module]
      )(code);

      const component = exports.default;
      if (component) {
        const React = (window as any).__require_modules__.react;
        const ReactDOM = (window as any).__require_modules__["react-dom"];
        render(React, ReactDOM, component as React.FunctionComponent);
      }
    };

    window.addEventListener("requiredModulesLoaded", resolveComponent, {
      once: true,
    });

    return () => {
      window.removeEventListener("requiredModulesLoaded", resolveComponent);
    };
  }, [data?.code]);

  // function injectScript(script: string) {
  //   const component = fetcher.data?.defaultExport;

  //   if (!component) {
  //     return Promise.reject();
  //   }

  //   return new Promise<void>((resolve, reject) => {
  //     const code = `${script};window.InjectComponent = ${component};`;
  //     const blob = new Blob([code], { type: "text/javascript" });
  //     const scriptURL = URL.createObjectURL(blob);
  //     const el = document.createElement("script");
  //     el.type = "module";
  //     el.src = scriptURL;
  //     el.onload = () => {
  //       URL.revokeObjectURL(scriptURL);
  //       resolve();
  //     };
  //     el.onerror = (e) => {
  //       URL.revokeObjectURL(scriptURL);
  //       reject(e);
  //     };
  //     document.body.appendChild(el);
  //   });
  // }

  function render(
    React: any,
    ReactDOM: any,
    Component: React.FunctionComponent
  ) {
    const dom = shadowRef.current!;
    // const root = document.createElement("div");
    // shadowRoot.appendChild(root);
    // shadowRoot.appendChild(css);
    ReactDOM.createRoot(dom).render(React.createElement(Component));
  }

  const shadowRef = useRef<HTMLDivElement>(null);

  const importmap = useMemo(() => {
    const deps = data?.deps;

    if (deps?.length) {
      const imports = deps.reduce<Record<string, string>>(
        (map, dep) => {
          map[dep] = `https://esm.sh/${dep}?deps=react@18.3.1,react-dom@18.3.1`;
          return map;
        },
        {
          react: "https://esm.sh/react@18.3.1",
          "react-dom": "https://esm.sh/react-dom@18.3.1",
        }
      );

      return `{"imports": ${JSON.stringify(imports)}}`;
    }

    return null;
  }, [data?.deps?.length]);

  const requireModules = useMemo(() => {
    const deps = data?.deps;

    if (deps?.length) {
      const _deps = [...deps, "react", "react-dom"];
      const imports = _deps.map(
        (dep, index) => `import * as M_${index} from '${dep}';`
      );
      const moduleMap = _deps.reduce<Record<string, string>>(
        (map, dep, index) => ((map[dep] = `M_${index}`), map),
        {}
      );

      return `${imports.join("")}window.__require_modules__ = ${JSON.stringify(
        moduleMap
      ).replace(
        /"M_(\d+)"/g,
        "M_$1"
      )};window.dispatchEvent(new Event('requiredModulesLoaded'))`;
    }

    return null;
  }, [data?.deps?.length]);

  return (
    <>
      <div ref={shadowRef} />
      <script
        type="importmap"
        dangerouslySetInnerHTML={importmap ? { __html: importmap } : undefined}
      />
      <script
        type="module"
        dangerouslySetInnerHTML={
          requireModules ? { __html: requireModules } : undefined
        }
      />
    </>
  );
}

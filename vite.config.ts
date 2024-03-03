// import build from "@hono/vite-cloudflare-pages";
// import devServer from "@hono/vite-dev-server";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [
//     build(),
//     devServer({
//       entry: "src/index.tsx",
//     }),
//   ],
// });

// import pages from "@hono/vite-cloudflare-pages";
// import devServer from "@hono/vite-dev-server";
// import { defineConfig } from "vite";
// import { getPlatformProxy } from 'wrangler';

// export default defineConfig(async ({ mode }) => {
//   if (mode === "client") {
//     return {
//       build: {
//         rollupOptions: {
//           input: "./src/client.tsx",
//           output: {
//             entryFileNames: "static/client.js",
//           },
//         },
//       },
//     };
//   }
//   const { env, dispose } = await getPlatformProxy();

//   return {
//     ssr: {
//       external: ["react", "react-dom"],
//     },
//     plugins: [
//       pages(),
//       devServer({
//         plugins: [{ onServerClose: dispose, env }],
//         entry: "src/index.tsx",
//       }),
//     ],
//   };
// });

// import pages from "@hono/vite-cloudflare-pages";
// import devServer from "@hono/vite-dev-server";
// import { defineConfig } from "vite";
// import { getPlatformProxy } from "wrangler";

// export default defineConfig(async ({ mode }) => {
//   if (mode === "client") {
//     return {
//       build: {
//         rollupOptions: {
//           input: "./src/client.tsx",
//           output: {
//             entryFileNames: "static/client.js",
//           },
//         },
//       },
//     };
//   }

//   const { env, dispose, caches } = await getPlatformProxy();

//   Object.defineProperties(globalThis, {
//     caches: { value: caches, writable: true, configurable: true },
//     scheduler: {
//       // To use scheduler.wait API
//       value: {
//         wait: () => {},
//       },
//       writable: true,
//       configurable: true,
//     },
//   });
//   return {
//     build: {
//       rollupOptions: {
//         external: ["react", "react-dom", "__STATIC_CONTENT_MANIFEST"],
//       },
//     },
//     ssr: {
//       external: ["react", "react-dom", "__STATIC_CONTENT_MANIFEST"],
//     },
//     plugins: [
//       pages(),
//       devServer({
//         adapter: {
//           env,
//           onServerClose: dispose,
//         },
//         entry: "./src/worker.ts",
//       }),
//     ],
//   };
// });


// import { defineConfig } from "vite";

// import CloudflarePagesFunctions from "vite-plugin-cloudflare-functions";

// export default defineConfig({
// 	plugins: [CloudflarePagesFunctions({
//     wrangler: {
//         // Bind Durable Object
//         do: {
//           DO: 'DO'
//         },
//       }
//     })
//   ]
// });


import pages from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import { getPlatformProxy } from "wrangler";
import CloudflarePagesFunctions from "vite-plugin-cloudflare-functions";

export default defineConfig(async ({ mode }) => {
  return {
		ssr: {
			external: ["react", "react-dom"],
		},
		plugins: [
			pages(),
			devServer({
				entry: "src/index.tsx",
			}),
			CloudflarePagesFunctions({
				wrangler: {
					// Bind Durable Object
					do: {
						DO: "DO",
					},
				},
			}),
		],
	};
})
import { renderToString } from 'react-dom/server';
import { Hono } from "hono";
import { cors } from "hono/cors";
import { YDurableObjects, yRoute } from "y-durableobjects";

const app = new Hono();

app.use("*", cors());

app.get('/', (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" />
          {import.meta.env.PROD ? (
              <script type="module" src="/static/client.js"></script>
          ) : (
              <script type="module" src="/src/client.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

const route = app.route(
	"/editor",
	yRoute((env) => env.Y_DURABLE_OBJECTS)
);

export default route;

export { YDurableObjects };

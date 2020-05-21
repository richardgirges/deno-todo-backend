import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as Todo from "./todo.ts";

const router = new Router();

router.get("/", async ({ response }) => {
  try {
    response.body = await Todo.getAll();
  } catch (e) {
    response.status = 500;
    response.body = e.message;
  }
});

router.get<{ id: string }>("/:id", async ({ params, response }) => {
  try {
    const id = parseInt(params.id);
    response.body = await Todo.getOne(id);
  } catch (e) {
    response.status = 500;
    response.body = e.message;
  }
});

router.post("/", async ({ request, response }) => {
  try {
    if (!request.hasBody) {
      throw new Error("invalid request body");
    }

    const body = await request.body();

    if (!body.value.title) {
      throw new Error('"title" is required');
    }

    response.body = await Todo.create({
      title: body.value.title,
      order: body.value.order,
      completed: body.value.completed,
    });
  } catch (e) {
    response.status = 500;
    response.body = e.message;
  }
});

router.patch<{ id: string }>("/:id", async ({ params, request, response }) => {
  try {
    if (!request.hasBody) {
      throw new Error("invalid request body");
    }

    const id = parseInt(params.id);
    const body = await request.body();

    response.body = await Todo.updateOne(id, {
      title: body.value.title,
      order: body.value.order,
    });
  } catch (e) {
    response.status = 500;
    response.body = e.message;
  }
});

router.delete("/", async ({ response }) => {
  try {
    response.body = await Todo.deleteAll();
  } catch (e) {
    response.status = 500;
    response.body = e.message;
  }
});

router.delete<{ id: string }>("/:id", async ({ params, response }) => {
  try {
    const id = parseInt(params.id);
    response.body = await Todo.deleteOne(id);
  } catch (e) {
    response.status = 500;
    response.body = e.message;
  }
});

const port = 3000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on http://localhost:${port}`);
await app.listen({ port });

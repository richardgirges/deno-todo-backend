import { dbClient } from "./db.ts";

function massageTodoRecord(record?: Array<string | number>) {
  if (!record) {
    return null;
  }

  return {
    id: record[0],
    title: record[1],
    order: record[2],
  };
}

export const getAll = async () => {
  const result = await dbClient.query(
    'SELECT id, title, "order" FROM todo ORDER BY "order"',
  );

  return result.rows.map(massageTodoRecord);
};

export const getOne = async (id: number) => {
  const result = await dbClient.query(
    'SELECT id, title, "order" FROM todo WHERE id = $1',
    id,
  );

  return massageTodoRecord(result.rows[0]);
};

export const create = async (title: string, order: number) => {
  const result = await dbClient.query(
    'INSERT INTO todo (title, "order") VALUES ($1, $2) RETURNING *',
    title,
    order,
  );

  return massageTodoRecord(result.rows[0]);
};

export const updateOne = async (
  id: number,
  properties: { title?: string; order?: number },
) => {
  const todo = await getOne(id);

  if (!todo) {
    throw new Error(`Todo with id ${id} not found.`);
  }

  // cosmetically update the todo title and order fields
  todo.title = properties.title !== undefined ? properties.title : todo.title;
  todo.order = properties.order !== undefined ? properties.order : todo.order;

  // update the record in the DB
  const result = await dbClient.query(
    'UPDATE todo SET title = $1, "order" = $2 WHERE id = $3',
    todo.title,
    todo.order,
    id,
  );

  return todo;
};

export const deleteOne = async (id: number) => {
  const result = await dbClient.query(
    "DELETE FROM todo WHERE id = $1 RETURNING *",
    id,
  );

  return massageTodoRecord(result.rows[0]);
};

export const deleteAll = async () => {
  const result = await dbClient.query("DELETE FROM todo RETURNING *");

  return result.rows.map(massageTodoRecord);
};

import { get, update } from "@reshuffle/db";
import { useSession } from '@reshuffle/server-function';

function assertSession() {
  const session = useSession();
  if (session === undefined) {
    throw new Error('Login needed');
  }
  return session;
}

/* @expose */
export async function addNewTodo(todo = {}) {
  const { id } = assertSession();
  // what you will return here will be directly updated in backend and returned in frontend
  return update(`/todos/${id}`, (todos = []) => todos.concat(todo));
}

/* @expose */
export async function getTodoList() {
  const { id } = assertSession();
  // get all todolist
  return get(`/todos/${id}`);
}

/**
 * Delete a specific todo item
 */
/* @expose */
export async function deleteTodoById(todoId) {
  const { id } = assertSession();
  // what you will return here will be directly updated in backend and returned in frontend
  return update(`/todos/${id}`, (todos = []) => todos.filter((todo) => todo.id !== todoId));
}

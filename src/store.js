import { writable, derived } from "svelte/store";

export const isAuthenticated = writable(false); //Defines the authenticated state of the user, true when a user is authenticated, false by default.
export const user = writable({}); //Holds the details of an authenticated user returned by Auth0 after successful authentication.
export const popupOpen = writable(false); //The sign-in process will be initiated using Auth0's popup authentication modal. This is to monitor the visible state of the popup modal.
export const error = writable(); //Holds the error information if the authentication process fails.

export const tasks = writable([]); //Holds all tasks created in the application

// A derived state property that filters the tasks in the application to only return the ones created by the logged-in user.
export const user_tasks = derived([tasks, user], ([$tasks, $user]) => {
  let logged_in_user_tasks = [];

  if ($user && $user.email) {
    logged_in_user_tasks = $tasks.filter((task) => task.user === $user.email);
  }

  return logged_in_user_tasks;
});

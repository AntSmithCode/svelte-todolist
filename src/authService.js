import createAuth0Client from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "./store";
import config from "../auth_config";

//Uses Auth0's createAuth0Client function and the authentication configuration to create a new authentication client and returns it.
async function createClient() {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });

  return auth0Client;
}

//Takes in an authentication client instance with defined options and uses these to call the loginWithPopup on the client to sign-in and user. It then sets isAuthenticated to true and user to the user details returned by the logged-in client.
async function loginWithPopup(client, options) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

//This is simply a proxy to the Auth0 client's logout method that ends a logged-in user's session.
function logout(client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
};

export default auth;

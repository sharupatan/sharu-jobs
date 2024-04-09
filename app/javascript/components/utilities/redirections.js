import { DOMAIN, HOME_PATH, LOGIN_PATH, SIGNUP_PATH } from "./navigations";

const redirect = (path) => {
  window.location.replace(path);
};

export const redirect_root_path = () => {
  redirect(HOME_PATH);
};

export const redirect_login_path = () => {
  redirect(LOGIN_PATH);
};

export const redirect_signup_path = () => {
  redirect(SIGNUP_PATH);
};

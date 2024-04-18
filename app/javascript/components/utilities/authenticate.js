import { DOMAIN } from "./navigations";

const verify_user = async () => {
  const url = `${DOMAIN}/login_status`;
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => Object.keys(data).length > 0)
    .catch((e) => console.log(e.message));
};

export default verify_user;

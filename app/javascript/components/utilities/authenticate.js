import { DOMAIN } from "./navigations";

const verify_user = async (needProfile) => {
  const url = `${DOMAIN}/login_status`;
  const result = await fetch(url)
    .then((res) => res.json())
    .then((data) => (needProfile ? data : Object.keys(data).length > 0))
    .catch((e) => console.log(e.message));
  return result;
};

export default verify_user;

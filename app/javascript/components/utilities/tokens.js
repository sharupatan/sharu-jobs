export const get_csrf_token = () => {
  document.querySelector('meta[name="csrf-token"]').getAttribute("content");
};

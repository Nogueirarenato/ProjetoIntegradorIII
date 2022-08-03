export const TOKEN_KEY = "patioAltino";
export const usuarioAutenticado = () => localStorage.getItem(TOKEN_KEY) !== null;






export const getToken = () => {
  var base64Url = localStorage.getItem("patioAltino")
  var base64 = base64Url

  return JSON.parse(window.atob(base64));
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
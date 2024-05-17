export function getToken() {
  const tokenFromStorage = localStorage.getItem("token");
  const tokenFromCookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return tokenFromStorage || tokenFromCookie || "";
}

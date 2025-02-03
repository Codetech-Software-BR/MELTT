export const setToken = (token: string) => {
  localStorage.setItem("@meltt-user-token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("@meltt-user-token");
  if (token) {
    return token;
  } else {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem("@meltt-user-token");
}

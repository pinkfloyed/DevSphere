// src/utils/authUtils.js
export const getUser = () => {
  return JSON.parse(localStorage.getItem('devsphere-user')) || null;
};

export const saveUser = (user) => {
  localStorage.setItem('devsphere-user', JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem('devsphere-user');
};

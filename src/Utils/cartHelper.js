// src/Utils/cartHelper.js
export const triggerCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

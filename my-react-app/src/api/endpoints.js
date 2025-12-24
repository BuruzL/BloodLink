import { api } from "./client";

// NOTE: these are placeholders. Your Node backend can implement these routes.

export const AuthAPI = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};

export const UserAPI = {
  updateProfile: (payload) => api.put("/users/me", payload),
  donorSettings: (payload) => api.put("/donors/settings", payload),
};

export const BloodAPI = {
  createRequest: (payload) => api.post("/requests", payload),
  getRequest: (id) => api.get(`/requests/${id}`),
  searchDonors: (params) => api.get("/donors/search", { params }),
  notifyDonors: (id) => api.post(`/requests/${id}/notify`),
  donorRespond: (id, payload) => api.post(`/requests/${id}/respond`, payload),
  myRequests: () => api.get("/requests/me"),
  donorInbox: () => api.get("/donors/inbox"),
};

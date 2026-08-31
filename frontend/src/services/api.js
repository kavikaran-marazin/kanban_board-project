// Centralized API client for CollabBoard backend

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const getAuthToken = () => {
  try {
    return localStorage.getItem("collabboard-token");
  } catch {
    return null;
  }
};

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${options.method || "GET"}] ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Auth
  auth: {
    register: (userData) =>
      request("/auth/register", {
        method: "POST",
        body: userData,
      }),
    login: (credentials) =>
      request("/auth/login", {
        method: "POST",
        body: credentials,
      }),
  },

  // Boards
  boards: {
    getAll: () => request("/boards"),
    getById: (id) => request(`/boards/${id}`),
    create: (data) =>
      request("/boards", {
        method: "POST",
        body: data,
      }),
    update: (id, data) =>
      request(`/boards/${id}`, {
        method: "PUT",
        body: data,
      }),
    delete: (id) =>
      request(`/boards/${id}`, {
        method: "DELETE",
      }),
  },

  // Columns
  columns: {
    getByBoard: (boardId) => request(`/columns/board/${boardId}`),
    create: (data) =>
      request("/columns", {
        method: "POST",
        body: data,
      }),
    update: (id, data) =>
      request(`/columns/${id}`, {
        method: "PUT",
        body: data,
      }),
    delete: (id) =>
      request(`/columns/${id}`, {
        method: "DELETE",
      }),
  },

  // Tasks
  tasks: {
    getByBoard: (boardId) => request(`/tasks/board/${boardId}`),
    getByColumn: (columnId) => request(`/tasks/column/${columnId}`),
    create: (data) =>
      request("/tasks", {
        method: "POST",
        body: data,
      }),
    update: (id, data) =>
      request(`/tasks/${id}`, {
        method: "PUT",
        body: data,
      }),
    delete: (id) =>
      request(`/tasks/${id}`, {
        method: "DELETE",
      }),
  },
};

export default api;

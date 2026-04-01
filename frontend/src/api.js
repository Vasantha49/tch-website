const API = "http://localhost:5000/api";

export async function apiGet(path) {
  return fetch(API + path).then(res => res.json());
}

export async function apiPost(path, body, token) {
  return fetch(API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: "Bearer " + token })
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
}
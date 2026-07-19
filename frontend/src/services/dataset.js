import API_BASE_URL from "./api";

export async function uploadDataset(file, token) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  return data;
}

export async function getDatasets(token) {
  const response = await fetch(`${API_BASE_URL}/dataset`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}
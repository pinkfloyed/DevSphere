const BASE_URL = 'https://your-postman-mock-url.mock.pstmn.io/projects';

export const fetchProjects = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const addProject = async (project) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error('Failed to add project');
  return res.json();
};

export const updateProject = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
};

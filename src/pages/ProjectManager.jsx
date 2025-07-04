import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const TASKS_PER_PAGE = 5;

export default function ProjectManager() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const toggleComplete = (id) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p))
    );
  };

  const filtered = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'complete'
        ? p.completed
        : !p.completed;
    return matchesSearch && matchesStatus;
  });

  const pageCount = Math.ceil(filtered.length / TASKS_PER_PAGE);
  const offset = currentPage * TASKS_PER_PAGE;
  const currentPageData = filtered.slice(offset, offset + TASKS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const addProject = () => {
    if (!newTaskTitle.trim()) return;
    const newProject = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
    };
    setProjects((prev) => [newProject, ...prev]);
    setNewTaskTitle('');
    setCurrentPage(0);
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const startEditing = (project) => {
    setEditId(project.id);
    setEditTitle(project.title);
  };

  const saveEdit = (id) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title: editTitle.trim() } : p))
    );
    setEditId(null);
    setEditTitle('');
  };

  return (
    <div className="container mt-4">
      <h2>📂 Project Manager</h2>

      <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <button className="btn btn-primary" onClick={addProject}>
          + Add Task
        </button>

        <input
          type="text"
          placeholder="Search tasks..."
          className="form-control flex-grow-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="all">All Tasks</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <ul className="list-group mb-3">
        {currentPageData.length === 0 && <li className="list-group-item">No tasks found.</li>}

        {currentPageData.map((project) => (
          <li
            key={project.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              project.completed ? 'list-group-item-success' : ''
            }`}
          >
            <div className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={project.completed}
                onChange={() => toggleComplete(project.id)}
              />

              {editId === project.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="form-control"
                    style={{ width: '300px' }}
                  />
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => saveEdit(project.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <span
                  style={{
                    textDecoration: project.completed ? 'line-through' : 'none',
                  }}
                >
                  {project.title}
                </span>
              )}
            </div>

            <div className="d-flex gap-2">
              {editId !== project.id && (
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => startEditing(project)}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
          forcePage={currentPage}
        />
      )}
    </div>
  );
}

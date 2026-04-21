import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = ""; // Caminho relativo para funcionar via Proxy do Nginx

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [activeTab, setActiveTab] = useState("tasks");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskImportance, setNewTaskImportance] = useState("Média");

  // Estado para tema (claro/dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Aplicar tema 
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Alternar tema
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchCategories()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/task`);
      console.log("Tarefas carregadas:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories/user/1`);
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert("Por favor, informe o nome da categoria.");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/api/categories`, {
        name: newCategoryName.trim(),
        colorCode: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
        user: { id: 1 }
      });
      setCategories([...categories, response.data]);
      setNewCategoryName("");
      alert("Sucesso!");
    } catch (error) {
      console.log("Erro detalhado do Backend:", error.response?.data);
      alert("Erro ao criar. Olhe o console (F12) para o motivo real.");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/categories/${id}`);

      setCategories(prev => prev.filter(cat => cat.id !== id));

      fetchTasks();

      alert("Categoria removida!");
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      alert("Erro ao excluir. Verifique se existem tarefas vinculadas a ela.");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const payload = {
        nome: newTaskTitle,
        descricao: newTaskDescription,
        importancia: newTaskImportance,
        user: { id: 1 },
      };

      if (selectedCategory) {
        payload.category = { id: selectedCategory };
      }

      const response = await axios.post(`${API_BASE_URL}/api/task`, payload);

      setTasks([...tasks, response.data]);
      setNewTaskTitle("");
      setNewTaskImportance("Média");
      alert("Tarefa adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar tarefa. Detalhes:", error.response?.data);
      alert("Erro ao salvar. Verifique o console (F12).");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const isCompleted = task.descricao && task.descricao.includes(" [CONCLUÍDA]");
      let novaDescricao;

      if (isCompleted) {
        novaDescricao = task.descricao.replace(" [CONCLUÍDA]", "");
      } else {
        novaDescricao = (task.descricao || "") + " [CONCLUÍDA]";
      }

      const updatedTask = { ...task, descricao: novaDescricao };

      const response = await axios.put(`${API_BASE_URL}/api/task/${task.id}`, updatedTask);

      setTasks(prev => prev.map(t => t.id === task.id ? response.data : t));

    } catch (error) {
      console.error("Erro ao alternar status da tarefa:", error);
      alert("Não foi possível atualizar o status da tarefa.");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Excluir esta tarefa?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/task/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

const filteredTasks = tasks.filter(task => {
  if (!selectedCategory) return true; 
  
  return task.category && String(task.category.id) === String(selectedCategory);
});

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Carregando suas tarefas...</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* HEADER */}
      <header className="modern-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">✓</div>
            <div>
              <h1>To Do List App</h1>
              <p></p>
            </div>
          </div>

          {/* BOTÃO DE TEMA */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Alternar tema claro/escuro"
            title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <div className="main-layout">
        {/* SIDEBAR */}
        <aside className="elegant-sidebar">
          {/* TABS DE NAVEGAÇÃO */}
          <div className="nav-tabs">
            <button
              className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <span className="tab-icon">📋</span>
              Tarefas
            </button>
            <button
              className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <span className="tab-icon">🏷️</span>
              Categorias
            </button>
          </div>

          {activeTab === 'tasks' ? (
            <>
              {/* FILTRO DE CATEGORIAS */}
              <div className="sidebar-section">
                <h3 className="section-title">Filtrar por</h3>
                <div className="filter-chips">
                  <button
                    className={`filter-chip ${selectedCategory === null ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todas
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span
                        className="chip-dot"
                        style={{ background: cat.colorCode || '#6c5ce7' }}
                      ></span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* NOVA TAREFA */}
              <div className="sidebar-section">
                <h3 className="section-title">Nova Tarefa</h3>
                <form onSubmit={handleAddTask} className="modern-form">
                  <input
                    type="text"
                    placeholder="O que precisa ser feito?"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="modern-input"
                  />
                  <input
                    type="text"
                    placeholder="Descrição"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="modern-input"
                  />
                  <select
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="modern-input"
                  >
                    <option value="">Sem Categoria</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <select value={newTaskImportance} onChange={(e) => setNewTaskImportance(e.target.value)}
                    className="modern-input">
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                  <button type="submit" className="btn-primary-modern">
                    <span className="btn-icon">+</span>
                    Adicionar Tarefa
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* NOVA CATEGORIA */
            <div className="sidebar-section">
              <h3 className="section-title">Nova Categoria</h3>
              <form onSubmit={handleAddCategory} className="modern-form">
                <input
                  type="text"
                  placeholder="Nome da categoria"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="modern-input"
                />
                <button type="submit" className="btn-primary-modern btn-secondary-modern">
                  <span className="btn-icon">+</span>
                  Criar Categoria
                </button>
              </form>

              {/* LISTA DE CATEGORIAS */}
              <div className="categories-list">
                {categories.map(cat => (
                  <div key={cat.id} className="category-card">
                    <div
                      className="category-color-indicator"
                      style={{ background: cat.colorCode || '#6c5ce7' }}
                    ></div>
                    <span className="category-name">{cat.name}</span>
                    <button 
                        className="btn-delete-small"
                        title="Excluir categoria"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDeleteCategory(cat.id);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    <span className="category-count">
                      {tasks.filter(t => t.category?.id === cat.id).length} tarefas
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="main-content">
          <div className="content-header">
            <h2 className="content-title">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name || 'Tarefas'
                : 'Todas as Tarefas'}
            </h2>
            <span className="task-count-badge">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}
            </span>
          </div>

          {/* LISTA DE TAREFAS */}
          <div className="tasks-container">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`task-card ${task.descricao?.includes("[CONCLUÍDA]") ? 'completed' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="task-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      className="task-checkbox"
                    />
                    <label htmlFor={`task-${task.id}`} className="checkbox-custom">
                      <svg className="checkmark" viewBox="0 0 24 24">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                      </svg>
                    </label>
                  </div>

                  <div className="task-content">
                    <h4 className="task-title">{task.nome}</h4>
                   {task.descricao && (
                      <p className="task-description-hover">
                        {task.descricao.replace(" [CONCLUÍDA]", "")}
                      </p>
                    )}
                    <div className="task-meta">
                      {task.category && (
                        <span
                          className="task-category"
                          style={{
                            background: `${task.category.colorCode}20`,
                            color: task.category.colorCode,
                            border: `1px solid ${task.category.colorCode}`
                          }}
                        >
                          {task.category.name}
                        </span>
                      )}
                      <span className={`importance-tag ${task.importancia.toLowerCase()}`}>
                        {task.importancia}
                      </span>
                      <span className={`task-status ${task.descricao?.includes("[CONCLUÍDA]") ? 'done' : 'pending'}`}>
                        {task.descricao?.includes("[CONCLUÍDA]") ? 'Concluída' : 'Pendente'}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteTask(task.id)}
                    title="Excluir tarefa"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>Nenhuma tarefa encontrada</h3>
                <p>Comece adicionando uma nova tarefa ao lado!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

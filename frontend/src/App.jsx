import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [activeTab, setActiveTab] = useState("tasks");
  
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
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const taskResponse = await axios.get("http://localhost:8080/api/tasks");
      setTasks(taskResponse.data);

      try {
        const categoriesRes = await axios.get("http://localhost:8080/api/categories");
        setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
      } catch (catError) {
        console.warn("Endpoint de categorias não encontrado");
        setCategories([]);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };


 const handleAddCategory = async (e) => {
  e.preventDefault();
  if (!newCategoryName.trim()) return;

  try {
    const response = await axios.post("http://localhost:8080/api/categories", {
      name: newCategoryName,
      color: "#" + Math.floor(Math.random()*16777215).toString(16),
      // ADICIONE ISSO: O backend exige um objeto user com um id
      user: { id: 1 } 
    });
    setCategories([...categories, response.data]);
    setNewCategoryName("");
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    alert("Erro: Verifique se o usuário com ID 1 existe no banco.");
  }
};
  const handleAddTask = async (e) => {
  e.preventDefault();
  if (!newTaskTitle.trim()) return;

  try {
    
    const response = await axios.post("http://localhost:8080/api/task", {
      title: newTaskTitle,      
      completed: false,
      user: { id: 1 },         
      category: selectedCategory ? { id: selectedCategory } : null 
    });
    
    setTasks([...tasks, response.data]);
    setNewTaskTitle("");
  } catch (error) {

    console.error("Erro ao criar tarefa. Detalhes:", error.response?.data);
  }
};

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Excluir esta tarefa?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  const filteredTasks = selectedCategory
    ? tasks.filter(task => task.category?.id === selectedCategory)
    : tasks;

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

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
                        style={{background: cat.color || '#6c5ce7'}}
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
                      style={{background: cat.color || '#6c5ce7'}}
                    ></div>
                    <span className="category-name">{cat.name}</span>
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
                  className={`task-card ${task.completed ? 'completed' : ''}`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="task-checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <label htmlFor={`task-${task.id}`} className="checkbox-custom">
                      <svg className="checkmark" viewBox="0 0 24 24">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                      </svg>
                    </label>
                  </div>
                  
                  <div className="task-content">
                    <h4 className="task-title">{task.title}</h4>
                    <div className="task-meta">
                      {task.category && (
                        <span 
                          className="task-category"
                          style={{
                            background: `${task.category.color}20`,
                            color: task.category.color || '#6c5ce7'
                          }}
                        >
                          {task.category.name}
                        </span>
                      )}
                      <span className={`task-status ${task.completed ? 'done' : 'pending'}`}>
                        {task.completed ? 'Concluída' : 'Pendente'}
                      </span>
                    </div>
                  </div>

                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteTask(task.id)}
                    title="Excluir tarefa"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
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
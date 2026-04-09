# Projeto Capstone - Backend To-Do List (Banco de Dados II - Jala University)

> [!IMPORTANT]
> **Aviso sobre Código Legado:** O código original foi mantido intocado na pasta `caps` para não haver perda de dados. Porém, a aplicação principal agora roda o Spring Boot pela estrutura da raiz `com.capstone` com todas as regras de negócio corretamente isoladas nas camadas de "Controller", "Model", "Repository", "Service" e "Validation".

Este projeto trata-se do backend (mais API) do aplicativo **To-Do List** da disciplina de **Banco de Dados II** da **Jala University**. Ele utiliza Spring Boot e PostgreSQL através de containers Docker para gerenciar usuários e tarefas.

## 🚀 Como Começar

### 1. Preparação do Ambiente (Banco de Dados)
O banco de dados roda em um container Docker para facilitar a configuração.
Certifique-se de ter o Docker e o Docker Compose instalados.

Na raiz do projeto, execute:
```bash
docker compose up -d
```
*O banco estará disponível em `localhost:5433` (User/Pass: `postgres/postgres`).*

### 2. Compilação e Execução
Para garantir que todas as dependências estão corretas e o código está pronto, siga estes passos no terminal:

**Primeiro, compile o projeto:**
```bash
mvn clean compile
```

**Depois, rode a aplicação Spring Boot:**
```bash
mvn spring-boot:run
```
*A API estará disponível em `http://localhost:8081`.*

## 📂 Estrutura do Projeto

- **`src/main/java/com/capstone`**: Estrutura padrão sugerida (Controller, Service, Repository, Model e Validation).
- **`src/main/java/caps`**: Pasta contendo o código legado para backup.
- **`docker-compose.yml`**: Configuração do container PostgreSQL.

## 🛠️ Testando a API
Você pode utilizar o **Postman** ou o **DBeaver** para interagir com o sistema.
- **Porta do Banco (PostgreSQL):** 5433
- **Porta da API (Spring Boot):** 8081

### Principais Endpoints Disponíveis (Spring Boot):
**Módulo de Tasks**
- `POST /api/task` (Cria uma nova tarefa)
- `GET /api/task` (Lista todas as tarefas)
- `DELETE /api/task/{id}` (Exclui a tarefa)

**Módulo de Usuários** _(Com validações completas)_
- `POST /api/users` (Cria um usuário)
- `GET /api/users` (Lista todos usuários)
- `GET /api/users/{id}` (Busca usuário por ID)
- `DELETE /api/users/{id}` (Exclui o usuário)

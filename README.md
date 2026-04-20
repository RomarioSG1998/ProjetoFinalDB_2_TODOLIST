# Projeto Capstone - Backend To-Do List (Banco de Dados II - Jala University)

> [!IMPORTANT]
> **Aviso:** A aplicação utiliza a estrutura MVC completa na raiz `com.capstone` isolando apropriadamente as camadas de "Controller", "Model", "Repository", "Service" e "Validation".

> [!NOTE]
> **Atenção Maycon:** Esta branch `main` agora incorpora todas as implementações da sua branch `mayconbranch` (incluindo o Frontend e as refatorações). A única mudança adicional que fizemos foi garantir a **preservação do hash nativo** de senhas no `UserRepository.java`, para que a segurança via banco de dados continue funcionando corretamente.

Este projeto é o **Backend (REST API)** do aplicativo **To-Do List** da disciplina de Banco de Dados II da Jala University. Ele utiliza Spring Boot (Java) e um container Docker com um banco PostgreSQL.

Esta documentação foi reformulada como um **Guia de Integração** para auxiliar o time de Frontend (fala, Maycon!) no consumo rápido e objetivo das APIs para conectar a interface.

---

## 🚀 Guia Rápido de Instalação (Ambiente Local)

### 1. Subindo o Banco de Dados
Certifique-se de ter o Docker instalado e rodando. Na raiz do projeto, suba o contêiner do PostgreSQL via terminal:
```bash
docker compose up -d
```
*O banco estará operando em `localhost:5433` (Credenciais padrão: `postgres/postgres`).*

### 2. Rodando a API (Spring Boot)
Instale as dependências e rode a aplicação via Maven logo em seguida:
```bash
mvn clean compile
mvn spring-boot:run
```
*A API ficará disponível e pronta para receber as requisições na URL base: **`http://localhost:8081`**.*

---

## 🔌 Guia de Integração da API para o Frontend (Maycon)

**URL Base:** `http://localhost:8081`
**Formato de Envio/Retorno:** `application/json`

### 👤 Módulo de Usuários (`/api/users`)
Responsável pelas contas contendo regras de negócio seguras (como o e-mail que não pode se repetir).

> 🔒 **Segurança (DB Hash):** O processamento de hash das senhas e a verificação de credenciais são feitos nativamente pelo próprio banco de dados (PostgreSQL) usando a extensão `pgcrypto`. O backend em Java não manipula o hash localmente, delegando todo o processo de criptografia e checagem diretamente ao SGBD.

- **`POST /api/users`** - Cria um usuário.
  - **Payload esperado:** `{"username":"Maycon", "email":"maycon@teste.com", "passwordHash":"senhaDificil123"}`
- **`GET /api/users`** - Lista todos os usuários cadastrados.
- **`GET /api/users/{id}`** - Busca as informações de um usuário específico.
- **`PUT /api/users/{id}`** - Atualiza dados do usuário.
  - **Payload esperado:** Os mesmos campos do envio (username, email e passwordHash).
- **`DELETE /api/users/{id}`** - Exclui o usuário permanentemente do banco.

### 🎨 Módulo de Categorias (`/api/categories`)
Responsável por gerenciar os grupos e cores das atividades no kanban. Já conta com verificação Regex garantindo que as cores do Frontend entrem corretas no banco!

- **`POST /api/categories`** - Cria uma categoria.
  - **Payload esperado:** `{"name":"Trabalho", "colorCode":"#FF0000", "user":{"id": 1}}` *(Atenção Maycon: é obrigatório engatilhar o JSON com a associação do ID do usuário dono desta categoria)*.
- **`GET /api/categories`** - Lista todas as categorias gerais.
- **`GET /api/categories/{id}`** - Busca os detalhes de apenas uma categoria.
- **`GET /api/categories/user/{userId}`** - **⚡ Rota Principal:** Retorna como JSON um array contendo *apenas* as categorias pertencentes a um usuário em específico.
- **`PUT /api/categories/{id}`** - Altera o nome e cor de uma categoria.
  - **Payload esperado:** `{"name": "Trabalho Modificado", "colorCode":"#0000FF"}`
- **`DELETE /api/categories/{id}`** - Deleta a categoria.

### 📋 Módulo de Tasks (`/api/task`)
Módulo responsável pelas tarefas do To-Do List. Todas as operações CRUD estão funcionais e incluem validação de campos obrigatórios.

- **`POST /api/task`** - Insere uma nova tarefa.
  - **Payload esperado:** `{"nome": "Comprar queijo", "descricao": "Ir ao mercado CSD", "importancia": "Alta"}`
- **`GET /api/task`** - Lista todas as tarefas cadastradas.
- **`GET /api/task/{id}`** - Busca os detalhes de uma tarefa específica.
- **`PUT /api/task/{id}`** - Atualiza os dados de uma tarefa existente.
  - **Payload esperado:** `{"nome": "Tarefa Editada", "descricao": "Nova descrição", "importancia": "Baixa"}`
- **`DELETE /api/task/{id}`** - Exclui permanentemente a tarefa pelo ID.

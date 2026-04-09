# Projeto Capstone - Backend To-Do List (Banco de Dados II - Jala University)

> [!IMPORTANT]
> **Aviso:** A aplicação utiliza a estrutura MVC completa na raiz `com.capstone` isolando apropriadamente as camadas de "Controller", "Model", "Repository", "Service" e "Validation".

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
Módulo responsável pelas tarefas do To-Do List.

> [!WARNING]
> **Aviso GERAL para o João:** João, lembre-se que você é o encarregado pela classe `Task`! Não esqueça de programar os endpoints que estão faltando no seu `TaskController` para conseguirmos fechar o CRUD completo. **Neste momento o Maycon não consegue integrar as buscas individuais e as edições porque estão faltando o método `GET /api/task/{id}` e o método `PUT /api/task/{id}`.** Manda bala para subir isso!

- **`POST /api/task`** - Insere uma tarefa no banco de dados.
  - **Payload atual:** `{"nome": "Comprar queijo", "descricao": "Ir ao mercado CSD", "importancia": "Alta"}`
- **`GET /api/task`** - Lista e devolve todas as tarefas da tabela.
- **`DELETE /api/task/{id}`** - Exclui a tarefa usando o número do ID e responde com uma string de confirmação.

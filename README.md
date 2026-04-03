# Projeto Capstone - API de Gestão de Equipe e Tarefas

> [!IMPORTANT]
> **Mensagem para João:** Seu código original foi mantido integralmente na pasta `caps` (legado). No entanto, seguindo as melhores práticas de desenvolvimento, o ideal é que você pegue esse código e o organize nas novas pastas: `controller`, `model`, `repository` e `service`. Isso garante uma aplicação mais escalável e fácil de manter!

Este projeto é uma API Spring Boot para gerenciar usuários e tarefas, utilizando PostgreSQL como banco de dados através de containers Docker.

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

- **`src/main/java/com/capstone`**: Estrutura padrão sugerida (Camadas de Controller, Service, Repository e Model).
- **`src/main/java/caps`**: Pasta contendo o código legado (João).
- **`docker-compose.yml`**: Configuração do container PostgreSQL.

## 🛠️ Testando a API
Você pode utilizar o **Postman** ou o **DBeaver** para interagir com o sistema.
- **Porta do Banco (PostgreSQL):** 5433
- **Porta da API (Spring Boot):** 8081

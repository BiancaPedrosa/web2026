# Sistema de Gestão de Músicas (Firebase Auth & Realtime DB)

Uma aplicação web completa para gestão de um catálogo de músicas. Este projeto demonstra a integração do Firebase Authentication (E-mail/Senha e Google OAuth) com o Firebase Realtime Database para operações CRUD (Criar, Ler, Atualizar, Excluir), garantindo também o controlo de acesso a páginas protegidas.

## 🚀 Funcionalidades

### 🔐 Autenticação e Segurança (Firebase Auth)

- **Registo de novos utilizadores** (Sign Up) via E-mail e Senha.
- **Login de utilizadores** (Sign In) e acesso rápido com Google OAuth.
- **Gestão de Estado da Sessão:** Monitorização em tempo real do estado de autenticação (`onAuthStateChanged`).
- **Proteção de Rotas:** Redirecionamento de utilizadores não autenticados ao tentar aceder ao Dashboard.

### 🎵 Gestão de Músicas (Realtime Database)

- **Catálogo Público (`index.html`):** Visualização em tempo real das músicas, acessível a qualquer visitante.
- **Dashboard Privado (`dashboard.html`):** Área restrita para administração do sistema.
- **CRUD Completo:** Inserção, edição e exclusão de músicas (ID, Título, Artista).
- **Interface Interativa:** Tabelas estilizadas com preenchimento dinâmico e validação de formulários.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6 Modules)
- **Framework UI:** Bootstrap 5
- **Backend/BaaS:** Firebase (Authentication & Realtime Database)

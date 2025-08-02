# Aplicações com Interfaces Ricas - TADS/IFRN-CNAT 2025.1

### Sobre o Repositório

**Repositório para a matéria de Aplicações com Interfaces Ricas, ofertada pelo curso de TADS no IFRN-CNAT no ano de 2025.1.**

## 🛒 Gerenciador de Produtos - Angular + PrimeNG + JWT Authentication + Router

### 📋 Sobre o Projeto

Uma aplicação web desenvolvida em **Angular 19** que implementa um sistema completo de **CRUD (Create, Read, Update, Delete)** para gerenciamento de produtos com **autenticação JWT** e **proteção de rotas**. O projeto evoluiu com uma arquitetura componentizada e agora integra com um **backend Express.js** que possui sistema de autenticação completo através de **serviços HTTP** para persistência de dados. Implementa **Angular Router** com **Guards** para navegação protegida entre componentes.

### 🎯 Objetivos da Atividade Atendidos

✅ **Frontend e Backend na mesma máquina** - Localhost  
✅ **Service para operações CRUD** - ProdutoService implementado  
✅ **HttpClient para comunicação** - Todas as operações usam HTTP  
✅ **Componentes especializados** - Inserir, Atualizar, Detalhar, Listar e Excluir  
✅ **Roteamento entre componentes** - Navegação baseada em rotas  
✅ **Passagem de parâmetros entre rotas** - ID do produto enviado nas rotas  
✅ **Modelo consistente** - Frontend e backend sincronizados  
✅ **Autenticação JWT** - Sistema completo de login/logout  
✅ **Guard de Autenticação (CanActivate)** - Proteção de rotas  
✅ **Interceptor HTTP** - Token JWT automático nas requisições

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 19** - Framework principal
- **PrimeNG 19** - Biblioteca de componentes UI
- **TypeScript** - Linguagem de programação
- **HttpClient** - Comunicação HTTP com backend
- **Angular Router** - Navegação entre componentes
- **Angular Guards** - Proteção de rotas
- **RxJS** - Programação reativa
- **FormsModule** - Manipulação de formulários
- **JWT** - Gerenciamento de tokens de autenticação

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Parse de requisições JSON
- **jsonwebtoken** - Geração e validação de tokens JWT

## � Sistema de Autenticação

### Funcionalidades de Autenticação

1. **Login com JWT**
   - Endpoint: `POST /login`
   - Validação de credenciais
   - Geração de token JWT com expiração de 1 hora
   - Armazenamento no localStorage

2. **Proteção de Rotas**
   - **AuthGuard** implementado para todas as rotas de produtos
   - Redirecionamento automático para login se não autenticado
   - Verificação de validade do token

3. **Interceptor HTTP**
   - Adiciona automaticamente o token JWT no header `Authorization`
   - Intercepta todas as requisições HTTP para a API

4. **Logout**
   - Remoção do token do localStorage
   - Redirecionamento para tela de login

### Credenciais de Teste

O sistema possui usuários pré-cadastrados para testes:

```
Email: admin@email.com | Senha: 123456
Email: user@email.com  | Senha: 123456
```

## 📦 Modelo de Dados

### Produto
```typescript
export interface Produto {
  id?: number; // Number - ID único (gerado pelo backend)
  nome: string; // String - Nome do produto
  preco: number; // Number - Preço em reais
  disponivel: boolean; // Boolean - Status de disponibilidade
}
```

### Usuário
```typescript
export interface Usuario {
  id: number;
  email: string;
  nome: string;
}
```
```

## 🧭 Rotas Implementadas

A aplicação utiliza o Angular Router para navegação entre os componentes com **proteção de autenticação**:

| Rota | Componente | Proteção | Descrição |
|------|------------|----------|-----------|
| `/` | Redirecionamento | - | Redireciona para `/login` |
| `/login` | LoginComponent | - | Tela de autenticação |
| `/produtos` | ProdutoListarComponent | ✅ AuthGuard | Lista todos os produtos |
| `/produtos/novo` | ProdutoInserirComponent | ✅ AuthGuard | Formulário para criar um novo produto |
| `/produtos/editar/:id` | ProdutoAtualizarComponent | ✅ AuthGuard | Formulário para editar um produto existente |
| `/produtos/detalhar/:id` | ProdutoDetalharComponent | ✅ AuthGuard | Visualização detalhada de um produto |
| `/produtos/excluir/:id` | ProdutoExcluirComponent | ✅ AuthGuard | Confirmação para excluir um produto |
| `/**` | Redirecionamento | - | Rota wildcard redireciona para `/login` |

### AuthGuard - Proteção de Rotas

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

### Exemplo de passagem de parâmetros

O ID do produto é passado como parte da URL para as rotas que precisam identificar um produto específico:

```typescript
// No componente de listagem (envio do ID)
onEditarProduto(produto: Produto) {
  this.router.navigate(['/produtos/editar', produto.id]);
}

// No componente de edição (recebimento do ID)
ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.produtoService.detalhar(id).subscribe(produto => {
      this.produto = produto;
    });
  }
}
```

## 🛠️ Funcionalidades Implementadas

### 🔐 Sistema de Autenticação

1. **🔑 Login**
   - Formulário de autenticação com validação
   - Verificação de credenciais no backend
   - Geração e armazenamento de token JWT
   - Redirecionamento automático após login

2. **🚪 Logout**
   - Limpeza do token e dados do usuário
   - Redirecionamento para tela de login
   - Botão de logout na barra de navegação

3. **🛡️ Proteção de Rotas**
   - Todas as rotas de produtos protegidas
   - Redirecionamento automático se não autenticado
   - Verificação de validade do token

### ✨ Operações CRUD Completas com Backend Protegido

1. **📋 Listar Produtos**
   - Carregamento via HTTP GET com token JWT
   - Exibição em tabela responsiva com PrimeNG
   - Atualização automática após operações

2. **➕ Inserir Produto**
   - Modal/Dialog para entrada de dados
   - Validação de campos obrigatórios
   - Envio via HTTP POST protegido com JWT
   - Feedback visual de sucesso/erro

3. **✏️ Atualizar Produto**
   - Preenchimento automático dos dados existentes
   - Edição via HTTP PUT protegido com JWT
   - Atualização da lista local após confirmação

4. **👁️ Detalhar Produto**
   - Visualização completa dos dados
   - Modal somente leitura
   - Informações formatadas

5. **🗑️ Excluir Produto**
   - Confirmação antes da exclusão
   - Remoção via HTTP DELETE protegido com JWT
   - Atualização da lista após confirmação

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Componentes

```
src/app/
├── model/
│   └── produto.model.ts          # Interface do modelo Produto
├── auth.service.ts               # Service de autenticação JWT
├── auth.guard.ts                 # Guard para proteção de rotas
├── auth.interceptor.ts           # Interceptor HTTP (classe)
├── auth.interceptor.functional.ts # Interceptor HTTP (funcional)
├── produto.service.ts            # Service com HttpClient para produtos
├── app.component.ts              # Componente principal com navbar
├── app.config.ts                 # Configuração com interceptors
├── app.routes.ts                 # Rotas com proteção
├── login/                        # Componente de login
│   ├── login.component.ts
│   ├── login.component.html
│   └── login.component.css
├── produto-listar/              # Componente de listagem
├── produto-inserir/             # Componente de inserção
├── produto-atualizar/           # Componente de atualização
├── produto-detalhar/            # Componente de detalhamento
└── produto-excluir/             # Componente de exclusão
```

### 🔐 AuthService - Gerenciamento de Autenticação

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, senha: string): Observable<LoginResponse>
  logout(): void
  isLoggedIn(): boolean
  getToken(): string | null
  getUsuario(): Usuario | null
  verificarToken(): Observable<any>
}
```

### 🔄 Service HTTP (ProdutoService)

O service centraliza todas as operações HTTP com proteção JWT:

```typescript
@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly apiUrl = 'http://localhost:3000/produtos';

  listar(): Observable<Produto[]>
  detalhar(id: number): Observable<Produto>
  inserir(produto: Produto): Observable<Produto>
  atualizar(produto: Produto): Observable<Produto>
  remover(id: number): Observable<void>
}
```

### 🛡️ HTTP Interceptor

Interceptor funcional que adiciona automaticamente o token JWT:

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  
  return next(req);
};
```

### 🌐 Backend API (Express.js) com JWT

API REST completa rodando em `localhost:3000` com autenticação JWT:

#### Endpoints de Autenticação
- **POST** `/login` - Autenticação do usuário (retorna token JWT)
- **GET** `/verificar-token` - Verificação de validade do token (protegida)

#### Endpoints de Produtos (Protegidas com JWT)
- **GET** `/produtos` - Lista todos os produtos
- **GET** `/produtos/:id` - Detalha um produto específico
- **POST** `/produtos` - Cria um novo produto
- **PUT** `/produtos/:id` - Atualiza um produto existente
- **DELETE** `/produtos/:id` - Remove um produto

#### Middleware de Autenticação

```javascript
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
```

#### Estrutura do Token JWT

```javascript
const token = jwt.sign(
  { id: usuario.id, email: usuario.email, nome: usuario.nome },
  JWT_SECRET,
  { expiresIn: '1h' }
);
```

## 🔧 Como Executar

### Pré-requisitos
- Node.js instalado
- Angular CLI instalado globalmente

### 1. Instalar Dependências do Backend
```bash
# Na raiz do projeto
npm install
```

### 2. Iniciar o Backend
```bash
# Na raiz do projeto
npm start
# ou
node server.js
```
O backend estará rodando em `http://localhost:3000`

### 3. Instalar Dependências do Frontend
```bash
# Dentro da pasta project
cd project
npm install
```

### 4. Iniciar o Frontend
```bash
# Dentro da pasta project
npm start
```
O frontend estará rodando em `http://localhost:4200`

### 5. Acessar a Aplicação
1. Abra o navegador em `http://localhost:4200`
2. Faça login com uma das credenciais:
   - **Email:** admin@email.com | **Senha:** 123456
   - **Email:** user@email.com | **Senha:** 123456
3. Navegue pelas funcionalidades de CRUD dos produtos

### 🔒 Fluxo de Autenticação

1. **Primeiro Acesso:** Usuário é redirecionado para `/login`
2. **Login:** Inserir credenciais válidas
3. **Token JWT:** Gerado e armazenado no localStorage
4. **Navegação:** Acesso liberado para todas as rotas de produtos
5. **Logout:** Token removido e redirecionamento para login

## 🎨 Interface de Usuário

- **Design Responsivo** com Bulma CSS
- **Componentes Modernos** do PrimeNG
- **Feedback Visual** com toasts e confirmações
- **Validação de Formulários** em tempo real
- **Ícones Intuitivos** do PrimeIcons
- **Navbar com Autenticação** - mostra usuário logado e botão de logout

## 📚 Componentes PrimeNG Utilizados

| Componente        | Função                        | Componente Usado          |
| ----------------- | ----------------------------- | ------------------------- |
| `p-table`         | Exibição da lista de produtos | ProdutoListarComponent    |
| `p-dialog`        | Modal para inserir/editar     | Todos os modais           |
| `p-toolbar`       | Barra de navegação            | AppComponent              |
| `p-toast`         | Notificações de feedback      | AppComponent              |
| `p-confirmDialog` | Confirmação de exclusão       | ProdutoExcluirComponent   |
| `p-inputText`     | Campo de texto                | Login/Inserir/Atualizar   |
| `p-password`      | Campo de senha                | LoginComponent            |
| `p-inputNumber`   | Campo numérico                | Inserir/Atualizar         |
| `p-inputSwitch`   | Campo booleano                | Inserir/Atualizar         |
| `p-button`        | Botões com efeitos            | Todos os componentes      |
| `p-card`          | Cartão do formulário login    | LoginComponent            |
| `p-message`       | Mensagens de erro             | LoginComponent            |

## 🎯 Benefícios da Implementação JWT

### ✅ **Segurança**
- **Tokens Criptografados** - JWT com assinatura digital
- **Expiração Automática** - Tokens com TTL de 1 hora
- **Proteção de Rotas** - Guards impedem acesso não autorizado
- **Headers Automáticos** - Interceptor adiciona token automaticamente

### ✅ **Experiência do Usuário**
- **Login Único** - Token persistido no localStorage
- **Navegação Fluida** - Redirecionamento automático
- **Feedback Visual** - Indicadores de estado de autenticação
- **Logout Seguro** - Limpeza completa de dados

### ✅ **Arquitetura**
- **Stateless** - Backend não mantém sessões
- **Escalável** - Fácil para múltiplos servidores
- **Interceptor Automático** - Token adicionado em todas as requisições
- **Service Centralizado** - Gerenciamento unificado de autenticação

## 🔍 Estrutura Final de Autenticação

### AuthService - Métodos Principais
```typescript
login(email: string, senha: string): Observable<LoginResponse>
logout(): void
isLoggedIn(): boolean
getToken(): string | null
getUsuario(): Usuario | null
```

### AuthGuard - Proteção de Rotas
```typescript
canActivate(): boolean {
  return this.authService.isLoggedIn() || this.router.navigate(['/login']);
}
```

### AuthInterceptor - Token Automático
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  return token ? next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })) : next(req);
};
```

## ✅ Requisitos da Atividade Completamente Atendidos

| Requisito | Status | Implementação |
|-----------|---------|---------------|
| **Frontend e Backend na mesma máquina** | ✅ | Localhost:3000 (backend) e localhost:4200 (frontend) |
| **Serviço de autenticação JWT** | ✅ | AuthService completo com login/logout/verificação |
| **Guard CanActivate** | ✅ | AuthGuard protegendo todas as rotas de produtos |
| **Interceptor HTTP** | ✅ | Token JWT automático em todas as requisições |
| **Proteção de rotas** | ✅ | Todas as rotas de CRUD protegidas |
| **Sistema de login** | ✅ | Tela de login com validação e feedback |
| **Middleware backend** | ✅ | Verificação de token em todas as APIs |

---

**Desenvolvido por:** Nathan Cavalcante de Lima  
**Disciplina:** Aplicações com Interfaces Ricas  
**Instituição:** TADS/IFRN-CNAT  
**Ano:** 2025.1

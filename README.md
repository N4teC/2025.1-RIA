# Aplicações com Interfaces Ricas - TADS/IFRN-CNAT 2025.1

### Sobre o Repositório

**Repositório para a matéria de Aplicações com Interfaces Ricas, ofertada pelo curso de TADS no IFRN-CNAT no ano de 2025.1.**

## 🛒 Gerenciador de Produtos - Angular + PrimeNG + HttpClient + Router

### 📋 Sobre o Projeto

Uma aplicação web desenvolvida em **Angular 19** que implementa um sistema completo de **CRUD (Create, Read, Update, Delete)** para gerenciamento de produtos. O projeto foi evoluído com uma arquitetura componentizada usando **@Input e @Output** e agora integra com um **backend Express.js** através de **serviços HTTP** para persistência de dados. Nesta versão, foi implementado o **Angular Router** para navegação entre componentes.

### 🎯 Objetivos da Atividade Atendidos

✅ **Frontend e Backend na mesma máquina** - Localhost  
✅ **Service para operações CRUD** - ProdutoService implementado  
✅ **HttpClient para comunicação** - Todas as operações usam HTTP  
✅ **Componentes especializados** - Inserir, Atualizar, Detalhar, Listar e Excluir  
✅ **Comunicação @Input/@Output** - Entre componentes pai e filho (versão anterior)  
✅ **Roteamento entre componentes** - Navegação baseada em rotas  
✅ **Passagem de parâmetros entre rotas** - ID do produto enviado nas rotas  
✅ **Modelo consistente** - Frontend e backend sincronizados

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 19** - Framework principal
- **PrimeNG 19** - Biblioteca de componentes UI
- **TypeScript** - Linguagem de programação
- **HttpClient** - Comunicação HTTP com backend
- **Angular Router** - Navegação entre componentes
- **RxJS** - Programação reativa
- **FormsModule** - Manipulação de formulários

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Parse de requisições JSON

## 📦 Modelo de Dados

O projeto utiliza um modelo `Produto` consistente entre frontend e backend:

```typescript
export interface Produto {
  id?: number; // Number - ID único (gerado pelo backend)
  nome: string; // String - Nome do produto
  preco: number; // Number - Preço em reais
  disponivel: boolean; // Boolean - Status de disponibilidade
}
```

## 🧭 Rotas Implementadas

A aplicação utiliza o Angular Router para navegação entre os componentes:

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Redirecionamento | Redireciona para a listagem de produtos |
| `/produtos` | ProdutoListarComponent | Lista todos os produtos |
| `/produtos/novo` | ProdutoInserirComponent | Formulário para criar um novo produto |
| `/produtos/editar/:id` | ProdutoAtualizarComponent | Formulário para editar um produto existente |
| `/produtos/detalhar/:id` | ProdutoDetalharComponent | Visualização detalhada de um produto |
| `/produtos/excluir/:id` | ProdutoExcluirComponent | Confirmação para excluir um produto |

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

### ✨ Operações CRUD Completas com Backend

1. **📋 Listar Produtos**
   - Carregamento via HTTP GET do backend
   - Exibição em tabela responsiva com PrimeNG
   - Atualização automática após operações

2. **➕ Inserir Produto**
   - Modal/Dialog para entrada de dados
   - Validação de campos obrigatórios
   - Envio via HTTP POST para o backend
   - Feedback visual de sucesso/erro

3. **✏️ Atualizar Produto**
   - Preenchimento automático dos dados existentes
   - Edição via HTTP PUT no backend
   - Atualização da lista local após confirmação

4. **👁️ Detalhar Produto**
   - Visualização completa dos dados
   - Modal somente leitura
   - Informações formatadas

5. **🗑️ Excluir Produto**
   - Confirmação antes da exclusão
   - Remoção via HTTP DELETE do backend
   - Atualização da lista após confirmação

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Componentes

```
src/app/
├── model/
│   └── produto.model.ts          # Interface do modelo
├── produto.service.ts            # Service com HttpClient
├── app.component.ts              # Componente principal
├── produto-listar/              # Componente de listagem
├── produto-inserir/             # Componente de inserção
├── produto-atualizar/           # Componente de atualização
├── produto-detalhar/            # Componente de detalhamento
└── produto-excluir/             # Componente de exclusão
```

### 🔄 Service HTTP (ProdutoService)

O service centraliza todas as operações HTTP:

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

### 🌐 Backend API (Express.js)

API REST completa rodando em `localhost:3000`:

- **GET** `/produtos` - Lista todos os produtos
- **GET** `/produtos/:id` - Detalha um produto específico
- **POST** `/produtos` - Cria um novo produto
- **PUT** `/produtos/:id` - Atualiza um produto existente
- **DELETE** `/produtos/:id` - Remove um produto

## 🔧 Como Executar

### Pré-requisitos
- Node.js instalado
- Angular CLI instalado globalmente

### 1. Iniciar o Backend
```bash
# Na raiz do projeto
node server.js
```
O backend estará rodando em `http://localhost:3000`

### 2. Iniciar o Frontend
```bash
# Dentro da pasta project
cd project
npm install  # se for a primeira vez
npm start
```
O frontend estará rodando em `http://localhost:4200`

### 3. Acessar a Aplicação
Abra o navegador em `http://localhost:4200`
   - Indicadores visuais de disponibilidade

2. **➕ Inserir Produto**

   - Formulário modal com validações
   - Campos obrigatórios (nome e preço)
   - Feedback visual de erros

3. **✏️ Atualizar Produto**

   - Edição inline via modal
   - Preservação de dados existentes
   - Validação em tempo real

4. **🗑️ Remover Produto**

   - Confirmação antes da exclusão
   - Feedback via toast notifications

5. **👁️ Detalhar Produto**
   - Visualização completa dos dados
   - Interface clara e organizada

### 🎨 Interface de Usuário

- **Design Responsivo** com Bulma CSS
- **Componentes Modernos** do PrimeNG
- **Feedback Visual** com toasts e confirmações
- **Validação de Formulários** em tempo real
- **Ícones Intuitivos** do PrimeIcons

## 🏗️ Arquitetura do Projeto (Componentizada)

```
project/src/
├── app/
│   ├── model/
│   │   └── produto.model.ts          # Interface do modelo
│   ├── produto-listar/
│   │   ├── produto-listar.component.ts    # Componente de listagem
│   │   ├── produto-listar.component.html  # Template de listagem
│   │   ├── produto-listar.component.css   # Estilos de listagem
│   │   └── produto-listar.component.spec.ts
│   ├── produto-inserir/
│   │   ├── produto-inserir.component.ts   # Componente de inserção
│   │   ├── produto-inserir.component.html # Template de inserção
│   │   ├── produto-inserir.component.css  # Estilos de inserção
│   │   └── produto-inserir.component.spec.ts
│   ├── produto-atualizar/
│   │   ├── produto-atualizar.component.ts   # Componente de atualização
│   │   ├── produto-atualizar.component.html # Template de atualização
│   │   ├── produto-atualizar.component.css  # Estilos de atualização
│   │   └── produto-atualizar.component.spec.ts
│   ├── produto-detalhar/
│   │   ├── produto-detalhar.component.ts   # Componente de detalhes
│   │   ├── produto-detalhar.component.html # Template de detalhes
│   │   ├── produto-detalhar.component.css  # Estilos de detalhes
│   │   └── produto-detalhar.component.spec.ts
│   ├── produto-excluir/
│   │   ├── produto-excluir.component.ts   # Componente de exclusão
│   │   ├── produto-excluir.component.html # Template de exclusão
│   │   ├── produto-excluir.component.css  # Estilos de exclusão
│   │   └── produto-excluir.component.spec.ts
│   ├── app.component.ts         # Componente principal (orquestrador)
│   ├── app.component.html       # Template da aplicação
│   ├── app.component.css        # Estilos globais
│   ├── app.config.ts           # Configuração do PrimeNG
│   └── app.routes.ts           # Rotas da aplicação
├── styles.css                  # Estilos globais (PrimeNG Themes)
└── main.ts                     # Ponto de entrada
```

## 🔗 Comunicação entre Componentes

### @Input - Entrada de Dados

```typescript
// Nos componentes filhos, recebem dados do componente pai
@Input() produto?: Produto;           // Produto a ser editado/detalhado
@Input() produtos: Produto[] = [];    // Lista de produtos
@Input() visible: boolean = false;    // Controle de visibilidade
```

### @Output - Emissão de Eventos

```typescript
// Nos componentes filhos, emitem eventos para o componente pai
@Output() produtoAdicionado = new EventEmitter<Produto>();
@Output() produtoAtualizado = new EventEmitter<Produto>();
@Output() produtoExcluido = new EventEmitter<number>();
@Output() modalFechado = new EventEmitter<void>();
```

### Fluxo de Comunicação

```
AppComponent (Pai)
├── gerencia array de produtos
├── controla visibilidade dos modais
└── escuta eventos dos componentes filhos
    ├── ProdutoListarComponent
    │   └── emite eventos de ação (editar, excluir, detalhar)
    ├── ProdutoInserirComponent
    │   └── emite evento de produto adicionado
    ├── ProdutoAtualizarComponent
    │   └── emite evento de produto atualizado
    ├── ProdutoDetalharComponent
    │   └── recebe produto via @Input
    └── ProdutoExcluirComponent
        └── emite evento de produto excluído
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Angular CLI 19

### Instalação

1. **Clone o repositório**

```bash
git clone [URL_DO_REPOSITORIO]
cd project
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o projeto**

```bash
npm start
# ou
ng serve
```

4. **Acesse a aplicação**

```
http://localhost:4200
```

## 📚 Componentes PrimeNG Utilizados

| Componente        | Função                        | Componente Usado          |
| ----------------- | ----------------------------- | ------------------------- |
| `p-table`         | Exibição da lista de produtos | ProdutoListarComponent    |
| `p-dialog`        | Modal para inserir/editar     | Todos os modais           |
| `p-toolbar`       | Barra de ferramentas          | AppComponent              |
| `p-toast`         | Notificações de feedback      | AppComponent              |
| `p-confirmDialog` | Confirmação de exclusão       | ProdutoExcluirComponent   |
| `p-inputText`     | Campo de texto                | Inserir/Atualizar         |
| `p-inputNumber`   | Campo numérico                | Inserir/Atualizar         |
| `p-inputSwitch`   | Campo booleano                | Inserir/Atualizar         |
| `p-button`        | Botões com efeitos            | Todos os componentes      |

## 🎨 Vantagens da Componentização

### ✅ **Benefícios Implementados**

- **Separação de Responsabilidades** - Cada componente tem uma função específica
- **Reutilização de Código** - Componentes podem ser reutilizados em outras partes
- **Facilidade de Manutenção** - Mudanças isoladas em cada componente
- **Testabilidade** - Cada componente pode ser testado individualmente
- **Comunicação Clara** - @Input/@Output definem contratos claros
- **Organização Melhorada** - Código mais estruturado e legível

### 🔧 **Estrutura Modular**

```typescript
// Exemplo de comunicação entre componentes
// App Component (Pai) -> Produto Inserir (Filho)
onProdutoAdicionado(produto: Produto) {
  this.produtos.push(produto);
  this.showInserirDialog = false;
  this.messageService.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto adicionado com sucesso!'
  });
}
```
| --------------- | ------------------------------------------------- |
## 🔧 Configurações Importantes

### PrimeNG Theme

```typescript
// app.config.ts
providePrimeNG({
  theme: {
    preset: Aura,
  },
});
```

### Estilos Globais

```css
/* styles.css */
@import "primeicons/primeicons.css";
/* Tema do PrimeNG aplicado automaticamente */
```

## � Refatoração Realizada

### 🏗️ **De Monolítico para Componentizado**

#### Antes (Versão Anterior):
```
✅ Um único AppComponent com toda a lógica
❌ Dificuldade de manutenção
❌ Código acoplado
❌ Testes complexos
```

#### Agora (Versão Componentizada):
```
✅ 5 componentes especializados
✅ Comunicação via @Input/@Output
✅ Lógica separada por responsabilidade
✅ Fácil manutenção e teste
```

### 🔄 **Componentes Criados**

1. **ProdutoListarComponent** - Exibe a tabela de produtos
2. **ProdutoInserirComponent** - Modal para adicionar produtos
3. **ProdutoAtualizarComponent** - Modal para editar produtos
4. **ProdutoDetalharComponent** - Modal para visualizar detalhes
5. **ProdutoExcluirComponent** - Modal para confirmar exclusão

### 📡 **Padrões de Comunicação Implementados**

#### Parent-to-Child (@Input)
```typescript
// AppComponent passa dados para componentes filhos
<app-produto-listar 
  [produtos]="produtos"
  (editarProduto)="onEditarProduto($event)">
</app-produto-listar>
```

#### Child-to-Parent (@Output)
```typescript
// Componentes filhos emitem eventos para o pai
@Output() produtoAdicionado = new EventEmitter<Produto>();

adicionarProduto() {
  this.produtoAdicionado.emit(this.produto);
}
```

## 🎯 Requisitos Atendidos

| Requisito                    | Status | Implementação                    |
| ---------------------------- | ------ | -------------------------------- |
| Reutilizar projeto anterior | ✅     | Projeto Angular mantido          |
| Biblioteca UI Angular        | ✅     | PrimeNG mantido e atualizado     |
| Atualizar Angular/PrimeNG    | ✅     | Angular 19 + PrimeNG 19          |
| Componentes separados        | ✅     | 5 componentes especializados     |
| Comunicação @Input/@Output   | ✅     | Implementado em todos            |
| Modelo com 3 tipos          | ✅     | string, number, boolean          |

## 📈 Funcionalidades Mantidas e Melhoradas

- **Validação de Formulários** com feedback visual
- **Confirmação de Ações** destrutivas  
- **Notificações Toast** para feedback do usuário
- **Interface Responsiva** para diferentes dispositivos
- **Estado Reativo** com two-way data binding
- **Componentização Completa** - nova funcionalidade!
- **Comunicação Estruturada** - @Input/@Output

## 🎯 Pontos de Destaque da Refatoração

- ✅ **Arquitetura Componentizada** - separação clara de responsabilidades
- ✅ **Comunicação Estruturada** - @Input/@Output bem definidos
- ✅ **Manutenibilidade** - cada operação CRUD em componente próprio  
- ✅ **Reutilização** - componentes podem ser usados independentemente
- ✅ **Testabilidade** - cada componente testável isoladamente
- ✅ **Organização** - estrutura de pastas clara e intuitiva
- ✅ **Escalabilidade** - base sólida para futuras expansões

## 🚀 Evolução do Projeto

### Versão 1.0 (Atividade Anterior)
- ✅ CRUD completo em um único componente
- ✅ PrimeNG + Bulma CSS
- ✅ Validações e feedback

### Versão 2.0 (Atividade Atual) 
## 🔍 Comunicação entre Componentes

### Padrão @Input/@Output Implementado

O projeto utiliza o padrão de comunicação Angular entre componentes:

#### AppComponent (Pai) → Componentes (Filhos)
- **@Input** `produtos: Produto[]` - Lista de produtos
- **@Input** `visible: boolean` - Controle de visibilidade dos modals
- **@Input** `produto: Produto` - Produto selecionado para edição/visualização

#### Componentes (Filhos) → AppComponent (Pai)
- **@Output** `produtoSalvo: EventEmitter<Produto>` - Novo produto criado/atualizado
- **@Output** `produtoExcluido: EventEmitter<Produto>` - Produto removido
- **@Output** `visibleChange: EventEmitter<boolean>` - Mudança de estado do modal

## 🛡️ Tratamento de Erros e Feedback

### Sistema de Mensagens
- **Toast/Notifications** - PrimeNG Toast para feedback visual
- **Validação de Formulários** - Campos obrigatórios e validações
- **Tratamento HTTP** - Captura e exibição de erros de API
- **Loading States** - Indicadores de carregamento durante operações

### Tipos de Feedback
- ✅ **Sucesso** - Operações completadas com êxito
- ❌ **Erro** - Problemas de comunicação ou validação
- ⚠️ **Confirmação** - Diálogos de confirmação para exclusões

## 📋 Principais Implementações desta Atividade

### 🔧 Configuração HttpClient
```typescript
// app.config.ts
providers: [
  provideHttpClient(), // ← Habilitação do HttpClient
  // outros providers...
]
```

### 🔄 Integração Service-Component
```typescript
// app.component.ts
constructor(
  private readonly produtoService: ProdutoService // ← Injeção do service
) {}

// Operações agora usam o service ao invés de dados mockados
onProdutoInserido(produto: Produto) {
  this.produtoService.inserir(produto).subscribe({
    next: (novoProduto) => {
      this.produtos.push(novoProduto);
      // feedback de sucesso
    },
    error: (error) => {
      // tratamento de erro
    }
  });
}
```

### 🌐 Backend Sincronizado
- Campo `disponivel` adicionado no backend
- APIs REST completas para todas as operações
- CORS habilitado para comunicação frontend-backend
- Dados persistem durante a sessão do servidor

## ✅ Requisitos da Atividade Atendidos

- ✅ **Frontend e Backend na mesma máquina** - Localhost
- ✅ **Service para todas as operações CRUD** - ProdutoService implementado
- ✅ **HttpClient para comunicação** - Substituição dos dados mockados
- ✅ **Componentização mantida** - Arquitetura de componentes preservada
- ✅ **Comunicação @Input/@Output** - Padrões de comunicação mantidos
- ✅ **Tratamento de erros** - Feedback adequado para todas as operações
- ✅ **Modelo consistente** - Frontend e backend sincronizados

## 🎓 Conceitos Aplicados e Aprendidos

### Angular Services & HTTP
- **Injectable Services** - Injeção de dependências
- **HttpClient** - Comunicação HTTP com backend
- **Observable/RxJS** - Programação reativa para operações assíncronas
- **Error Handling** - Tratamento adequado de erros HTTP

### Arquitetura Full-Stack
- **Separation of Concerns** - Frontend e Backend separados
- **RESTful APIs** - Padrões REST para comunicação
- **Data Consistency** - Modelos sincronizados entre camadas
- **Service Layer** - Centralização da lógica de comunicação

### Comunicação de Componentes
- **@Input/@Output** - Comunicação pai-filho mantida
- **EventEmitter** - Emissão de eventos personalizados
- **Component Communication** - Padrões de arquitetura Angular

---

**Desenvolvido por:** Nathan Cavalcante de Lima  
**Disciplina:** Aplicações com Interfaces Ricas  
**Instituição:** TADS/IFRN-CNAT  
**Ano:** 2025.1

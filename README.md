# Aplicações com Interfaces Ricas - TADS/IFRN-CNAT 2025.1

### Sobre o Repositório

**Repositório para a matéria de Aplicações com Interfaces Ricas, ofertada pelo curso de TADS no IFRN-CNAT no ano de 2025.1.**

## 🛒 Gerenciador de Produtos - Angular + PrimeNG (Componentizado)

### 📋 Sobre o Projeto

Uma aplicação web desenvolvida em **Angular 19** que implementa um sistema completo de **CRUD (Create, Read, Update, Delete)** para gerenciamento de produtos, agora **refatorado em componentes separados** com comunicação via **@Input e @Output**. Esta implementação atende aos requisitos da atividade de componentização da disciplina.

### 🎯 Objetivos da Atividade Atendidos

✅ **Reutilizar projeto Angular da tarefa anterior**  
✅ **Manter biblioteca de componentes UI Angular** (PrimeNG)  
✅ **Atualizar para Angular 19 e PrimeNG 19**  
✅ **Refatorar em componentes separados**: inserir, atualizar, detalhar e listar  
✅ **Implementar comunicação com @Input e @Output**  
✅ **Modelo com 3 tipos de atributos**: string, número e booleano

## 🚀 Tecnologias Utilizadas

- **Angular 19** - Framework principal
- **PrimeNG 19** - Biblioteca de componentes UI (atualizada)
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **FormsModule** - Manipulação de formulários
- **@Input/@Output** - Comunicação entre componentes

## 📦 Modelo de Dados

O projeto utiliza um modelo `Produto` com os seguintes atributos:

```typescript
export interface Produto {
  nome: string; // String - Nome do produto
  preco: number; // Number - Preço em reais
  disponivel: boolean; // Boolean - Status de disponibilidade
}
```

## 🛠️ Funcionalidades Implementadas

### ✨ Operações CRUD Completas

1. **📋 Listar Produtos**

   - Exibição em tabela responsiva
   - Contador total de produtos
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
- ✅ **Componentização total**
- ✅ **Comunicação @Input/@Output**
- ✅ **Separação de responsabilidades**
- ✅ **Arquitetura escalável**
- ✅ **Atualização para Angular 19**

## 🎓 Conceitos Aprendidos

### Angular Core
- **Componentização** - criação de componentes especializados
- **@Input decorator** - passagem de dados pai → filho  
- **@Output decorator** - emissão de eventos filho → pai
- **EventEmitter** - comunicação entre componentes
- **Two-way data binding** - sincronização de dados

### Arquitetura
- **Separation of Concerns** - cada componente uma responsabilidade
- **Single Responsibility Principle** - componentes focados
- **Component Communication** - padrões de comunicação
- **Event-driven Architecture** - baseado em eventos

---

**Desenvolvido por:** Nathan Cavalcante de Lima  
**Disciplina:** Aplicações com Interfaces Ricas  
**Instituição:** TADS/IFRN-CNAT  
**Ano:** 2025.1

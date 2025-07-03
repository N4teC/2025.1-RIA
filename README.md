# Aplicações com Interfaces Ricas - TADS/IFRN-CNAT 2025.1

### Sobre o Repositório

**Repositório para a matéria de Aplicações com Interfaces Ricas, ofertada pelo curso de TADS no IFRN-CNAT no ano de 2025.1.**

## 🛒 Gerenciador de Produtos - Angular + PrimeNG + Bulma

### 📋 Sobre o Projeto

Uma aplicação web desenvolvida em **Angular 19** que implementa um sistema completo de **CRUD (Create, Read, Update, Delete)** para gerenciamento de produtos. Esta implementação atende aos requisitos da atividade da disciplina.

### 🎯 Objetivos da Atividade Atendidos

✅ **Criar um projeto Angular 19** (PrimeNG ainda não é compatível com Angular 20)  
✅ **Incluir uma biblioteca de componentes UI Angular** (PrimeNG)  
✅ **Implementar operações CRUD completas** (inserir, atualizar, detalhar, remover, listar)  
✅ **Modelo com 3 tipos de atributos**: string, número e booleano

## 🚀 Tecnologias Utilizadas

- **Angular 19** - Framework principal
- **PrimeNG 19.1.3** - Biblioteca de componentes UI
- **Bulma CSS** - Framework CSS para estilização
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **FormsModule** - Manipulação de formulários

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

## 🏗️ Arquitetura do Projeto

```
project/src/
├── app/
│   ├── model/
│   │   └── produto.model.ts     # Interface do modelo
│   ├── app.component.ts         # Componente principal
│   ├── app.component.html       # Template da aplicação
│   ├── app.component.css        # Estilos (apenas comentários)
│   ├── app.config.ts           # Configuração do PrimeNG
│   └── app.routes.ts           # Rotas da aplicação
├── styles.css                  # Estilos globais (Bulma + PrimeIcons)
└── main.ts                     # Ponto de entrada
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

| Componente        | Função                        |
| ----------------- | ----------------------------- |
| `p-table`         | Exibição da lista de produtos |
| `p-dialog`        | Modal para inserir/editar     |
| `p-toolbar`       | Barra de ferramentas          |
| `p-toast`         | Notificações de feedback      |
| `p-confirmDialog` | Confirmação de exclusão       |
| `p-inputText`     | Campo de texto                |
| `p-inputNumber`   | Campo numérico                |
| `p-inputSwitch`   | Campo booleano                |
| `p-button`        | Botões com efeitos            |

## 🎨 Classes Bulma Utilizadas

| Categoria       | Classes                                           |
| --------------- | ------------------------------------------------- |
| **Layout**      | `section`, `container`, `box`, `field`, `control` |
| **Tipografia**  | `title`, `subtitle`, `label`, `has-text-*`        |
| **Espaçamento** | `mb-5`, `mr-2`, `is-grouped`                      |
| **Componentes** | `tag`, `buttons`, `help`                          |
| **Estados**     | `is-danger`, `is-success`, `is-warning`           |

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
@import "bulma/css/bulma.min.css";
@import "primeicons/primeicons.css";
```

## 📋 Simplificações Implementadas

### 🔧 Simplificações para Fins Didáticos

### 1. **Armazenamento de Dados**

❌ **Não implementado:** Banco de dados real  
✅ **Simplificado:** Dados em memória (array local)  
📝 **Justificativa:** Foco na implementação do CRUD e UI, não em persistência

### 2. **Autenticação e Autorização**

❌ **Não implementado:** Sistema de login/usuários  
✅ **Simplificado:** Acesso direto às funcionalidades  
📝 **Justificativa:** Não é requisito da atividade

### 3. **Roteamento**

❌ **Não implementado:** Múltiplas páginas/rotas  
✅ **Simplificado:** Single Page Application (SPA)  
📝 **Justificativa:** Foco no CRUD em um único componente

### 4. **Estrutura de Projeto**

❌ **Não implementado:** Múltiplos módulos e serviços  
✅ **Simplificado:** Componente único com lógica incorporada  
📝 **Justificativa:** Facilita a compreensão e manutenção

### 📊 Modelo de Dados Simplificado

```typescript
interface Produto {
  nome: string; // Apenas nome, sem ID único
  preco: number; // Sem formatação complexa de moeda
  disponivel: boolean; // Boolean simples
}
```

### Campos Não Implementados:

- ID único (usa índice do array)
- Data de criação/atualização
- Categoria do produto
- Descrição detalhada
- Imagens
- Estoque/quantidade

## 🎨 Simplificações de UI/UX

### ✅ **Mantido (Funcional)**

- Design responsivo básico
- Feedback visual com toasts
- Confirmações de ações
- Validação de formulários
- Efeitos visuais (ripple)

### ❌ **Simplificado**

- Sem paginação na tabela
- Sem filtros/busca
- Sem ordenação de colunas
- Sem exportação de dados

## 📈 Benefícios das Simplificações

### ✅ **Vantagens**

- **Rapidez no desenvolvimento** - Foco nos requisitos essenciais
- **Facilidade de compreensão** - Código mais direto e legível
- **Menor complexidade** - Ideal para fins didáticos
- **Demonstração clara** - CRUD completo em um único local

### ⚠️ **Limitações**

- **Escalabilidade reduzida** - Não adequado para produção
- **Reutilização limitada** - Componente monolítico
- **Manutenção complexa** - Para projetos maiores

## 🎯 Requisitos Atendidos

| Requisito          | Status | Implementação            |
| ------------------ | ------  | ------------------------ |
| Angular 19         | ✅     | Versão 19.2.0            |
| Biblioteca UI      | ✅     | PrimeNG 19.1.3           |
| CRUD Completo      | ✅     | Todas as operações       |
| Modelo com 3 tipos | ✅     | string, number, boolean  |
| Componentes UI     | ✅     | Extensivo uso do PrimeNG |

## 📈 Funcionalidades Avançadas Implementadas

- **Validação de Formulários** com feedback visual
- **Confirmação de Ações** destrutivas
- **Notificações Toast** para feedback do usuário
- **Interface Responsiva** para diferentes dispositivos
- **Efeitos Visuais** com ripple nos botões
- **Estado Reativo** com two-way data binding

## 🎯 Pontos de Destaque

- ✅ **Zero CSS customizado** - apenas Bulma + PrimeNG
- ✅ **Componentização completa** - uso extensivo de componentes
- ✅ **UX moderna** - feedback visual e interações fluidas
- ✅ **Código limpo** - TypeScript com tipagem forte
- ✅ **Responsive design** - funciona em mobile e desktop

---

**Desenvolvido por:** Nathan Cavalcante de Lima  
**Disciplina:** Aplicações com Interfaces Ricas  
**Instituição:** TADS/IFRN-CNAT  
**Ano:** 2025.1

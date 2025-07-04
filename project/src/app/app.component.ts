import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Produto } from './model/produto.model';
import { ProdutoListarComponent } from './produto-listar/produto-listar.component';
import { ProdutoInserirComponent } from './produto-inserir/produto-inserir.component';
import { ProdutoAtualizarComponent } from './produto-atualizar/produto-atualizar.component';
import { ProdutoDetalharComponent } from './produto-detalhar/produto-detalhar.component';
import { ProdutoExcluirComponent } from './produto-excluir/produto-excluir.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ProdutoListarComponent,
    ProdutoInserirComponent,
    ProdutoAtualizarComponent,
    ProdutoDetalharComponent,
    ProdutoExcluirComponent
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  produtos: Produto[] = [];
  
  // Estados dos dialogs
  dialogInserir: boolean = false;
  dialogAtualizar: boolean = false;
  dialogDetalhar: boolean = false;
  dialogExcluir: boolean = false;
  
  // Produto selecionado para edição/visualização/exclusão
  produtoSelecionado: Produto = { nome: '', preco: 0, disponivel: false };

  constructor(private readonly messageService: MessageService) {}

  ngOnInit() {
    this.produtos = [
      {
        id: 1,
        nome: 'Notebook Gamer',
        preco: 3500.0,
        disponivel: true,
      },
      {
        id: 2,
        nome: 'Mouse sem Fio',
        preco: 89.9,
        disponivel: true,
      },
      {
        id: 3,
        nome: 'Teclado Mecânico',
        preco: 299.99,
        disponivel: false,
      },
    ];
  }

  // Eventos do componente de listagem
  onNovoProduto() {
    this.dialogInserir = true;
  }

  onEditarProduto(produto: Produto) {
    this.produtoSelecionado = { ...produto };
    this.dialogAtualizar = true;
  }

  onDetalharProduto(produto: Produto) {
    this.produtoSelecionado = { ...produto };
    this.dialogDetalhar = true;
  }

  onExcluirProduto(produto: Produto) {
    this.produtoSelecionado = { ...produto };
    this.dialogExcluir = true;
  }

  // Eventos do componente de inserção
  onProdutoInserido(produto: Produto) {
    produto.id = this.createId();
    this.produtos.push(produto);
    this.produtos = [...this.produtos];
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Produto criado com sucesso!',
    });
  }

  // Eventos do componente de atualização
  onProdutoAtualizado(produto: Produto) {
    const index = this.produtos.findIndex((p) => p.id === produto.id);
    if (index > -1) {
      this.produtos[index] = produto;
      this.produtos = [...this.produtos];
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto atualizado com sucesso!',
      });
    }
  }

  // Eventos do componente de exclusão
  onProdutoExcluido(produto: Produto) {
    this.produtos = this.produtos.filter((p) => p.id !== produto.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Produto excluído com sucesso!',
    });
  }

  private createId(): number {
    if (this.produtos.length === 0) {
      return 1;
    }
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].id === i + 1) {
        continue;
      }
      return i + 1;
    }
    return this.produtos.length + 1;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Produto } from './model/produto.model';
import { ProdutoService } from './produto.service';
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

  constructor(
    private readonly messageService: MessageService,
    private readonly produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  private carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar produtos',
        });
      }
    });
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
    this.produtoService.inserir(produto).subscribe({
      next: (novoProduto) => {
        this.produtos.push(novoProduto);
        this.produtos = [...this.produtos];
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto criado com sucesso!',
        });
      },
      error: (error) => {
        console.error('Erro ao inserir produto:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar produto',
        });
      }
    });
  }

  // Eventos do componente de atualização
  onProdutoAtualizado(produto: Produto) {
    this.produtoService.atualizar(produto).subscribe({
      next: (produtoAtualizado) => {
        const index = this.produtos.findIndex((p) => p.id === produto.id);
        if (index > -1) {
          this.produtos[index] = produtoAtualizado;
          this.produtos = [...this.produtos];
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto atualizado com sucesso!',
          });
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar produto:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar produto',
        });
      }
    });
  }

  // Eventos do componente de exclusão
  onProdutoExcluido(produto: Produto) {
    if (produto.id) {
      this.produtoService.remover(produto.id).subscribe({
        next: () => {
          this.produtos = this.produtos.filter((p) => p.id !== produto.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto excluído com sucesso!',
          });
        },
        error: (error) => {
          console.error('Erro ao excluir produto:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir produto',
          });
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-listar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    TooltipModule
  ],
  templateUrl: './produto-listar.component.html',
  styleUrl: './produto-listar.component.css'
})
export class ProdutoListarComponent implements OnInit {
  produtos: Produto[] = [];
  
  constructor(
    private router: Router,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        console.log('Produtos carregados com sucesso:', produtos);
        if (produtos && produtos.length > 0) {
          this.produtos = produtos;
        } else {
          // Se não houver produtos ou a array estiver vazia, use dados de exemplo
          this.produtos = [
            { id: 1, nome: 'Produto Teste 1', preco: 10.99, disponivel: true },
            { id: 2, nome: 'Produto Teste 2', preco: 20.50, disponivel: false }
          ];
          console.log('Usando dados de exemplo:', this.produtos);
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        // Adicionando dados de exemplo para teste
        this.produtos = [
          { id: 1, nome: 'Produto Teste 1', preco: 10.99, disponivel: true },
          { id: 2, nome: 'Produto Teste 2', preco: 20.50, disponivel: false }
        ];
      }
    });
  }

  onNovoProduto() {
    this.router.navigate(['/produtos/novo']);
  }

  onEditarProduto(produto: Produto) {
    this.router.navigate(['/produtos/editar', produto.id]);
  }

  onExcluirProduto(produto: Produto) {
    this.router.navigate(['/produtos/excluir', produto.id]);
  }

  onDetalharProduto(produto: Produto) {
    this.router.navigate(['/produtos/detalhar', produto.id]);
  }
}

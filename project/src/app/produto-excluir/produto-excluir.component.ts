import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-excluir',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './produto-excluir.component.html',
  styleUrl: './produto-excluir.component.css'
})
export class ProdutoExcluirComponent implements OnInit {
  produto: Produto = { nome: '', preco: 0, disponivel: false };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarProduto();
  }

  carregarProduto() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.produtoService.detalhar(id).subscribe({
        next: (produto) => {
          this.produto = produto;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar os dados do produto'
          });
          setTimeout(() => this.router.navigate(['/produtos']), 2000);
        }
      });
    }
  }

  onConfirmar() {
    if (this.produto.id) {
      this.produtoService.remover(this.produto.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto excluído com sucesso'
          });
          setTimeout(() => this.router.navigate(['/produtos']), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro ao excluir o produto'
          });
        }
      });
    }
  }

  onCancelar() {
    this.router.navigate(['/produtos']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-detalhar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './produto-detalhar.component.html',
  styleUrl: './produto-detalhar.component.css'
})
export class ProdutoDetalharComponent implements OnInit {
  produto: Produto = { nome: '', preco: 0, disponivel: false };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private readonly messageService: MessageService
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

  onVoltar() {
    this.router.navigate(['/produtos']);
  }
}

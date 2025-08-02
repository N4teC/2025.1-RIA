import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-atualizar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './produto-atualizar.component.html',
  styleUrl: './produto-atualizar.component.css'
})
export class ProdutoAtualizarComponent implements OnInit {
  produto: Produto = { nome: '', preco: 0, disponivel: false };
  submitted: boolean = false;

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
  
  onSalvar() {
    this.submitted = true;
    
    if (this.produto.nome.trim()) {
      this.produtoService.atualizar(this.produto).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto atualizado com sucesso'
          });
          setTimeout(() => this.router.navigate(['/produtos']), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro ao atualizar o produto'
          });
        }
      });
    }
  }
  
  onCancelar() {
    this.router.navigate(['/produtos']);
  }
}

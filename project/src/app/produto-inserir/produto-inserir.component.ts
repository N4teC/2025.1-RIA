import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-inserir',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './produto-inserir.component.html',
  styleUrl: './produto-inserir.component.css'
})
export class ProdutoInserirComponent implements OnInit {
  produto: Produto = { nome: '', preco: 0, disponivel: false };
  submitted: boolean = false;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.produto = { nome: '', preco: 0, disponivel: false };
    this.submitted = false;
  }
  
  onSalvar() {
    this.submitted = true;

    if (this.produto.nome?.trim() && this.produto.preco > 0) {
      this.produtoService.inserir(this.produto).subscribe({
        next: (produtoInserido) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto inserido com sucesso'
          });
          setTimeout(() => this.router.navigate(['/produtos']), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro ao inserir o produto'
          });
        }
      });
    }
  }
  
  onCancelar() {
    this.router.navigate(['/produtos']);
  }
}

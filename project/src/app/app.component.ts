import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { Produto } from './model/produto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule,
    PanelModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  produtos: Produto[] = [];
  produtoDialog: boolean = false;
  produto: Produto = { nome: '', preco: 0, disponivel: false };
  submitted: boolean = false;
  isNewProduct: boolean = false;

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}

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

  openNew() {
    this.produto = { nome: '', preco: 0, disponivel: false };
    this.submitted = false;
    this.isNewProduct = true;
    this.produtoDialog = true;
  }

  editProduto(produto: Produto) {
    this.produto = { ...produto };
    this.isNewProduct = false;
    this.produtoDialog = true;
  }

  hideDialog() {
    this.produtoDialog = false;
    this.submitted = false;
  }

  saveProduto() {
    this.submitted = true;

    if (this.produto.nome?.trim() && this.produto.preco > 0) {
      if (this.isNewProduct) {
        this.produto.id = this.createId();
        this.produtos.push(this.produto);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto Criado',
        });
      } else {
        const index = this.produtos.findIndex((p) => p.id === this.produto.id);
        if (index > -1) {
          this.produtos[index] = this.produto;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto Atualizado',
        });
      }

      this.produtos = [...this.produtos];
      this.produtoDialog = false;
      this.produto = { nome: '', preco: 0, disponivel: false };
    }
  }

  deleteProduto(produto: Produto) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja remover ' + produto.nome + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.produtos = this.produtos.filter((p) => p.id !== produto.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto Removido',
        });
      },
    });
  }

  private createId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }
}

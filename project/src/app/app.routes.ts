import { Routes } from '@angular/router';
import { ProdutoListarComponent } from './produto-listar/produto-listar.component';
import { ProdutoInserirComponent } from './produto-inserir/produto-inserir.component';
import { ProdutoAtualizarComponent } from './produto-atualizar/produto-atualizar.component';
import { ProdutoDetalharComponent } from './produto-detalhar/produto-detalhar.component';
import { ProdutoExcluirComponent } from './produto-excluir/produto-excluir.component';

export const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutoListarComponent },
  { path: 'produtos/novo', component: ProdutoInserirComponent },
  { path: 'produtos/editar/:id', component: ProdutoAtualizarComponent },
  { path: 'produtos/detalhar/:id', component: ProdutoDetalharComponent },
  { path: 'produtos/excluir/:id', component: ProdutoExcluirComponent }
];

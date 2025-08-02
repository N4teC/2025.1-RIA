import { Routes } from '@angular/router';
import { ProdutoListarComponent } from './produto-listar/produto-listar.component';
import { ProdutoInserirComponent } from './produto-inserir/produto-inserir.component';
import { ProdutoAtualizarComponent } from './produto-atualizar/produto-atualizar.component';
import { ProdutoDetalharComponent } from './produto-detalhar/produto-detalhar.component';
import { ProdutoExcluirComponent } from './produto-excluir/produto-excluir.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: ProdutoListarComponent, canActivate: [AuthGuard] },
  { path: 'produtos/novo', component: ProdutoInserirComponent, canActivate: [AuthGuard] },
  { path: 'produtos/editar/:id', component: ProdutoAtualizarComponent, canActivate: [AuthGuard] },
  { path: 'produtos/detalhar/:id', component: ProdutoDetalharComponent, canActivate: [AuthGuard] },
  { path: 'produtos/excluir/:id', component: ProdutoExcluirComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' } // Rota wildcard para páginas não encontradas
];

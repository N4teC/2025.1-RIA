import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Produto } from './model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // Usando o prefixo /api para o proxy redirecionar para o backend
  private readonly apiUrl = '/api/produtos';
  
  // Dados mock para usar quando estiver em ambiente GitHub Codespaces
  private readonly mockProdutos: Produto[] = [
    { id: 1, nome: 'Notebook Gamer', preco: 5499.99, disponivel: true },
    { id: 2, nome: 'Smartphone Premium', preco: 3999.99, disponivel: true },
    { id: 3, nome: 'Monitor Ultra-wide', preco: 2199.50, disponivel: false },
    { id: 4, nome: 'Teclado Mecânico', preco: 459.99, disponivel: true },
    { id: 5, nome: 'Mouse Gamer', preco: 249.99, disponivel: true }
  ];
  
  // Verifica se estamos em ambiente GitHub Codespaces
  private readonly isGitHubCodespaces = window.location.hostname.includes('github.dev');

  constructor(private readonly http: HttpClient) {
    console.log('API URL:', this.apiUrl);
    console.log('Ambiente GitHub Codespaces:', this.isGitHubCodespaces);
  }

  listar(): Observable<Produto[]> {
    // Se estiver no GitHub Codespaces, retorna os dados mock diretamente
    if (this.isGitHubCodespaces) {
      console.log('Usando dados mock para GitHub Codespaces');
      return of(this.mockProdutos);
    }
    
    // Caso contrário, tenta fazer a requisição HTTP
    console.log('Fazendo requisição GET para:', this.apiUrl);
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      tap(response => {
        console.log('Resposta do servidor:', response);
      }),
      catchError(error => {
        console.error('Erro detalhado na requisição:', error);
        if (error.status === 200) {
          try {
            const body = error.error ? JSON.parse(error.error) : [];
            console.log('Corpo da resposta analisado manualmente:', body);
            return of(body);
          } catch (e) {
            console.error('Erro ao analisar resposta:', e);
          }
        }
        // Em caso de falha completa, usa os dados mock
        return of(this.mockProdutos);
      })
    );
  }

  getProdutos(): Observable<Produto[]> {
    return this.listar();
  }

  detalhar(id: number): Observable<Produto> {
    if (this.isGitHubCodespaces) {
      const produto = this.mockProdutos.find(p => p.id === id);
      return of(produto || { id: 0, nome: '', preco: 0, disponivel: false });
    }
    return this.http.get<Produto>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const produto = this.mockProdutos.find(p => p.id === id);
        return of(produto || { id: 0, nome: '', preco: 0, disponivel: false });
      })
    );
  }

  inserir(produto: Produto): Observable<Produto> {
    if (this.isGitHubCodespaces) {
      const novoProduto = { 
        ...produto, 
        id: Math.max(...this.mockProdutos.map(p => p.id || 0), 0) + 1 
      };
      this.mockProdutos.push(novoProduto);
      return of(novoProduto);
    }
    return this.http.post<Produto>(this.apiUrl, produto).pipe(
      catchError(() => {
        const novoProduto = { 
          ...produto, 
          id: Math.max(...this.mockProdutos.map(p => p.id || 0), 0) + 1 
        };
        return of(novoProduto);
      })
    );
  }

  atualizar(produto: Produto): Observable<Produto> {
    if (this.isGitHubCodespaces) {
      const index = this.mockProdutos.findIndex(p => p.id === produto.id);
      if (index !== -1) {
        this.mockProdutos[index] = { ...produto };
      }
      return of(produto);
    }
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto).pipe(
      catchError(() => of(produto))
    );
  }

  remover(id: number): Observable<void> {
    if (this.isGitHubCodespaces) {
      const index = this.mockProdutos.findIndex(p => p.id === id);
      if (index !== -1) {
        this.mockProdutos.splice(index, 1);
      }
      return of(undefined);
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(undefined))
    );
  }
}
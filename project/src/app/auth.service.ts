import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

export interface Usuario {
  id: number;
  email: string;
  nome: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  private readonly usuarioSubject = new BehaviorSubject<Usuario | null>(this.getUsuario());

  public token$ = this.tokenSubject.asObservable();
  public usuario$ = this.usuarioSubject.asObservable();
  public isLoggedIn$ = this.token$.pipe(
    map((token: string | null) => !!token)
  );

  constructor(private readonly http: HttpClient) {}

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, senha })
      .pipe(
        tap((response: LoginResponse) => {
          this.setToken(response.token);
          this.setUsuario(response.usuario);
          this.tokenSubject.next(response.token);
          this.usuarioSubject.next(response.usuario);
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.removeUsuario();
    this.tokenSubject.next(null);
    this.usuarioSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private setUsuario(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

  private removeUsuario(): void {
    localStorage.removeItem('usuario');
  }

  verificarToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/verificar-token`);
  }
}

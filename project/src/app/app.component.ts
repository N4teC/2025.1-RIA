import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AuthService, Usuario } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule,
    ToolbarModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Gerenciador de Produtos';
  isLoggedIn$: Observable<string | null>;
  usuario$: Observable<Usuario | null>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.isLoggedIn$ = this.authService.token$;
    this.usuario$ = this.authService.usuario$;
  }

  ngOnInit(): void {
    // Verificar se o usuário já está logado ao iniciar a aplicação
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/produtos']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

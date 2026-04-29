import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  usuarioLogado: any = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.carregarUsuarioLogado();
      });
  }

  ngOnInit() {
    this.carregarUsuarioLogado();
  }

  carregarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    this.usuarioLogado = usuario ? JSON.parse(usuario) : null;
  }

  isLojista(): boolean {
    return this.usuarioLogado?.tipo === 'lojista';
  }
}
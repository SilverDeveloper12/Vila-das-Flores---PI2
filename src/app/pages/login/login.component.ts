import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagemErro = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  entrar() {
    this.apiService.login(this.email, this.senha).subscribe({
      next: (usuarios: Usuario[]) => {
        if (usuarios.length > 0) {
          const usuarioLogado = usuarios[0];

          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

          if (usuarioLogado.tipo === 'lojista') {
            this.router.navigate(['/produtos']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.mensagemErro = 'Email ou senha incorretos.';
        }
      },
      error: () => {
        this.mensagemErro = 'Erro ao tentar fazer login.';
      }
    });
  }

  irParaCadastroCliente() {
    this.router.navigate(['/cadastro-cliente']);
  }

  irParaCadastroLojista() {
    this.router.navigate(['/cadastro-lojista']);
  }
}
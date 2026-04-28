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
  erroAnimado = false;
  mostrarErroLogin() {
  this.mensagemErro = 'Email ou senha incorretos.';

  this.erroAnimado = false;

  setTimeout(() => {
    this.erroAnimado = true;
  }, 10);
}

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  entrar() {
  this.mensagemErro = '';
  this.erroAnimado = false;

  const emailDigitado = this.email.trim();
  const senhaDigitada = this.senha.trim();

  this.apiService.login(emailDigitado).subscribe({
    next: (usuarios: Usuario[]) => {
  const usuarioEncontrado = usuarios.find(
    usuario => usuario.senha === senhaDigitada
  );

  if (usuarioEncontrado) {
    console.log('Usuário logado:', usuarioEncontrado);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

    if (usuarioEncontrado.tipo === 'lojista') {
      this.router.navigate(['/produtos']);
    } else {
      this.router.navigate(['/']);
    }
  } else {
    this.mostrarErroLogin();
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
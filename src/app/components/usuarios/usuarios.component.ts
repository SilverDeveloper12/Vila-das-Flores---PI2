import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/models';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;

  newUsuario: Usuario = {
    nome: '',
    login: '',
    senha: '',
    telefone: '',
    email: '',
    endereco: '',
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar usuários. Certifique-se de que o JSON Server está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }

  onSubmit(): void {
  if (
    !this.newUsuario.nome ||
    !this.newUsuario.login ||
    !this.newUsuario.senha ||
    !this.newUsuario.telefone ||
    !this.newUsuario.email ||
    !this.newUsuario.endereco
  ) {
    return;
  }

  this.apiService.createUsuario(this.newUsuario).subscribe({
    next: () => {
      this.successMessage = 'Usuário criado com sucesso!';
      this.newUsuario = {
        nome: '',
        login: '',
        senha: '',
        telefone: '',
        email: '',
        endereco: ''
      };
      this.loadUsuarios();
    },
    error: (err) => {
      console.error('Erro ao criar usuário:', err);
    }
  });
}
}
import { Component } from '@angular/core';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProdutosComponent } from './components/produtos/produtos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UsuariosComponent,
    ProdutosComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vila-Das-Flores';
}
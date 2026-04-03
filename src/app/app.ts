import { Component } from '@angular/core';
import { UsuariosComponent } from './components/usuarios/usuarios';
import { ProdutosComponent } from './components/produtos/produtos';
import { PostsComponent } from './components/posts/posts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UsuariosComponent,
    ProdutosComponent,
    PostsComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Vila-Das-Flores';
}
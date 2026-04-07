export interface Usuario {
  id?: string;
  nome: string;
  login: string;
  senha: string;
  telefone: string;
  email: string;
  endereco: string;
}

export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagem: string;
  descricao: string;
}

export interface Carrinho {
  id?: string;
  usuarioId: string;
  produtoId: string;
  quantidade: number;
}

export interface Pedido {
  id?: string;
  usuarioId: string;
  data: string;
  status: string;
  total: number;
}

export interface ItemPedido {
  id?: string;
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}
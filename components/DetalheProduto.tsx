import React, { useEffect, useState } from 'react'; // Importa React e hooks para estado e efeitos colaterais
import axios from 'axios'; // Importa axios para requisições à API
import { useRouter } from 'next/router'; // Importa useRouter para rotas dinâmicas

// Define a interface para os dados do produto
interface Produto {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
}

// Ajustando para usar classes globais em vez de `DetalheProduto.module.css`
const DetalheProduto: React.FC = () => {
  const [produto, setProduto] = useState<Produto | null>(null); // Estado para armazenar os detalhes do produto
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const router = useRouter(); // Acessa o objeto do roteador
  const { id } = router.query; // Extrai o ID do produto da rota

  useEffect(() => {
    // Busca os detalhes do produto quando o componente é montado ou o ID muda
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`) // Faz a requisição à API para buscar o produto pelo ID
        .then((response) => {
          setProduto(response.data); // Define os dados do produto buscado
          setLoading(false); // Atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error('Erro ao buscar o produto:', error); // Loga erros, se houver
          setLoading(false); // Atualiza o estado de carregamento
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
      </div>
    ); // Exibe uma animação de carregamento enquanto os dados são buscados
  }

  if (!produto) {
    return <p>Produto não encontrado.</p>; // Exibe uma mensagem caso o produto não seja encontrado
  }

  return (
    <div className="produtoContainer">
      {/* Renderiza os detalhes do produto */}
      <h1 className="produtoTitulo">{produto.title}</h1>
      <img src={produto.thumbnail} alt={produto.title} className="produtoImagem" />
      <p className="produtoDescricao"><strong>Descrição:</strong> {produto.description}</p>
      <p className="produtoPreco"><strong>Preço:</strong> R$ {produto.price}</p>
      <p className="produtoCategoria"><strong>Categoria:</strong> {produto.category}</p>
      <p className="produtoAvaliacao"><strong>Avaliação:</strong> {produto.rating}</p>
    </div>
  );
};

export default DetalheProduto; // Exporta o componente

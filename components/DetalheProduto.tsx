import React, { useEffect, useState } from 'react'; // importa react e hooks para estado e efeitos colaterais
import axios from 'axios'; // importa axios para requisições à api
import { useRouter } from 'next/router'; // importa useRouter para rotas dinâmicas

// define a interface para os dados do produto
interface Produto {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
}

// ajustando para usar classes globais em vez de `DetalheProduto.module.css`
const DetalheProduto: React.FC = () => {
  const [produto, setProduto] = useState<Produto | null>(null); // estado para armazenar os detalhes do produto
  const [loading, setLoading] = useState(true); // estado para gerenciar o carregamento
  const router = useRouter(); // acessa o objeto do roteador
  const { id } = router.query; // extrai o id do produto da rota

  useEffect(() => {
    // busca os detalhes do produto quando o componente é montado ou o id muda
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`) // faz a requisição à api para buscar o produto pelo id
        .then((response) => {
          setProduto(response.data); // define os dados do produto buscado
          setLoading(false); // atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error('erro ao buscar o produto:', error); // loga erros, se houver
          setLoading(false); // atualiza o estado de carregamento
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
      </div>
    ); // exibe uma animação de carregamento enquanto os dados são buscados
  }

  if (!produto) {
    return <p>produto não encontrado.</p>; // exibe uma mensagem caso o produto não seja encontrado
  }

  return (
    <div className="produtoContainer">
      {/* renderiza os detalhes do produto */}
      <h1 className="produtoTitulo">{produto.title}</h1>
      <img src={produto.thumbnail} alt={produto.title} className="produtoImagem" />
      <p className="produtoDescricao"><strong>descrição:</strong> {produto.description}</p>
      <p className="produtoPreco"><strong>preço:</strong> r$ {produto.price}</p>
      <p className="produtoCategoria"><strong>categoria:</strong> {produto.category}</p>
      <p className="produtoAvaliacao"><strong>avaliação:</strong> {produto.rating}</p>
    </div>
  );
};

export default DetalheProduto; // exporta o componente

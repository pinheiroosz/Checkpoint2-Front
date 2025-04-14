"use client";

// importações necessárias para a página de detalhes do produto
import React, { useEffect, useState } from "react"; // react e hooks para gerenciar estado e efeitos colaterais
import { useRouter } from "next/router"; // hook do next.js para acessar os parâmetros da rota
import axios from "axios"; // biblioteca para realizar requisições http

// interface para definir a estrutura dos detalhes de um produto
interface DetalheProduto {
  id: number; // id do produto
  title: string; // nome do produto
  description: string; // descrição do produto
  price: number; // preço do produto
  category: string; // categoria do produto
  rating: number; // avaliação do produto
  thumbnail: string; // url da imagem do produto
}

// componente funcional para a página de detalhes do produto
const ProdutoDetalhes: React.FC = () => {
  // estado para armazenar os detalhes do produto
  const [produto, setProduto] = useState<DetalheProduto | null>(null);
  // estado para gerenciar o carregamento dos dados
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // hook do next.js para acessar os parâmetros da rota
  const { id } = router.query; // obtém o id do produto a partir da url

  // hook useEffect para buscar os detalhes do produto pela api quando o id é fornecido
  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`) // requisição get para a api com o id do produto
        .then((response) => {
          setProduto(response.data); // atualiza o estado com os detalhes do produto
          setLoading(false); // atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error("erro ao buscar detalhes do produto:", error); // log de erro em caso de falha
          setLoading(false); // atualiza o estado de carregamento
        });
    }
  }, [id]);

  // renderiza um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
      </div>
    );
  }

  // renderiza uma mensagem caso o produto não seja encontrado
  if (!produto) {
    return <p>produto não encontrado.</p>;
  }

  // renderiza os detalhes do produto quando os dados são carregados
  return (
    <div className="produtoContainer">
      <div className="produtoDetalhes">
        <img src={produto.thumbnail} alt={produto.title} className="produtoImagem" />
        <div className="produtoInfo">
          <h1 className="produtoTitulo">{produto.title}</h1>
          <p className="produtoDescricao"><strong>descrição:</strong> {produto.description}</p>
          <p className="produtoPreco"><strong>preço:</strong> r$ {produto.price.toFixed(2)}</p>
          <p className="produtoCategoria"><strong>categoria:</strong> {produto.category}</p>
          <p className="produtoAvaliacao"><strong>avaliação:</strong> {produto.rating} / 5</p>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhes; // exporta o componente para ser usado como a página de detalhes
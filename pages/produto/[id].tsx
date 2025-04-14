"use client";

// Importações necessárias para a página de detalhes do produto
import React, { useEffect, useState } from "react"; // React e hooks para gerenciar estado e efeitos colaterais
import { useRouter } from "next/router"; // Hook do Next.js para acessar os parâmetros da rota
import axios from "axios"; // Biblioteca para realizar requisições HTTP

// Interface para definir a estrutura dos detalhes de um produto
interface DetalheProduto {
  id: number; // ID do produto
  title: string; // Nome do produto
  description: string; // Descrição do produto
  price: number; // Preço do produto
  category: string; // Categoria do produto
  rating: number; // Avaliação do produto
  thumbnail: string; // URL da imagem do produto
}

// Componente funcional para a página de detalhes do produto
const ProdutoDetalhes: React.FC = () => {
  // Estado para armazenar os detalhes do produto
  const [produto, setProduto] = useState<DetalheProduto | null>(null);
  // Estado para gerenciar o carregamento dos dados
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Hook do Next.js para acessar os parâmetros da rota
  const { id } = router.query; // Obtém o ID do produto a partir da URL

  // Hook useEffect para buscar os detalhes do produto pela API quando o ID é fornecido
  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`) // Requisição GET para a API com o ID do produto
        .then((response) => {
          setProduto(response.data); // Atualiza o estado com os detalhes do produto
          setLoading(false); // Atualiza o estado de carregamento
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do produto:", error); // Log de erro em caso de falha
          setLoading(false); // Atualiza o estado de carregamento
        });
    }
  }, [id]);

  // Renderiza um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
      </div>
    );
  }

  // Renderiza uma mensagem caso o produto não seja encontrado
  if (!produto) {
    return <p>Produto não encontrado.</p>;
  }

  // Renderiza os detalhes do produto quando os dados são carregados
  return (
    <div className="produtoContainer">
      <div className="produtoDetalhes">
        <img src={produto.thumbnail} alt={produto.title} className="produtoImagem" />
        <div className="produtoInfo">
          <h1 className="produtoTitulo">{produto.title}</h1>
          <p className="produtoDescricao"><strong>Descrição:</strong> {produto.description}</p>
          <p className="produtoPreco"><strong>Preço:</strong> R$ {produto.price.toFixed(2)}</p>
          <p className="produtoCategoria"><strong>Categoria:</strong> {produto.category}</p>
          <p className="produtoAvaliacao"><strong>Avaliação:</strong> {produto.rating} / 5</p>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhes; // Exporta o componente para ser usado como a página de detalhes
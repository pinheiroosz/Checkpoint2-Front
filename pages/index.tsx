"use client";

// Importações necessárias para o funcionamento da página inicial
import React, { useEffect, useState } from "react"; // React e hooks para gerenciar estado e efeitos colaterais
import axios from "axios"; // Biblioteca para realizar requisições HTTP
import CardProduto from "../components/CardProduto"; // Componente para exibir informações de um produto
import "../styles/globals.css"; // Estilos globais da aplicação

// Interface para definir a estrutura de um produto retornado pela API
interface Produto {
  id: number; // ID do produto
  title: string; // Nome do produto
  price: number; // Preço do produto
  thumbnail: string; // URL da imagem do produto
}
console.log("salve, professor :)");


// Componente funcional para a página inicial do catálogo de produtos
const Home: React.FC = () => {
  // Estado para armazenar a lista de produtos
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // Estado para gerenciar o carregamento dos dados
  const [loading, setLoading] = useState(true);

  // Hook useEffect para buscar os produtos da API quando o componente é montado
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products") // Requisição GET para a API
      .then((response) => {
        setProdutos(response.data.products); // Atualiza o estado com os produtos retornados
        setLoading(false); // Atualiza o estado de carregamento
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error); // Log de erro em caso de falha
        setLoading(false); // Atualiza o estado de carregamento
      });
  }, []);

  // Renderiza um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
      </div>
    );
  }

  // Renderiza a lista de produtos quando os dados são carregados
  return (
    <body>
      <div className="pagina-inicial">
        <h1>Catálogo de Produtos</h1>

        {/* Renderização da lista de produtos */}
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id} // Chave única para cada produto
              id={produto.id} // ID do produto
              title={produto.title} // Nome do produto
              price={produto.price} // Preço do produto
              image={produto.thumbnail} // URL da imagem do produto
            />
          ))}
        </div>
      </div>
    </body>
  );
};

export default Home; // Exporta o componente para ser usado como a página inicial
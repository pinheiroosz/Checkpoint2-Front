"use client";

// importações necessárias para o funcionamento da página inicial
import React, { useEffect, useState } from "react"; // react e hooks para gerenciar estado e efeitos colaterais
import axios from "axios"; // biblioteca para realizar requisições http
import CardProduto from "../components/CardProduto"; // componente para exibir informações de um produto
import "../styles/globals.css"; // estilos globais da aplicação

// interface para definir a estrutura de um produto retornado pela api
interface Produto {
  id: number; // id do produto
  title: string; // nome do produto
  price: number; // preço do produto
  thumbnail: string; // url da imagem do produto
}
console.log("salve, professor :)");

// componente funcional para a página inicial do catálogo de produtos
const Home: React.FC = () => {
  // estado para armazenar a lista de produtos
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // estado para gerenciar o carregamento dos dados
  const [loading, setLoading] = useState(true);

  // hook useEffect para buscar os produtos da api quando o componente é montado
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products") // requisição get para a api
      .then((response) => {
        setProdutos(response.data.products); // atualiza o estado com os produtos retornados
        setLoading(false); // atualiza o estado de carregamento
      })
      .catch((error) => {
        console.error("erro ao buscar produtos:", error); // log de erro em caso de falha
        setLoading(false); // atualiza o estado de carregamento
      });
  }, []);

  // renderiza um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
      </div>
    );
  }

  // renderiza a lista de produtos quando os dados são carregados
  return (
    <body>
      <div className="pagina-inicial">
        <h1>Catálogo de Produtos</h1>

        {/* renderização da lista de produtos */}
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id} // chave única para cada produto
              id={produto.id} // id do produto
              title={produto.title} // nome do produto
              price={produto.price} // preço do produto
              image={produto.thumbnail} // url da imagem do produto
            />
          ))}
        </div>
      </div>
    </body>
  );
};

export default Home; // exporta o componente para ser usado como a página inicial
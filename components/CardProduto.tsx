"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Interface para definir as propriedades esperadas pelo componente CardProduto
interface CardProdutoProps {
  id: number; // ID do produto
  title: string; // Nome do produto
  price: number; // Preço do produto
  image: string; // URL da imagem do produto
}

// Componente funcional para exibir informações básicas do produto
const CardProduto: React.FC<CardProdutoProps> = ({ id, title, price, image }) => {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    router.push(`/produto/${id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className="card-produto"
      onClick={handleCardClick}
      style={{ cursor: 'pointer', opacity: imageLoaded ? 1 : 0.5, transition: 'opacity 0.3s ease-in-out' }}
    >
      {/* Placeholder enquanto a imagem carrega */}
      {!imageLoaded && <div className="image-placeholder">Carregando...</div>}

      {/* Exibição da imagem do produto */}
      <img
        src={image}
        alt={title}
        className="produto-imagem"
        onLoad={handleImageLoad}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />

      {/* Exibição do nome do produto */}
      <h2 className="produto-titulo">{title}</h2>

      {/* Exibição do preço do produto */}
      <p className="produto-preco">R$ {price.toFixed(2)}</p>
    </div>
  );
};

export default CardProduto;
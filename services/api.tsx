import axios from 'axios';

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: 'https://dummyjson.com', // URL base para as requisições
  timeout: 10000, // Tempo limite de 10 segundos
});

// Exemplo de função para buscar um produto por ID
export const getProdutoById = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    throw error;
  }
};

// Exemplo de função para buscar todos os produtos
export const getProdutos = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

export default api;
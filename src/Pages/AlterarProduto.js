import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImagePopup from '../Components/ImagePopup';
import { Carousel } from 'react-responsive-carousel';

const Swal = require('sweetalert2');

const AlterarProduto = ({ token }) => {
  const { produtoId } = useParams();

  const [produtoExistente, setProdutoExistente] = useState({
    nomeProduto: '',
    precoProduto: 0,
    quantidadeProduto: '',
    descricaoCurta: '',
    descricaoCompleta: '',
    imagem: null,
    image_sec: [],
  });

  const [imagensExistentes, setImagensExistentes] = useState([]);

  const [produto, setProduto] = useState({
    nomeProduto: '',
    precoProduto: 0,
    quantidadeProduto: '',
    descricaoCurta: '',
    descriçãoCompleta: '',
    imagem: null,
    image_sec: [], // ADAPTAR DE ACORDO COM A API
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    if (event.target.name === 'imagem') {
      // Main image handling
      const file = fileArray[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setProduto((prevState) => ({
          ...prevState,
          imagem: file,
        }));
      };
      reader.readAsDataURL(file);
    } else if (event.target.name === 'produtoImagensSec') {
      // Secondary images handling
      setProduto((prevState) => ({
        ...prevState,
        image_sec: fileArray,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nomeProduto', produto.nomeProduto);
      formData.append('precoProduto', produto.precoProduto);
      formData.append('quantidadeProduto', produto.quantidadeProduto);
      formData.append('descricaoCurta', produto.descricaoCurta);
      formData.append('descricaoCompleta', produto.descricaoCompleta);
      formData.append('imagem', produto.imagem);

      // Append each secondary image to the form data
      produto.image_sec.forEach((file) => {
        formData.append('image_sec', file);
      });

      const response = await axios.put(`https://www.sea7api.com.br/atualizar/${produtoId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Send the token in the request header
        },
      });


      Swal.fire({
        icon: 'success',
        title: 'Produto cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });

      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao fazer POST:', error);
      console.log({ token });
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowPopup(true);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  useEffect(() => {
    // Faça uma solicitação para buscar os detalhes do produto existente com base no produtoId
    // Atualize o estado do produtoExistente com os valores obtidos da resposta da API
    async function fetchProdutoExistente() {
      try {
        const response = await axios.get(`https://www.sea7api.com.br/buscarPorId/${produtoId}`);
        const produtoExistente = response.data;

        setProdutoExistente({
          nomeProduto: produtoExistente.nomeProduto,
          precoProduto: produtoExistente.precoProduto,
          quantidadeProduto: produtoExistente.quantidadeProduto,
          descricaoCurta: produtoExistente.descricaoCurta,
          descricaoCompleta: produtoExistente.descricaoCompleta,
          imagem: null, // Deixe a imagem em branco para não exibir a imagem existente no formulário
          image_sec: [], // Deixe a image_sec em branco para não exibir as imagens secundárias existentes no formulário
        });

        // Atualize o estado das imagens existentes
        setImagensExistentes(produtoExistente.image_sec);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    }

    fetchProdutoExistente();
  }, [produtoId]);


  return (
   <div className='grid mx-auto pt-0.5'>
     <div className='flex justify-center items-center min-h-screen px-4'>
       <div className='class="bg-white p-6 md:p-10 w-full md:w-1/2 rounded-md shadow-md border-gray-200 border-[5px] flex flex-col md:flex-row'>
          {/* Parte Esquerda - Inputs */}
          <form onSubmit={handleSubmit} className='space-y-4 w-full md:w-2/3 pr-4'>
            <label htmlFor='nomeProduto' className='text-gray-900 font-semibold'>
              Nome da embarcação:
            </label>
            <input
              type='text'
              className='w-full rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              id='nomeProduto'
              name='nomeProduto'
              value={produto.nomeProduto}
              onChange={handleChange}
            />

            <label htmlFor='precoProduto' className='text-gray-900 font-semibold'>
              Preço:
            </label>
            <input
              type='number'
              className='w-full rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              id='precoProduto'
              name='precoProduto'
              value={produto.precoProduto}
              onChange={handleChange}
            />

            <label htmlFor='quantidadeProduto' className='text-gray-900 font-semibold'>
              Quantidade de Pés:
            </label>
            <input
              type='number'
              className='w-full rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              id='quantidadeProduto'
              name='quantidadeProduto'
              value={produto.quantidadeProduto}
              onChange={handleChange}
            />

            <label htmlFor='descricaoCurta' className='text-gray-900 font-semibold'>
              Descrição Curta:
            </label>
            <input
              type='text'
              className='w-full rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              id='descricaoCurta'
              name='descricaoCurta'
              value={produto.descricaoCurta}
              onChange={handleChange}
            />

            <label htmlFor='descricaoCompleta' className='text-gray-900 font-semibold'>
              Descrição Completa:
            </label>
            <textarea
              className='w-full rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              id='descricaoCompleta'
              name='descricaoCompleta'
              value={produto.descricaoCompleta}
              onChange={handleChange}
            />

            <button
              type='submit'
              className='w-full md:w-auto bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md'
            >
              Adicionar Embarcação
            </button>
          </form>

          {/* Parte Direita - Imagens */}
          <div className='w-2/3 md:w-1/3 mt-4'>
            <div className='grid'>
              <label htmlFor='produtoImagem' className='text-gray-900 font-semibold'>
                Imagem Destaque:
              </label>
              <input
                type='file'
                className='w-full focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 leading-8 transition-colors duration-200 ease-in-out"'
                id='imagem'
                name='imagem'
                onChange={handleImageChange}
              />
            </div>
            {produto.imagem && (
              <div className=''>
                <img
                  src={URL.createObjectURL(produto.imagem)}
                  alt='Main Preview'
                  className='max-w-[100px] mt-2'
                />
              </div>
            )}
            <label htmlFor='produtoImagensSec' className='text-gray-900 font-semibold'>
              Imagens Secundárias:
            </label>
            <input
              type='file'
              className='w-full focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 leading-8 transition-colors duration-200 ease-in-out"'
              id='produtoImagensSec'
              name='produtoImagensSec'
              multiple
              onChange={handleImageChange}
            />
            <div className='imgs-container mt-2 flex space-x-2'>
              {produto.image_sec.slice(0, 3).map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Secondary Preview ${index + 1}`}
                  className='max-w-[100px] h-[100px] cursor-pointer'
                  onClick={() => openModal(index)}
                />
              ))}
            </div>
            {produto.image_sec.length > 3 && (
              <button
                className='text-blue-500 mt-2 cursor-pointer'
                onClick={() => setModalOpen(true)}
              >
                Ver todas as imagens
              </button>
            )}
            {modalOpen && (
              <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50'>
                <div className='max-w-screen-md w-full mx-4 my-2  bg-white shadow-md rounded-md'>
                  <div className='p-4'>
                    <Carousel showThumbs={false} selectedItem={selectedImageIndex} showArrows={false}>
                      {produto.image_sec.map((image, index) => (
                        <div key={index}>
                          <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <div className='flex flex-wrap py-2 justify-center items-center'>
                    {produto.image_sec.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Secondary Preview ${index + 1}`}
                        className={`max-w-[35px] h-[35px] cursor-pointer m-1 ${selectedImageIndex === index ? 'border-2 border-s7green' : ''
                          }`}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    ))}
                  </div>
                  <div className='flex justify-center mt-4'>
                    <button
                      className='bg-gray-800 text-white py-2 mb-4 px-4 rounded-md'
                      onClick={() => setModalOpen(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};


export default AlterarProduto

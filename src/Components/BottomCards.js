import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BottomCards = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {

    try {
      const response = await axios.get('https://www.sea7api.com.br/mensagem/buscar');
      const itemsData = response.data;
      setItems(itemsData);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

useEffect(() => {
  fetchItems();
}, []);

// Função para ordenar os itens pelo campo 'id' em ordem decrescente (maior ID primeiro)
const sortByItemIdDescending = (a, b) => {
  return b.id - a.id;
};

// Ordenar os itens
const sortedItems = items.sort(sortByItemIdDescending);

// Pegar as duas primeiras mensagens (as com IDs maiores)
const latestMessages = sortedItems.slice(0, 2);

return (
  <div className='grid lg:grid-cols-5 gap-4 p-4 h-80'>
    <div className='lg:col-span-2 col-span-1 bg-gray-800 flex justify-between w-full border p-4 rounded-lg'>
      <div className='flex flex-col w-full pb-4'>
        <p className='text-2xl font-bold text-white'>Atualizações recentes:</p>
        <p className='text-gray-200 mt-2'>
          - Adicionado Redes Sociais (8/17/2023)<br />
          - Adicionado Mensagens (8/17/2023)<br />
          - Adicionado BottomCards (8/17/2023)<br />
          - Adicionado Feature (8/17/2023)<br />
          - Adicionado Feature (8/17/2023)<br />
          - Adicionado Feature (8/17/2023)<br />
          - Acesso administrador criado (8/17/2023)<br />
          - Você adquiriu um Site com a VH Web Solutions (8/17/2023)<br />
        </p>
      </div>

    </div>
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
      <div className='flex flex-col w-full pb-4 gap-3'>
        <p className='text-2xl font-bold'>Mensagens</p>

        {latestMessages.map((mensagem, index) => (
          <div key={index} className='flex items-center gap-3 bg-gray-100 rounded-md p-2 mb-2'>
            <div className='bg-s7green flex justify-center max-w-[5%] max-h-[30px] items-center p-2 rounded-lg ml-2'>
              <span className='text-white text-lg'>{mensagem.nome[0]}</span>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-gray-800 text-lg'>{mensagem.nome}</p>
              <p className='text-gray-800 text-lg'>{mensagem.contexto}</p>
              <p className='text-gray-600'>{mensagem.mensagem}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
    <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
      <div className='flex flex-col w-full pb-4'>
        <p className='text-2xl font-bold'>Redes sociais</p>
        <div className='text-gray-600'>
          <a href='https://www.instagram.com/'>Instagram</a> <br />
          <a href='https://www.facebook.com/'>Facebook</a> <br />
          <a href='https://www.linkedin.com/'>Linkedin</a> <br />
          <a href='https://www.twitter.com/'>Twitter</a> <br />
          <a href='https://www.whatsapp.com/'>Whatsapp</a> <br />
        </div>
      </div>
    </div>
  </div>
)
}

export default BottomCards
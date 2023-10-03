import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaCog, FaPenSquare, FaTrashAlt } from 'react-icons/fa';

const Swal = require('sweetalert2');

const GP = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://www.sea7api.com.br/buscar');
      const itemsData = response.data;
      setItems(itemsData);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const toggleMenu = (itemId) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [itemId]: !prevOpenMenus[itemId],
    }));
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const handleChangeSearchTerm = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const deletarProduto = async (itemId) => {
    // Show SweetAlert2 confirmation dialog
    await Swal.fire({
      title: 'Você deseja realmente excluir esse produto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545', // Cor do botão Excluir
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUrl = `https://www.sea7api.com.br/deletar/${itemId}`;
        
        // Set the token in the request headers
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        // Make the DELETE request with the specified headers
        axios.delete(deleteUrl, { headers })
          .then((response) => {
            if (response.status === 204) {
              console.log("Produto excluído com sucesso!");
              fetchItems(); // Refetch data after successful deletion.
            } else {
              console.error("Falha ao excluir o produto:", response.statusText);
            }
          })
          .catch((error) => {
            console.error("Erro ao excluir o produto:", error);
          });
      }
    });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container py-7 mx-auto">
        <div className="flex justify-center mb-4">
          <input
            type="text"
            className="border p-2 rounded-l-md focus:outline-none w-full"
            placeholder="Pesquisar produto por nome ou categoria"
            list="product-options"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
          <datalist id="product-options">
            {filteredItems.map((item) => (
              <option key={item.id} value={item.nomeProduto} />
            ))}
          </datalist>
        </div>

        <div className="flex flex-wrap -m-4">
          {filteredItems.map((item) => (
              <div className="lg:w-1/5 md:w-1/2 p-4 w-full" key={item.id}>
                <a className="block relative h-48 rounded overflow-hidden">
                  <button
                    className={`absolute top-3 right-3 z-20 bg-gray-800 text-white p-2 rounded-full ${openMenus[item.id] ? 'rotate-180 duration-500' : 'rotate-0 duration-500'}`}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <FaCog />
                  </button>

                  {openMenus[item.id] && (
                    <div
                      className={`absolute top-7 right-3 z-10 text-white bg-gray-800 p-2 rounded-bl-20 rounded-br-20 shadow-md transition-all duration-500 animate-slide-down`}
                      style={{ height: '85px' }}
                    >
                      <button onClick={() => navigate(`/atualizar/${item.id}`)} className="flex items-center mt-2 py-2"> <FaPenSquare /> </button>
                      <button onClick={() => deletarProduto(item.id)} className="flex items-center py-2"> <FaTrashAlt /> </button>
                    </div>
                  )}

                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={`data:${item.imagemPrincipal[0].type};base64,${item.imagemPrincipal[0].base64Image}`}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {item.categoria}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.nomeProduto}
                  </h2>
                  <p className="mt-1">R$ {item.precoProduto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>

                  <div className="mb-4">
                  </div>                
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GP;

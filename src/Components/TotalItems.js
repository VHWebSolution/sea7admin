import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalItemsProvider = ({ children }) => {
  const [totalItems, setTotalItems] = useState(0);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/buscar');
      const itemsData = response.data;
      setTotalItems(itemsData.length);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return children(totalItems); // Chamando a função passada como children com totalItems como argumento
};

export default TotalItemsProvider;

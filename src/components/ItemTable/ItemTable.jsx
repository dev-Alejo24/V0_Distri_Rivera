import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './itemTable.css'; // Importar el archivo CSS

function ItemTable({ item, editItem, deleteItem }) {
  const { code, name, priceCost, stock, priceSale, unitPack, id } = item;
  const [modalShow, setModalShow] = useState(false);

  //confirmar deleteItem
  const handleDelete = () => {
    if (window.confirm('¿Estas seguro que deseas eliminar este producto?')) {
      deleteItem(id);
    }
  };

  return (
    <>
      {/* Fila de la tabla */}
      <tr className="item-row">
        <td>{id}</td>
        <td>{code}</td>
        <td>{name}</td>
        <td>{priceCost}</td>
        <td>{stock}</td>
        <td>{priceSale}</td>
        <td>{unitPack}</td>
        <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <i
            className="bi bi-pencil-square edit-icon"
            onClick={() => setModalShow(true)}
          ></i>
          <i
            className="bi bi-trash3-fill delete-icon"
            onClick={handleDelete}
          ></i>
        </td>
      </tr>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
        onSubmit={editItem}
      />
    </>
  );
}

export default ItemTable;

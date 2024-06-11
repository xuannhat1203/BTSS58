import { useEffect, useState } from "react";
import AddItemModal from "./AddItemModel";
import axios from "axios";

interface Items {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  create_at: string;
}

export default function ListItems() {
  const [items, setItems] = useState<Items[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8100/Items");
        setItems(response.data);
      } catch (error) {
        console.log("lỗi");
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = (item: Items) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>Thêm sản phẩm mới</button>
      <AddItemModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onAddItem={handleAddItem}
      />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Ngày thêm</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px" }}
                />
              </td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{new Date(item.create_at).toLocaleDateString()}</td>
              <td>
                <button>Sửa</button>
                <button>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

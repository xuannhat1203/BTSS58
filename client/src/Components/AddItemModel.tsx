import { useState } from "react";
import Modal from "react-modal";
import axios from "axios"; // Import Axios

interface Items {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  create_at: string;
}

interface AddItemModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddItem: (item: Items) => void;
}

export default function AddItemModal({
  isOpen,
  onRequestClose,
  onAddItem,
}: AddItemModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = () => {
    const newItem: Items = {
      id: Date.now(),
      name,
      price,
      image,
      quantity,
      create_at: new Date().toISOString(),
    };

    axios
      .post("http://localhost:8100/Items", newItem)
      .then((response) => {
        if (response.status === 200) {
          onAddItem(newItem);
          onRequestClose();
        } else {
          console.log("Error adding item");
        }
      })
      .catch((error) => {
        console.log("Error adding item:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Thêm sản phẩm mới</h2>
      <form>
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Hình ảnh</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Số lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Thêm
        </button>
      </form>
    </Modal>
  );
}

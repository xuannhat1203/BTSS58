import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const [status, setStatus] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [id, setID] = useState<number>();
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
  }, [status]);
  const handleEdit = (id: number) => {
    setModalIsOpen(true);
    setID(id);
  };
  const handleSubmit = async () => {
    const find = items.find((item) => item.id === id);
    const editItem = {
      name: name,
      image: image,
    };
    if (find) {
      await axios.patch(`http://localhost:8100/Items/${find.id}`, editItem);
      setStatus(!status);
      setModalIsOpen(false);
    }
  };

  return (
    <>
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
                <button onClick={() => handleEdit(item.id)}>Sửa</button>
                <button>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalIsOpen && (
        <div>
          <div>
            <h4>Chỉnh sửa thông tin sản phẩm</h4>
          </div>
          <div>
            <label htmlFor="">Nhập tên mới</label>
            <input
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="">Nhập link ảnh mới</label>
            <input
              name="image"
              type="text"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </>
  );
}

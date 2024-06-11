import "./BT02.scss";
import axios from "axios";
import { useState, useEffect } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  create_at: string;
}

export default function BT03() {
  const [infor, setInfor] = useState<Student | null>(null);
  const [id, setID] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setID(value);
    } else {
      setID(null);
    }
  };

  useEffect(() => {
    if (id !== null) {
      axios
        .get(`http://localhost:8100/students/${id}`)
        .then((res) => {
          setInfor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <div>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Nhập id"
        name="id"
      />
      {infor ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Create_at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{infor.id}</td>
              <td>{infor.name}</td>
              <td>{infor.email}</td>
              <td>{infor.address}</td>
              <td>{infor.phone}</td>
              <td>{infor.status}</td>
              <td>{infor.create_at}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

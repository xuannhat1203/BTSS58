import axios from "axios";
import { useEffect, useState } from "react";
import "./BT02.scss";
interface Student {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  create_at: string;
}

export default function BT02() {
  const [infor, setInfor] = useState<Student[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8100/students")
      .then((res) => {
        setInfor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <table style={{ border: "1px solid black" }}>
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
          {infor.map((item: Student) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{item.status}</td>
              <td>{item.create_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

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

export default function BT04() {
  const [students, setStudents] = useState<Student[]>([]);
  const [id, setID] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setID(value);
    } else {
      setID(null);
    }
  };

  const fetchStudents = () => {
    axios
      .get(`http://localhost:8100/students`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (id !== null) {
      axios
        .delete(`http://localhost:8100/students/${id}`)
        .then((res) => {
          alert("Xóa thành công");
          fetchStudents();
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
      {students.length > 0 ? (
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
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>{student.status}</td>
                <td>{student.create_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

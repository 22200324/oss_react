/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
  const [empdata, setEmpdata] = useState(null); // null이면 로딩 상태로 사용
  const navigate = useNavigate();

  const LoadDetail = (id) => navigate("/employee/detail/" + id);
  const LoadEdit = (id) => navigate("/employee/edit/" + id);

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/employee/" + id, { method: "DELETE" })
        .then(() => {
          alert("Removed successfully.");
          // 새로고침 대신 상태만 갱신(간단 개선)
          setEmpdata((prev) => prev.filter((x) => x.id !== id));
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => res.json())
      .then((resp) => setEmpdata(resp))
      .catch((err) => {
        console.log(err.message);
        setEmpdata([]); // 실패 시 빈 배열로 처리
      });
  }, []);

  // 로딩 표시(스피너는 App.css에 정의)
  if (empdata === null) {
    return <div className="spinner" />;
  }

  return (
    <div className="container">
      <div className="card radius">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            {/* 절대경로로 변경(작은 버그 예방) */}
            <Link to="/employee/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>

          {/* 빈 상태 표시 */}
          {empdata.length === 0 ? (
            <div className="empty">No data.</div>
          ) : (
            <table className="table table-striped table-hover radius">
              <thead className="bg-dark text-white thead-soft">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  {/* ⬇ 추가된 컬럼 2개 */}
                  <td>Department</td>
                  <td>Role</td>
                  {/* ⬇ active(상태) 시각화 */}
                  <td>Status</td>
                  <td className="text-end">Action</td>
                </tr>
              </thead>
              <tbody>
                {empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.department}</td>
                    <td>{item.role}</td>
                    <td>
                      <span
                        className={`pill ${item.active ? "pill-on" : "pill-off"}`}
                      >
                        {item.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-end">
                      <a onClick={() => LoadEdit(item.id)} className="btn btn-success">
                        Edit
                      </a>
                      <a
                        onClick={() => Removefunction(item.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                      <a onClick={() => LoadDetail(item.id)} className="btn btn-primary">
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpListing;

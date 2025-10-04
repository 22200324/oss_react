import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();
  const navigate = useNavigate();

  // 기존 필드 + 추가 필드 2개
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");   // NEW
  const [role, setRole] = useState("");               // NEW
  const [active, setActive] = useState(true);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => res.json())
      .then((resp) => {
        setId(resp.id);
        setName(resp.name || "");
        setEmail(resp.email || "");
        setPhone(resp.phone || "");
        setDepartment(resp.department || "");  // NEW
        setRole(resp.role || "");              // NEW
        setActive(!!resp.active);
      })
      .catch((err) => console.log(err.message));
  }, [empid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const empdata = { id, name, email, phone, department, role, active }; // NEW 포함

    fetch("http://localhost:8000/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then(() => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={id} disabled className="form-control" />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        onMouseDown={() => setValidation(true)}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                      />
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* NEW: Department */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Department</label>
                      <input
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* NEW: Role */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Role</label>
                      <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                        id="isActive"
                      />
                      <label className="form-check-label" htmlFor="isActive">
                        Is Active
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;

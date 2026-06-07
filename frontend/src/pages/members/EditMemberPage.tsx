import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getMemberById, updateMember } from "../../services/memberService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormCard from "../../components/common/FormCard";
import { validateMember } from "../../utils/memberValidation";

function EditMemberPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [member, setMember] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadMember();
  }, []);

  const loadMember = async () => {
    try {
      const response = await getMemberById(Number(id));

      console.log(response);

      const data = response.data || response;

      setMember({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validationError = validateMember(member);
      if (validationError) {
        toast.error(validationError);
        return;
      }
      const response = await updateMember(Number(id), member);

      toast.success(response.message);

      navigate("/members");
    } catch (error:any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <FormCard title="Edit Member">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>

            <input
              type="text"
              className="form-control"
              value={member.first_name}
              onChange={(e) =>
                setMember({
                  ...member,
                  first_name: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>

            <input
              type="text"
              className="form-control"
              value={member.last_name}
              onChange={(e) =>
                setMember({
                  ...member,
                  last_name: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              value={member.email}
              onChange={(e) =>
                setMember({
                  ...member,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>

            <input
              type="text"
              className="form-control"
              value={member.phone}
              onChange={(e) =>
                setMember({
                  ...member,
                  phone: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="text-end">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate("/members")}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            Update Member
          </button>
        </div>
      </form>
    </FormCard>
  );
}

export default EditMemberPage;

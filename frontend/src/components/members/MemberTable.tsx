import type { Member } from "../../models/Member";
import { Link } from "react-router-dom";

interface Props {
  members: Member[];
  page: number;
  size: number;
  onDelete: (id: number) => void;
}

function MemberTable({ members, page, size, onDelete }: Props) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Sr No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {members.map((member, index) => (
          <tr key={member.id}>
            <td>{((page - 1) * size) + index + 1}</td>
            <td>{member.first_name}</td>
            <td>{member.last_name}</td>
            <td>{member.email}</td>
            <td>{member.phone}</td>

            <td>
              <Link
                to={`/members/edit/${member.id}`}
                className="btn btn-outline-primary btn-sm me-2"
              >
                Edit
              </Link>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(member.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MemberTable;

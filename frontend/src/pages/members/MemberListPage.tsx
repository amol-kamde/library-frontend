import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Member } from "../../models/Member";

import MemberTable from "../../components/members/MemberTable";
import PageHeader from "../../components/common/PageHeader";

import {
  getMembers,
  searchMembers,
  deleteMember,
} from "../../services/memberService";
import Pagination from "../../components/common/Pagination";
import SearchToolbar from "../../components/common/SearchToolbar";
import { toast } from "react-toastify";

function MemberListPage() {
  const [members, setMembers] = useState<Member[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);

  const [size, setSize] = useState(10);

  const [totalRecords, setTotalRecords] = useState(0);

  const [sortBy, setSortBy] = useState("first_name");

  const [direction, setDirection] = useState("asc");

  useEffect(() => {
    loadMembers();
  }, [page, size, sortBy, direction]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (searchTerm.trim().length === 0) {
          loadMembers();
        } else if (searchTerm.trim().length >= 2) {
          const response = await searchMembers(searchTerm);

          setMembers(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadMembers = async () => {
    try {
      const response = await getMembers(page, size, sortBy, direction);

      setMembers(response.data.data);

      setTotalRecords(response.data.total_records);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this member?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteMember(id);
      toast.success(response.data.message);

      loadMembers();
    } catch (error:any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <PageHeader
        title="Members Management"
        buttonText="+ Add Member"
        buttonLink="/members/add"
      />

      <div className="row align-items-end mb-3">
        <div className="row align-items-end mb-4">
          <SearchToolbar
            searchPlaceholder="Enter member name"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            direction={direction}
            setDirection={setDirection}
            size={size}
            setSize={setSize}
            sortOptions={[
              {
                label: "First Name",
                value: "first_name",
              },
              {
                label: "Last Name",
                value: "last_name",
              },
              {
                label: "Email",
                value: "email",
              },
            ]}
          />

          <div className="card shadow-sm border-0">
            <div className="card-body">
              <MemberTable
                members={members}
                page={page}
                size={size}
                onDelete={handleDelete}
              />
            </div>
          </div>
          <Pagination
            page={page}
            size={size}
            totalRecords={totalRecords}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberListPage;

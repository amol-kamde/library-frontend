import api from "../api/axios";

export const getMembers = async (
  page: number,
  size: number,
  sortBy: string,
  direction: string,
) => {
  const response = await api.get(
    `/members?page=${page}&size=${size}&sort_by=${sortBy}&direction=${direction}`,
  );

  return response.data;
};

export const searchMembers = async (keyword: string) => {
  const response = await api.get(`/members?search=${keyword}`);

  return response.data;
};

export const getMemberById = async (id: number) => {
  const response = await api.get(`/members/${id}`);

  return response.data;
};

export const createMember = async (member: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}) => {
  const response = await api.post("/members", member);

  return response.data;
};

export const updateMember = async (
  id: number,
  member: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  },
) => {
  const response = await api.put(`/members/${id}`, member);

  return response.data;
};

export const deleteMember = async (id: number) => {
  const response = await api.delete(`/members/${id}`);

  return response.data;
};

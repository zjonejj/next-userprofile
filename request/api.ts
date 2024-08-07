import { User } from "../typings/api";
import { apiFetch } from "../utils/fetch";

// 获取用户详情
export const getUser = async (userId: string): Promise<User> => {
  return await apiFetch<User>(`/api/users/${userId}/profile`, {
    method: "GET",
  });
};

// 更新用户资料
export const updateUserProfile = async (
  userId: string,
  user: User
): Promise<User> => {
  const { id, ...body } = user;

  return await apiFetch<User>(`/api/users/${userId}/profile`, {
    method: "PUT",
    body: body,
  });
};

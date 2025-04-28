import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/role-permission`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRoles: builder.query<Role[], null>({
      query: () => "listRoles",
    }),

    getRoleByName: builder.query<Role, string>({
      query: (RoleName) => `findRoleByName/${RoleName}`,
    }),

    createRole: builder.mutation({
      query: (newRole) => ({
        url: "createRole/",
        method: "POST",
        body: newRole,
      }),
    }),

    updateRole: builder.mutation<
      any,
      { id: number; updateRole: Partial<Role> }
    >({
      query: ({ id, updateRole }) => ({
        url: `updateRole/${id}/`,
        method: "PATCH",
        body: updateRole,
      }),
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `deleteRole/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByNameQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;

import { IRoleBHub } from "@/redux/utils/interfaces/configuration/rolesBonnadonaHub.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const verifyActiveUserApi = createApi({
  reducerPath: "verifyActiveUser",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BONNA_HUB_BACKEND_URL}/users`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    getUserActiveByIdNumber: builder.query<Partial<IUserActiveBHub>, number>({
      query: (id_number) => ({
        url: `getUserActiveByIdNumber/${id_number}`,
        method: "GET",
        params: { id_number },
      }),
    }),

    allActiveUsers: builder.query<Partial<IUserActiveBHub>[], null>({
      query: () => ({
        url: `getAllUsers`,
        method: "GET",
      }),
    }),

    getUserRoles: builder.query<IRoleBHub, number>({
      query: (idNumber) => `getUserRoles/${idNumber}`,
    }),

    getUserPermissions: builder.query<IPermissions[], number>({
      query: (idNumber) => `getUserPermissions/${idNumber}`,
    }),
  }),
});

export const {
  useGetUserActiveByIdNumberQuery,
  useAllActiveUsersQuery,
  useGetUserPermissionsQuery,
  useGetUserRolesQuery,
} = verifyActiveUserApi;

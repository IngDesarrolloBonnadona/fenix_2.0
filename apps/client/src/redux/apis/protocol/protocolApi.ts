import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const protocolApi = createApi({
  reducerPath: "protocolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/protocol`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllProtocols: builder.query<Protocol[], null>({
      query: () => "listProtocols",
    }),

    createProtocol: builder.mutation<any, Partial<Protocol>>({
      query: (newProtocol) => ({
        url: "createProtocol/",
        method: "POST",
        body: newProtocol,
      }),
    }),

    updateProtocol: builder.mutation<
      any,
      { id: number; updateProtocol: Partial<Protocol> }
    >({
      query: ({ id, updateProtocol }) => ({
        url: `updateProtocol/${id}/`,
        method: "PATCH",
        body: updateProtocol,
      }),
    }),

    deleteProtocol: builder.mutation({
      query: (id) => ({
        url: `deleteProtocol/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllProtocolsQuery,
  useCreateProtocolMutation,
  useUpdateProtocolMutation,
  useDeleteProtocolMutation,
} = protocolApi;

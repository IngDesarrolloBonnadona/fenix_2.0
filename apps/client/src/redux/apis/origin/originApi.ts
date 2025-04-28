import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const originApi = createApi({
  reducerPath: "originApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/origin`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllOrigins: builder.query<Origin[], null>({
      query: () => "listOrigins",
    }),

    createOrigin: builder.mutation({
      query: (newOrigin) => ({
        url: "createOrigin/",
        method: "POST",
        body: newOrigin,
      }),
    }),

    updateOrigin: builder.mutation<
      any,
      { id: number; updateOrigin: Partial<Origin> }
    >({
      query: ({ id, updateOrigin }) => ({
        url: `updateOrigin/${id}/`,
        method: "PATCH",
        body: updateOrigin,
      }),
    }),

    deleteOrigin: builder.mutation({
      query: (id) => ({
        url: `deleteOrigin/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllOriginsQuery,
  useCreateOriginMutation,
  useUpdateOriginMutation,
  useDeleteOriginMutation,
} = originApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const unsafeActionApi = createApi({
  reducerPath: "unsafeActionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/unsafe-action`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllUnsafeActions: builder.query<UnsafeAction[], null>({
      query: () => "listUnsafeActions",
    }),

    createUnsafeAction: builder.mutation<any, Partial<UnsafeAction>>({
      query: (newUnsafeAction) => ({
        url: "createUnsafeAction/",
        method: "POST",
        body: newUnsafeAction,
      }),
    }),

    updateUnsafeAction: builder.mutation<
      any,
      { id: number; updateUnsafeAction: Partial<UnsafeAction> }
    >({
      query: ({ id, updateUnsafeAction }) => ({
        url: `updateUnsafeAction/${id}/`,
        method: "PATCH",
        body: updateUnsafeAction,
      }),
    }),

    deleteUnsafeAction: builder.mutation({
      query: (id) => ({
        url: `deleteUnsafeAction/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllUnsafeActionsQuery,
  useCreateUnsafeActionMutation,
  useUpdateUnsafeActionMutation,
  useDeleteUnsafeActionMutation,
} = unsafeActionApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const priorityApi = createApi({
  reducerPath: "priorityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/priority`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllPriorities: builder.query<Priority[], null>({
      query: () => "listPriorities",
    }),

    getPriorityById: builder.query<Priority, number>({
      query: (Id) => `findPriority/${Id}`,
    }),

    createPriority: builder.mutation<any, Partial<Priority>>({
      query: (newPriority) => ({
        url: "createPriority/",
        method: "POST",
        body: newPriority,
      }),
    }),

    updatePriority: builder.mutation<
      any,
      { id: number; updatePriority: Partial<Priority> }
    >({
      query: ({ id, updatePriority }) => ({
        url: `updatePriority/${id}/`,
        method: "PATCH",
        body: updatePriority,
      }),
    }),

    deletePriority: builder.mutation({
      query: (id) => ({
        url: `deletePriority/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllPrioritiesQuery,
  useGetPriorityByIdQuery,
  useCreatePriorityMutation,
  useUpdatePriorityMutation,
  useDeletePriorityMutation,
} = priorityApi;

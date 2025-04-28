import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const reasonCancellationCaseApi = createApi({
  reducerPath: "reasonCancellationCaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/reason-cancellation-case`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllReasonCancellationCases: builder.query<ReasonCancellationCase[], null>({
      query: () => "listReasonCancellationCases",
    }),

    getReasonCancellationCaseById: builder.query<ReasonCancellationCase, number>({
      query: (Id) => `findReasonCancellationCase/${Id}`,
    }),

    createReasonCancellationCase: builder.mutation<any, Partial<ReasonCancellationCase>>({
      query: (newReasonCancellationCase) => ({
        url: "createReasonCancellationCase/",
        method: "POST",
        body: newReasonCancellationCase,
      }),
    }),

    updateReasonCancellationCase: builder.mutation<
      any,
      { id: number; updateReasonCancellationCase: Partial<ReasonCancellationCase> }
    >({
      query: ({ id, updateReasonCancellationCase }) => ({
        url: `updateReasonCancellationCase/${id}/`,
        method: "PATCH",
        body: updateReasonCancellationCase,
      }),
    }),

    deleteReasonCancellationCase: builder.mutation({
      query: (id) => ({
        url: `deleteReasonCancellationCase/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllReasonCancellationCasesQuery,
  useGetReasonCancellationCaseByIdQuery,
  useCreateReasonCancellationCaseMutation,
  useUpdateReasonCancellationCaseMutation,
  useDeleteReasonCancellationCaseMutation,
} = reasonCancellationCaseApi;

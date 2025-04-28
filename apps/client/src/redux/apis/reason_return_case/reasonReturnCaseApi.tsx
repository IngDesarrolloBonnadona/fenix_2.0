import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const reasonReturnCaseApi = createApi({
  reducerPath: "reasonReturnCaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/reason-return-case`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllReasonReturnCases: builder.query<ReasonReturnCase[], null>({
      query: () => "listReasonReturnCases",
    }),

    getReasonReturnCaseById: builder.query<ReasonReturnCase, number>({
      query: (Id) => `findReasonReturnCase/${Id}`,
    }),

    getReasonReturnCaseByRoleId: builder.query<ReasonReturnCase[], number>({
      query: (roleId) => `findReasonReturnCasebyRoleId/${roleId}`,
    }),

    createReasonReturnCase: builder.mutation<any, Partial<ReasonReturnCase>>({
      query: (newReasonReturnCase) => ({
        url: "createReasonReturnCase/",
        method: "POST",
        body: newReasonReturnCase,
      }),
    }),

    updateReasonReturnCase: builder.mutation<
      any,
      { id: number; updateReasonReturnCase: Partial<ReasonReturnCase> }
    >({
      query: ({ id, updateReasonReturnCase }) => ({
        url: `updateReasonReturnCase/${id}/`,
        method: "PATCH",
        body: updateReasonReturnCase,
      }),
    }),

    deleteReasonReturnCase: builder.mutation({
      query: (id) => ({
        url: `deleteReasonReturnCase/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllReasonReturnCasesQuery,
  useGetReasonReturnCaseByIdQuery,
  useGetReasonReturnCaseByRoleIdQuery,
  useCreateReasonReturnCaseMutation,
  useUpdateReasonReturnCaseMutation,
  useDeleteReasonReturnCaseMutation,
} = reasonReturnCaseApi;

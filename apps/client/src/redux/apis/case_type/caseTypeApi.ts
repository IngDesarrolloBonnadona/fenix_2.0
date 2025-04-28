import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const caseTypeApi = createApi({
  reducerPath: "caseTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/case-type`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

//   refetchOnMountOrArgChange: true,

//   refetchOnFocus: true,

//   refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllCaseTypes: builder.query<CaseType[], null>({
      query: () => "listCaseTypes",
    }),

    getCaseTypeById: builder.query<CaseType, number>({
      query: (Id) => `findCaseType/${Id}`,
    }),

    createCaseType: builder.mutation<any, Partial<CaseType>>({
      query: (newCaseType) => ({
        url: "createCaseType/",
        method: "POST",
        body: newCaseType,
      }),
    }),

    updateCaseType: builder.mutation<any, { id: number; updateCaseType: Partial<CaseType> }>({
      query: ({ id, updateCaseType }) => ({
        url: `updateCaseType/${id}/`,
        method: "PATCH",
        body: updateCaseType,
      }),
    }),

    deleteCaseType: builder.mutation({
      query: (id) => ({
        url: `deleteCaseType/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllCaseTypesQuery,
  useGetCaseTypeByIdQuery,
  useCreateCaseTypeMutation,
  useUpdateCaseTypeMutation,
  useDeleteCaseTypeMutation,
} = caseTypeApi;

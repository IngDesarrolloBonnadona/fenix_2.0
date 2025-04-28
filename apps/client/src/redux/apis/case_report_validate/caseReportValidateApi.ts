import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const caseReportValidateApi = createApi({
  reducerPath: "caseReportValidateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/case-report-validate`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getReportValidateById: builder.query<CaseReportValidate, string>({
      query: (Id) => `findReportValidate/${Id}`,
    }),

    getReportValidateByConsecutive: builder.query<CaseReportValidate, string>({
      query: (consecutive) => `findReportValidateByConsecutive/${consecutive}`,
    }),

    getAllSummaryReports: builder.query<CaseReportValidate[], null>({
      query: () => "summaryReports",
    }),

    getAllSummaryReportsLastMonths: builder.query<CaseReportValidate[], number>(
      {
        query: (months) => `summaryReportsLastMonts/${months}`,
      }
    ),

    getAllValidateOthersCases: builder.query<CaseReportValidate[], null>({
      query: () => "otherCases",
    }),

    getAllValidateCases: builder.query<CaseReportValidate[], null>({
      query: () => "validateCases",
    }),

    findSimilarsCaseReportValidate: builder.mutation<
      any,
      { findReportsSimilar: Partial<CaseReportValidate>; months: number }
    >({
      query: ({ findReportsSimilar, months }) => ({
        url: `findReportsSimilar/${months}`,
        method: "POST",
        body: findReportsSimilar,
      }),
    }),

    createCaseReportValidate: builder.mutation<
      any,
      {
        idValidator: string;
        reportId: string;
        newReportValidate: Partial<CaseReportValidate>;
      }
    >({
      query: ({ idValidator, reportId, newReportValidate }) => ({
        url: `createReportValidate/${idValidator}/${reportId}/`,
        method: "POST",
        body: newReportValidate,
      }),
    }),

    cancelCaseReportValidate: builder.mutation<
      any,
      { id: string; idUser: string }
    >({
      query: ({ id, idUser }) => ({
        url: `cancelReportValidate/${id}/${idUser}/`,
        method: "DELETE",
        params: { id, idUser },
      }),
    }),
  }),
});

export const {
  useGetReportValidateByIdQuery,
  useGetReportValidateByConsecutiveQuery,
  useGetAllSummaryReportsQuery,
  useGetAllSummaryReportsLastMonthsQuery,
  useGetAllValidateOthersCasesQuery,
  useGetAllValidateCasesQuery,
  useFindSimilarsCaseReportValidateMutation,
  useCreateCaseReportValidateMutation,
  useCancelCaseReportValidateMutation,
} = caseReportValidateApi;

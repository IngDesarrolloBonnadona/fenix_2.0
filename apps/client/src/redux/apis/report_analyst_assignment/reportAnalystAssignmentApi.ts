import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const reportAnalystAssignmentApi = createApi({
  reducerPath: "reportAnalystAssignment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/report-analyst-assignment`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getReportsForAssignCases: builder.query<any, string>({
      query: (idAnalyst) => `summaryReportsForAssignCases/${idAnalyst}/`,
    }),

    getAssignedAnalystByCaseId: builder.query<ReportAnalystAssignment, string>({
      query: (CaseId) => `findAssignedAnalystByCaseId/${CaseId}/`,
    }),

    assignAnalyst: builder.mutation<
      any,
      {
        idValidator: string;
        idNumberAnalyst: string;
        emailAnalyst: string;
        fullNameAnalyst: string;
        newAnalystAssigned: Partial<ReportAnalystAssignment>;
      }
    >({
      query: ({
        idValidator,
        idNumberAnalyst,
        newAnalystAssigned,
        emailAnalyst,
        fullNameAnalyst,
      }) => ({
        url: `assignAnalyst/${idValidator}/${idNumberAnalyst}/${emailAnalyst}/${fullNameAnalyst}`,
        method: "POST",
        body: newAnalystAssigned,
      }),
    }),

    reassignAnalyst: builder.mutation<
      any,
      {
        idValidator: string;
        updateAnalystReassign: Partial<ReportAnalystAssignment>;
      }
    >({
      query: ({ idValidator, updateAnalystReassign }) => ({
        url: `reAssignAnalyst/${idValidator}/`,
        method: "PATCH",
        body: updateAnalystReassign,
      }),
    }),

    returnBetweenAnalyst: builder.mutation<
      any,
      {
        currentIdNumberAnalist: string;
        newAnalystReturn: Partial<ReportAnalystAssignment>;
      }
    >({
      query: ({ currentIdNumberAnalist, newAnalystReturn }) => ({
        url: `returnCaseBetweenAnalyst/${currentIdNumberAnalist}/`,
        method: "POST",
        body: newAnalystReturn,
      }),
    }),

    returnCaseToValidator: builder.mutation<
      any,
      {
        idAnalyst: string;
        idCaseValidate: string;
        userName: string;
        userEmail: string | null | undefined;
      }
    >({
      query: ({ idAnalyst, idCaseValidate, userEmail, userName }) => ({
        url: `returnCaseToValidator/${idAnalyst}/${idCaseValidate}/${userEmail}/${userName}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetReportsForAssignCasesQuery,
  useGetAssignedAnalystByCaseIdQuery,
  useAssignAnalystMutation,
  useReassignAnalystMutation,
  useReturnBetweenAnalystMutation,
  useReturnCaseToValidatorMutation,
} = reportAnalystAssignmentApi;

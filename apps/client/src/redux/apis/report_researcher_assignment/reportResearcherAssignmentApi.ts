import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const reportResearcherAssignmentApi = createApi({
  reducerPath: "reportResearcherAssignment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/report-researchers-assignment`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getReportsAssignedByIdNumberResearcher: builder.query<any, string>({
      query: (idNumberResearcher) =>
        `summaryReportsAsignedByIdNumberResearcher/${idNumberResearcher}/`,
    }),

    getAssignedResearchersByIdNumberAnalyst: builder.query<
      ReportResearcherAssignment[],
      string
    >({
      query: (IdNumberAnalyst) =>
        `findAssignedResearcherByIdNumberAnalyst/${IdNumberAnalyst}/`,
    }),

    getAssignedResearchByCaseId: builder.query<
      ReportResearcherAssignment,
      string
    >({
      query: (CaseId) => `findAssignedResearchByCaseId/${CaseId}/`,
    }),

    assignResearcher: builder.mutation<
      any,
      {
        idNumberAnalist: string;
        idNumberResearcher: string;
        emailResearcher: string;
        fullNameResearcher: string;
        newResearcherAssigned: Partial<ReportResearcherAssignment>;
      }
    >({
      query: ({
        idNumberResearcher,
        idNumberAnalist,
        emailResearcher,
        fullNameResearcher,
        newResearcherAssigned,
      }) => ({
        url: `assingResearcher/${idNumberAnalist}/${idNumberResearcher}/${emailResearcher}/${fullNameResearcher}`,
        method: "POST",
        body: newResearcherAssigned,
      }),
    }),

    reassignResearcher: builder.mutation<
      any,
      {
        idAnalyst: string;
        updateResearcherReassign: Partial<ReportResearcherAssignment>;
      }
    >({
      query: ({ idAnalyst, updateResearcherReassign }) => ({
        url: `reAssignResearch/${idAnalyst}/`,
        method: "PATCH",
        body: updateResearcherReassign,
      }),
    }),

    returnCaseToAnalyst: builder.mutation<
      any,
      {
        idResearcher: string;
        idCaseValidate: string;
        userName: string;
        userEmail: string | null | undefined;
      }
    >({
      query: ({ idResearcher, idCaseValidate, userEmail, userName }) => ({
        url: `returnCaseToAnalyst/${idResearcher}/${idCaseValidate}/${userEmail}/${userName}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetReportsAssignedByIdNumberResearcherQuery,
  useGetAssignedResearchersByIdNumberAnalystQuery,
  useGetAssignedResearchByCaseIdQuery,
  useAssignResearcherMutation,
  useReassignResearcherMutation,
  useReturnCaseToAnalystMutation,
} = reportResearcherAssignmentApi;

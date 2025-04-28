import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const controlEvaluationApi = createApi({
  reducerPath: "controlEvaluationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/control-evaluation`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    createControlEvaluation: builder.mutation<any, Partial<ControlEvaluation>>({
      query: (newControlEvaluation) => ({
        url: "createControlEvaluation/",
        method: "POST",
        body: newControlEvaluation,
      }),
    }),

    getAllControlsEvaluation: builder.query<ControlEvaluation[], null>({
      query: () => "listControlsEvaluation",
    }),

    getAllControlEvaluationByEventAndYear: builder.query<
      ControlEvaluation[],
      { eventId: number; year: number }
    >({
      query: ({ eventId, year }) =>
        `findControlsEvaluationByEventAndYear/${eventId}/${year}`,
    }),

    getAllControlEvaluationByInitialDateAndEndDate: builder.query<
      ControlEvaluation[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => ({
        url: `findControlsEvaluationByDate?startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateControlEvaluationMutation,
  useGetAllControlsEvaluationQuery,
  useGetAllControlEvaluationByEventAndYearQuery,
  useGetAllControlEvaluationByInitialDateAndEndDateQuery,
} = controlEvaluationApi;

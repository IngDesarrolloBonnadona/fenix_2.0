import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const scoreComplianceControlApi = createApi({
  reducerPath: "scoreComplianceControlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/score-compliance-control`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllScoreComplianceControl: builder.query<ScoreComplianceControl[], null>(
      {
        query: () => "listScoreComplianceControl",
      }
    ),
    getScoreComplianceControlById: builder.query<
      ScoreComplianceControl,
      string
    >({
      query: (id) => `findScoreComplianceControl/${id}`,
    }),

    createScoreComplianceControl: builder.mutation<
      any,
      Partial<ScoreComplianceControl>
    >({
      query: (newScoreComplianceControl) => ({
        url: "createScoreComplianceControl/",
        method: "POST",
        body: newScoreComplianceControl,
      }),
    }),

    updateScoreComplianceControl: builder.mutation<
      any,
      {
        id: number;
        updateScoreComplianceControl: Partial<ScoreComplianceControl>;
      }
    >({
      query: ({ id, updateScoreComplianceControl }) => ({
        url: `updateScoreComplianceControl/${id}/`,
        method: "PATCH",
        body: updateScoreComplianceControl,
      }),
    }),

    deleteScoreComplianceControl: builder.mutation({
      query: (id) => ({
        url: `deleteScoreComplianceControl/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllScoreComplianceControlQuery,
  useCreateScoreComplianceControlMutation,
  useGetScoreComplianceControlByIdQuery,
  useUpdateScoreComplianceControlMutation,
  useDeleteScoreComplianceControlMutation,
} = scoreComplianceControlApi;

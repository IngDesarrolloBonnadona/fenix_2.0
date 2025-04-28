import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const probabilityOcurrenceApi = createApi({
  reducerPath: "probabilityOcurrenceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/probability-ocurrence`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllProbabilityOcurrences: builder.query<ProbabilityOcurrence[], null>({
      query: () => "listProbabilityOcurrences",
    }),

    createProbabilityOcurrence: builder.mutation<
      any,
      Partial<ProbabilityOcurrence>
    >({
      query: (newProbabilityOcurrence) => ({
        url: "createProbabilityOcurrence/",
        method: "POST",
        body: newProbabilityOcurrence,
      }),
    }),

    updateProbabilityOcurrence: builder.mutation<
      any,
      { id: number; updateProbabilityOcurrence: Partial<ProbabilityOcurrence> }
    >({
      query: ({ id, updateProbabilityOcurrence }) => ({
        url: `updateProbabilityOcurrence/${id}/`,
        method: "PATCH",
        body: updateProbabilityOcurrence,
      }),
    }),

    deleteProbabilityOcurrence: builder.mutation({
      query: (id) => ({
        url: `deleteProbabilityOcurrence/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateProbabilityOcurrenceMutation,
  useGetAllProbabilityOcurrencesQuery,
  useUpdateProbabilityOcurrenceMutation,
  useDeleteProbabilityOcurrenceMutation,
} = probabilityOcurrenceApi;

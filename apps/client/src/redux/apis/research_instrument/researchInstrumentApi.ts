import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const researchInstrumentApi = createApi({
  reducerPath: "researchInstrumentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/research-instrument`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllResearchInstruments: builder.query<ResearchInstrument[], null>({
      query: () => "listResearchInstruments",
    }),

    createResearchInstrument: builder.mutation({
      query: (newResearchInstrument) => ({
        url: "createResearchInstrument/",
        method: "POST",
        body: newResearchInstrument,
      }),
    }),

    updateResearchInstrument: builder.mutation<
      any,
      { id: number; updateResearchInstrument: Partial<ResearchInstrument> }
    >({
      query: ({ id, updateResearchInstrument }) => ({
        url: `updateResearchInstrument/${id}/`,
        method: "PATCH",
        body: updateResearchInstrument,
      }),
    }),

    deleteResearchInstrument: builder.mutation({
      query: (id) => ({
        url: `deleteResearchInstrument/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllResearchInstrumentsQuery,
  useCreateResearchInstrumentMutation,
  useUpdateResearchInstrumentMutation,
  useDeleteResearchInstrumentMutation,
} = researchInstrumentApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const synergyApi = createApi({
  reducerPath: "synergyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/synergy`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllSynergies: builder.query<Synergy[], null>({
      query: () => "listSynergies",
    }),

    getSynergyById: builder.query<Synergy, number>({
      query: (Id) => `findSynergy/${Id}`,
    }),

    createSynergy: builder.mutation<
      any,
      {
        idValidator: string;
        emailAnalyst: string;
        fullNameAnalyst: string;
        newSynergy: Partial<Synergy>;
      }
    >({
      query: ({ idValidator, newSynergy, emailAnalyst, fullNameAnalyst }) => ({
        url: `createSynergy/${idValidator}/${emailAnalyst}/${fullNameAnalyst}/`,
        method: "POST",
        body: newSynergy,
      }),
    }),

    resolutionSynergy: builder.mutation<
      any,
      { id: number; idValidator: string; resolutionSynergy: Partial<Synergy> }
    >({
      query: ({ id, idValidator, resolutionSynergy }) => ({
        url: `resolutionSynergy/${id}/${idValidator}/`,
        method: "PATCH",
        body: resolutionSynergy,
      }),
    }),

    deleteSynergy: builder.mutation({
      query: (id) => ({
        url: `deleteSynergy/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllSynergiesQuery,
  useGetSynergyByIdQuery,
  useCreateSynergyMutation,
  useResolutionSynergyMutation,
  useDeleteSynergyMutation,
} = synergyApi;

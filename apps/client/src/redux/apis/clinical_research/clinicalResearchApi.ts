import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const clinicalResearchApi = createApi({
  reducerPath: "clinicalResearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/clinical-research`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  //   refetchOnMountOrArgChange: true,

  //   refetchOnFocus: true,

  //   refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllClinicalResearchs: builder.query<ClinicalResearch[], null>({
      query: () => "listClinicalResearchs",
    }),

    saveClinicalResearch: builder.mutation<
      any,
      { id?: string; saveOrUpdateClinicalResearch: Partial<ClinicalResearch> }
    >({
      query: ({ id, saveOrUpdateClinicalResearch }) => ({
        url: `saveClinicalResearch/${id}`,
        method: "POST",
        body: saveOrUpdateClinicalResearch,
      }),
    }),
  }),
});

export const {
  useGetAllClinicalResearchsQuery,
  useSaveClinicalResearchMutation,
} = clinicalResearchApi;

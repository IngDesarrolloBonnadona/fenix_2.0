import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const observationReturnCaseApi = createApi({
  reducerPath: "observationReturnCaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/observation-return-case`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllObservationReturnCases: builder.query<ObservationReturnCase[], null>({
      query: () => "listObservationReturnCase",
    }),

    getObservationReturnCaseById: builder.query<ObservationReturnCase, number>({
      query: (Id) => `findObservationReturnCase/${Id}`,
    }),

    getObservationReturnByCaseValidateId: builder.query<
      ObservationReturnCase,
      string
    >({
      query: (CaseValidateId) =>
        `findOneObservationReturnByCaseValidateId/${CaseValidateId}`,
    }),

    createObservationReturnCase: builder.mutation<
      any,
      {
        idUser: string;
        idCaseValidate: string;
        newReasonReturnCase: Partial<ObservationReturnCase>;
      }
    >({
      query: ({ idUser, idCaseValidate, newReasonReturnCase }) => ({
        url: `createObservationReturnCase/${idUser}/${idCaseValidate}`,
        method: "POST",
        body: newReasonReturnCase,
      }),
    }),

    deleteObservationReturnCase: builder.mutation({
      query: (id) => ({
        url: `deleteObservationReturnCase/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateObservationReturnCaseMutation,
  useGetAllObservationReturnCasesQuery,
  useGetObservationReturnCaseByIdQuery,
  useGetObservationReturnByCaseValidateIdQuery,
  useDeleteObservationReturnCaseMutation,
} = observationReturnCaseApi;

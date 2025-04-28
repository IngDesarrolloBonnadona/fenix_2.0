import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/service`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], null>({
      query: () => "listServices",
    }),

    getServiceById: builder.query<Service, number>({
      query: (Id) => `findService/${Id}`,
    }),

    createService: builder.mutation<any, Partial<Service>>({
      query: (newService) => ({
        url: "createService/",
        method: "POST",
        body: newService,
      }),
    }),

    updateService: builder.mutation<
      any,
      { id: number; updateService: Partial<Service> }
    >({
      query: ({ id, updateService }) => ({
        url: `updateService/${id}/`,
        method: "PATCH",
        body: updateService,
      }),
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `deleteService/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;

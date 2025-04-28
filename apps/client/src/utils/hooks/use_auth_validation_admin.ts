import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hook";
import { redirect } from "next/navigation";

import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";

const useAuthValidationAdmin = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  useEffect(() => {
    if (idNumberUserSession) {
      dispatch(setIdNumberUserSession(idNumberUserSession));
    }

    if (status === "unauthenticated") {
      redirect(`${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/login_admin`);
    }
  }, [status, idNumberUserSession, session]);
};

export default useAuthValidationAdmin;

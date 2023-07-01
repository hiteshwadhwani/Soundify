import { useEffect } from "react";
import Modal from "./Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import useAuthModal from "@/app/hooks/useAuth";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const router = useRouter();
  const {onClose, onOpen, isOpen} = useAuthModal()

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose()
    }
  }, [session, router, onClose]);

  const onChange = (open : boolean) => {
    if(open === false){
        onClose()
    }
  }

  return (
    <Modal
      title="Auth"
      description="fake description"
      onChange={onChange}
      isOpen={isOpen}
    >
      <Auth
        supabaseClient={supabaseClient}
        theme="dark"
        magicLink
        providers={['github']}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};
export default AuthModal;

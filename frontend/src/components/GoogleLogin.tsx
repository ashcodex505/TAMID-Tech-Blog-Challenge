import { useCallback, useEffect } from "react";
import { supabase } from "../context/auth/supabaseClient";
import { useAuth } from "../context/auth/authProvider";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { session } = useAuth();

  const navigate = useNavigate();


  // Redirect to saved path or default to home
  const getRedirectPath = useCallback(() => {
    const savedPath = localStorage.getItem("redirectAfterLogin");
    // If there's a saved path, use it and clear storage
    if (savedPath) {
      localStorage.removeItem("redirectAfterLogin");
      return savedPath;
    }
    // Otherwise default to home

    return "/";
  }, []);


  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        // Remove redirectTo to let Supabase handle the default OAuth flow
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  // If already logged in, redirect appropriately
  useEffect(() => {
    if (session) {
      const redirectPath = getRedirectPath();
      navigate(redirectPath);
    }
  }, [session, getRedirectPath, navigate]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-sans mb-4">Members</h1>
      <button
        onClick={handleGoogleLogin}
        className="w-full px-4 py-3 rounded-lg text-xl flex items-center justify-center gap-4 bg-white text-black hover:bg-gray-100 transition-colors border border-gray-300 shadow-sm"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          className="w-6 h-6 md:w-8 md:h-8"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;

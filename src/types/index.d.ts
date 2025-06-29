type AuthMode = "login" | "register";

type Session = {
  id: number;
  sender: "user" | "ai";
  content: string;
  pdf: {
    title: string;
  };
};

type GetUserSessionsResult =
  | { data: Session[]; error: null }
  | { data: null; error: string };

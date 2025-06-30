type AuthMode = "login" | "register";

type Session = {
  id: number;
  sender: "user" | "ai";
  content: string;
  pdf: {
    title: string;
  };
};

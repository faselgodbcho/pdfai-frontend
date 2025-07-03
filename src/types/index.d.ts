type AuthMode = "login" | "register";

type Message = {
  id: string;
  sender: "user" | "ai";
  content: string;
};

type Session = {
  id: string;
  pdf: {
    title: string;
  };
};

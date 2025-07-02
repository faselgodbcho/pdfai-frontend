type AuthMode = "login" | "register";

type Message = {};

type Session = {
  id: string;
  messages?: Message[];
  pdf: {
    title: string;
  };
};

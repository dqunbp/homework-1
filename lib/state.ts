import { createMachine, assign, interpret } from "xstate";

interface State {
  user: string;
  keywords: string[];
  company: string;
  domain: string;
}

const stateMachine = createMachine<State>({
  id: "form",
  initial: "formFilling",
  context: {
    user: "",
    keywords: [],
    company: "",
    domain: "",
  },
  states: {
    formFilling: {},
  },
});

export const stateService = interpret(stateMachine);
stateService.start();

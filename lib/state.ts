import { createMachine, assign, interpret, MachineConfig } from "xstate";

interface Context {
  username: string;
  keywords: string[];
  company: string;
  domain: string;
}

interface Schema {
  states: {
    editing: {};
    submitting: {};
    success: {};
  };
}

type Event = { type: "CHANGE_USERNAME" } | { type: "CHANGE_KEYWORDS" };

const config: MachineConfig<Context, Schema, Event> = {
  id: "form",
  initial: "editing",
  context: {
    username: "",
    keywords: [],
    company: "",
    domain: "",
  },
  states: {
    editing: {},
    submitting: {},
    success: {},
  },
};

const stateMachine = createMachine(config);

export const stateService = interpret(stateMachine);
stateService.start();

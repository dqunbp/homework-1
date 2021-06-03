import { createMachine, assign, interpret } from "xstate";

interface State {
  count: number;
}

const stateMachine = createMachine<State>({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
});

export const stateService = interpret(stateMachine);
stateService.start();

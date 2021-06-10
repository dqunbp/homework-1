import { OptionsType } from "react-select";
import { createMachine, assign, interpret, EventObject } from "xstate";

type KeywordOption = { label: string; value: string };
export type KeywordOptions = OptionsType<KeywordOption>;

interface Context {
  username: string;
  keywords: KeywordOptions;
  company: string;
  domain: string;
}

type State =
  | { value: "editing"; context: Context }
  | { value: "submitting"; context: Context }
  | { value: "error"; context: Context }
  | { value: "success"; context: Context };

export enum EventType {
  CHANGE_USERNAME = "CHANGE_USERNAME",
  CHANGE_KEYWORDS = "CHANGE_KEYWORDS",
  SUBMIT = "SUBMIT",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

type Event =
  | { type: EventType.CHANGE_USERNAME; value: string }
  | { type: EventType.CHANGE_KEYWORDS; value: KeywordOptions }
  | { type: EventType.SUBMIT }
  | { type: EventType.SUCCESS }
  | { type: EventType.ERROR; errors: string[] };

const config = {
  id: "form",
  initial: "editing",
  context: {
    username: "",
    keywords: [],
    company: "",
    domain: "",
  },
  states: {
    editing: {
      on: {
        CHANGE_USERNAME: {
          target: "editing",
          actions: ["changeUsername"],
        },
        CHANGE_KEYWORDS: {
          target: "editing",
          actions: ["changeKeywords"],
        },
        SUBMIT: "submitting",
      },
    },
    submitting: {
      on: {
        SUCCESS: "success",
        ERROR: "error",
      },
    },
    success: { type: "final" as const },
    error: {
      on: {
        CHANGE_USERNAME: "editing",
        CHANGE_KEYWORDS: "editing",
      },
    },
  },
};

function assertEventType<E extends EventObject, T extends EventType>(
  event: E,
  eventType: T
): asserts event is E & { type: T } {
  if (event.type !== eventType)
    throw new Error(
      `Invalid event: expected "${eventType}", got "${event.type}"`
    );
}

const changeUsername = assign<Context, Event>({
  username: (_ctx, event) => {
    if (event.type !== EventType.CHANGE_USERNAME)
      throw new Error(
        `Invalid event: expected "${EventType.CHANGE_USERNAME}", got "${event.type}"`
      );
    return event.value;
  },
});
const changeKeywords = assign<Context, Event>({
  keywords: (_ctx, event) => {
    if (event.type !== EventType.CHANGE_KEYWORDS)
      throw new Error(
        `Invalid event: expected "${EventType.CHANGE_KEYWORDS}", got "${event.type}"`
      );
    return event.value;
  },
});

const stateMachine = createMachine<Context, Event, State>(config, {
  actions: {
    changeUsername,
    changeKeywords,
  },
});

export const stateService = interpret(stateMachine);
stateService.start();

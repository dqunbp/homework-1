import Head from "next/head";

import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { Button } from "@chakra-ui/button";
import { Box, Code, Heading, Stack } from "@chakra-ui/layout";

interface ToggleContext {
  count: number;
}

const toggleMachine = createMachine<ToggleContext>({
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

export default function Home() {
  const [current, send] = useMachine(toggleMachine);
  const active = current.matches("active");
  const { count } = current.context;

  return (
    <Box
      h="100vh"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Egghead portfolio state management club homework#1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Stack spacing="8">
        <Heading as="h1" size="2xl">
          Hello egghead state management club
        </Heading>
        <Heading as="h2" size="xl">
          XState React Template
        </Heading>
        <Button onClick={() => send("TOGGLE")}>
          Click me ({active ? "✅" : "❌"})
        </Button>{" "}
        <Code>
          Toggled <strong>{count}</strong> times
        </Code>
      </Stack>
    </Box>
  );
}

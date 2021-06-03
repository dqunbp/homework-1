import Head from "next/head";
import Image from "next/image";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { Button } from "@chakra-ui/button";
import { Box, Code, Heading, Stack } from "@chakra-ui/layout";

import config from "../public/app-config.json";
// import logo from ""

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
      h="full"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Head>
        <title>{config.title || ""}</title>
        <meta
          name="description"
          content="Egghead portfolio state management club homework#1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Stack spacing="12">
        <Box textAlign="center">
          {config.heading && (
            <Heading as="h1" size="2xl">
              {config.heading}
            </Heading>
          )}
          {config.description && (
            <Heading as="h2" size="lg" mt="8">
              {config.description}
            </Heading>
          )}
        </Box>
        <Button onClick={() => send("TOGGLE")}>
          Click me ({active ? "✅" : "❌"})
        </Button>{" "}
        <Code>
          Toggled <strong>{count}</strong> times
        </Code>
        <Box textAlign="center">
          <Image src="/logo.png" width={372} height={100} />
        </Box>
      </Stack>
    </Box>
  );
}

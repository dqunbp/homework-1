import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/button";
import { Box, Code, Heading, Stack } from "@chakra-ui/layout";

import { useService } from "@xstate/react";

import config from "../public/app-config.json";

import UserForm from "../components/user-form";
import DomainForm from "../components/domain-form";
import Progress from "../components/progress";

export default function App() {
  return (
    <Box h="full" w="full">
      <Head>
        <title>{config.title || ""}</title>
        <meta
          name="description"
          content="Egghead portfolio state management club homework#1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Box h="full" mx="auto" px={[5, 8]} maxW={["full", "48rem"]}>
        <Stack h="full" spacing="8" mt={[8, 16]}>
          <Box textAlign="center">
            {config.heading && (
              <Heading as="h1" size="2xl">
                {config.heading}
              </Heading>
            )}
            {config.description && (
              <Heading as="p" size="md" mt="8">
                {config.description}
              </Heading>
            )}
          </Box>
          <UserForm />
          <DomainForm />
          <Progress />
          <Button size="lg" flexShrink={0}>
            Submit
          </Button>
          <Box textAlign="center">
            <Image src="/logo.png" width={372} height={100} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";

const ProgressItem: React.FC<{ text: string; completed?: boolean }> = ({
  text,
  completed = false,
}) => {
  return (
    <Stack isInline alignItems="center">
      <CheckCircleIcon color={completed ? "green.500" : "gray.400"} />
      <Text>{text}</Text>
    </Stack>
  );
};

const Progress: React.FC = () => {
  return (
    <Box>
      <Stack spacing={2}>
        {/* <Heading as="h5" size="sm">Progress</Heading> */}
        <ProgressItem text="Username filled" />
        <ProgressItem text="Keywords listed" />
        <ProgressItem text="Domain name selected" />
      </Stack>
    </Box>
  );
};

export default Progress;

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const DomainForm: React.FC = () => {
  return (
    <Box>
      <FormControl id="company-name">
        <FormLabel>Company name</FormLabel>
        <Input type="text" />
        <FormHelperText>
          How would you like to name your company?
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DomainForm;

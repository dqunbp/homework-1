import {
  Input,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useService } from "@xstate/react";
import CreatableSelect from "react-select/creatable";

import { stateService } from "../lib/state";
import keywords from "../public/keywords.json";

const options = keywords.map((keyword) => ({ label: keyword, value: keyword }));

const UserForm: React.FC = () => {
  const handleChange = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  return (
    <Stack spacing={8}>
      <FormControl id="user-name">
        <FormLabel>Your name</FormLabel>
        <Input type="text" />
        <FormHelperText>Please enter your name</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Business keywords</FormLabel>
        <CreatableSelect
          inputId="keywords"
          name="keywords"
          isMulti
          styles={{
            control: (styles) => ({
              ...styles,
              height: "40px",
              borderColor: "inherit",
            }),
          }}
          options={options}
          onChange={handleChange}
        />
        <FormHelperText>
          Specify keywords related to your business, you can add your own if
          there are no suitable ones in the list
        </FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default UserForm;

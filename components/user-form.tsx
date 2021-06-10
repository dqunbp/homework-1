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

import { EventType, stateService, KeywordOptions } from "../lib/state";
import keywords from "../public/keywords.json";

const options: KeywordOptions = keywords.map((keyword) => ({
  label: keyword,
  value: keyword,
}));

const UserForm: React.FC = () => {
  const [state, send] = useService(stateService);

  const handleChange = (newValue: any, actionMeta: any) => {
    console.log(newValue);
    console.log(actionMeta);
  };

  return (
    <Stack spacing={8}>
      <FormControl id="user-name">
        <FormLabel>Your name</FormLabel>
        <Input
          type="text"
          value={state.context.username}
          onChange={(e) =>
            send({ type: EventType.CHANGE_USERNAME, value: e.target.value })
          }
        />
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
          onChange={(value) => send({ type: EventType.CHANGE_KEYWORDS, value })}
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

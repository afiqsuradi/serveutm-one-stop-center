import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { InquiryFormStruct, InquiryFormStructResolver } from "../types/inquiry";
import usePostInquiry from "../hooks/usePostInquiry";

const InquiryForm = () => {
  const { post, isLoading } = usePostInquiry();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryFormStruct>({ resolver: InquiryFormStructResolver });
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => {
        try {
          void post(data);
          reset();
        } catch (error) {
          // a
        }
      })}
    >
      <VStack spacing={5}>
        <FormControl id="name">
          <FormLabel>Your Name</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement pointerEvents="none">
              <BsPerson color="gray.800" />
            </InputLeftElement>
            <Input type="text" size="md" required {...register("name")} />
          </InputGroup>
          {errors.name ? (
            <FormHelperText textColor={"red"}>
              {errors.name.message}
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl id="email">
          <FormLabel>Mail</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement pointerEvents="none">
              <MdOutlineEmail color="gray.800" />
            </InputLeftElement>
            <Input type="text" size="md" required {...register("email")} />
          </InputGroup>
          {errors.email ? (
            <FormHelperText textColor={"red"}>
              {errors.email.message}
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl id="message">
          <FormLabel>Message</FormLabel>
          <Textarea
            {...register("message")}
            borderColor="gray.300"
            _hover={{
              borderRadius: "gray.300",
            }}
            placeholder="message"
            required
            minLength={10}
          />
          {errors.message ? (
            <FormHelperText textColor={"red"}>
              {errors.message.message}
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl id="name" float="right">
          <Button
            variant="solid"
            bg="#0D74FF"
            type="submit"
            isLoading={isLoading}
            color="white"
            _hover={{}}
          >
            Send Message
          </Button>
        </FormControl>
      </VStack>
    </form>
  );
};

export default InquiryForm;

import {
  Textarea,
  Flex,
  Stack,
  Avatar,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { ChangeEvent, useReducer } from "react";
import { FeedItemProps } from "../types/index";
import colors from "../utils/colors";
// import { useStore, api } from "../utils/stores";

type TweetProps = {
  user: FeedItemProps;
  closeModal?: Function | null;
};

type TweetState = {
  btnIsDisabled: boolean;
  tweetContent: string;
  charCount: number;
};

const tweetState: TweetState = {
  btnIsDisabled: true,
  tweetContent: "",
  charCount: 0,
};

export function addNewTweet(
  user: FeedItemProps,
  message: string,
  tweets: FeedItemProps[]
): FeedItemProps[] {
  let empty: FeedItemProps[] = [];
  if (!tweets) return empty;

  let newTweets = [...tweets];
  let newTweet: FeedItemProps = {
    ...user,
    content: message,
  };
  newTweets.unshift(newTweet);
  return newTweets;
}

export function Tweet({ user, closeModal = null }: TweetProps) {
  //   const [state, dispatch] = useReducer(tweetReducer, tweetState);

  //   let tweets = useStore((state) => state.json);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // e.preventDefault();
    // let inputValue = e.target.value;
    // dispatch({ type: "HANDLE_TWEET_CHANGE", tweetValue: inputValue });
  };

  const submitTweet = () => {
    // if (!state.btnIsDisabled && user) {
    //   let newTweets = addNewTweet(user, state.tweetContent, tweets);
    //   api.setState({ json: newTweets });
    //   dispatch({ type: "SUBMIT_TWEET" });
    // }
  };

  return (
    <Flex
      direction="column"
      border={1}
      borderColor={colors.border}
      borderStyle="solid"
      boxSizing="content-box"
    >
      <HStack margin={2} p={2}>
        <Avatar src={user.avatarSrc} />
        <Textarea
          placeholder="What's happening?"
          resize="none"
          bg={colors.bg}
          color={colors.text}
          onChange={handleInputChange}
          value={"yo"}
        ></Textarea>
      </HStack>
      <Stack margin={2}>
        <Box color={colors.tweetCounterOk} alignSelf="flex-end">
          {69}
        </Box>
        <Button
          colorScheme="blue"
          variant="solid"
          alignSelf="flex-end"
          isDisabled={false}
          onClick={() => {
            submitTweet();
            if (closeModal) closeModal();
          }}
        >
          Tweet
        </Button>
      </Stack>
    </Flex>
  );
}

type TweetModalProps = {
  user: FeedItemProps;
};

export function TweetModal({ user }: TweetModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="lg"
        onClick={onOpen}
        colorScheme={colors.button}
        variant="solid"
        marginTop={10}
        width="100%"
        rounded="20px"
      >
        Tweet
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader color={colors.text} backgroundColor={colors.bg}>
              Tweet
            </ModalHeader>
            <ModalCloseButton color={colors.text} />
            <ModalBody backgroundColor={colors.bg}>
              <Tweet user={user} closeModal={onClose} />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

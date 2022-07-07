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
  Input,
  Container,
  AspectRatio,
  forwardRef,
  BoxProps,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
// import { NFTStorage, File } from "nft.storage";
import { ChangeEvent, useReducer, useState } from "react";
import { FeedItemProps } from "../types/index";
import colors from "../utils/colors";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { first, second, third } from "../utils/tweet-image-helper";

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

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundImage={`url("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg")`}
      {...props}
      ref={ref}
    />
  );
});

const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

export function Tweet({ user, closeModal = null }: TweetProps) {
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target.files?.length) {
      return;
    }
    console.log(typeof e.target.files[0]);
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const submitTweet = async () => {
    const added = await client.add(image, {
      progress: (prog) => {
        console.log(`received ${prog}`), setLoading(true);
      },
    });

    if (added.path) {
      setLoading(false);
    }

    console.log(added);
    return;
  };
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();

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
        <Container my="12">
          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <AspectRatio
              width={{ base: "100%", md: "60%" }}
              ratio={{ base: 1, md: 4 / 3 }}
            >
              <Box
                borderColor="gray.300"
                borderStyle="dashed"
                borderWidth="2px"
                rounded="md"
                shadow="sm"
                role="group"
                transition="all 150ms ease-in-out"
                _hover={{
                  shadow: "md",
                }}
                as={motion.div}
                initial="rest"
                animate="rest"
                whileHover="hover"
              >
                <Box position="relative" height="100%" width="100%">
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                  >
                    <Stack
                      height="100%"
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justify="center"
                      // spacing="1"
                    >
                      <Box height="16" width="12" position="relative">
                        <PreviewImage
                          variants={first}
                          backgroundImage="url('https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg')"
                        />
                        <PreviewImage
                          variants={second}
                          backgroundImage="url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2628&q=80')"
                        />
                        <PreviewImage
                          variants={third}
                          backgroundImage={`url("https://images.unsplash.com/photo-1563612116625-3012372fccce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2480&q=80")`}
                        />
                      </Box>
                      <Stack textAlign="end" spacing="1">
                        <Heading
                          fontSize={["sm", "lg"]}
                          color="gray.700"
                          fontWeight="bold"
                        >
                          Drop images here
                        </Heading>
                      </Stack>
                    </Stack>
                  </Box>
                  <Input
                    type="file"
                    height="100%"
                    width="100%"
                    position="absolute"
                    top="0"
                    left="0"
                    opacity="0"
                    aria-hidden="true"
                    accept="image/*"
                    onDragEnter={startAnimation}
                    onDragLeave={stopAnimation}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Box>
              </Box>
            </AspectRatio>
          )}
        </Container>
        <Flex>
          <Button
            size="lg"
            onClick={() => submitTweet()}
            colorScheme={colors.button}
            variant="solid"
            marginTop={10}
            width="100%"
            rounded="20px"
          >
            Tweet
          </Button>
        </Flex>
      </HStack>
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

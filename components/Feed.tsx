import {
  List,
  ListItem,
  Box,
  Stack,
  Text,
  Avatar,
  Flex,
  Spinner,
  Image,
} from "@chakra-ui/react";
import colors from "../utils/colors";
import { FeedItemProps, IFeedTweet } from "../types";
import { useEffect, useState } from "react";
import { usePostContext } from "../context/PostContext";
const initTweet: IFeedTweet[] = [
  {
    ipfs: "https://images.unsplash.com/photo-1563612116625-3012372fccce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2480&q=80",
    address: "0x0",
  },
  {
    ipfs: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2628&q=80",
    address: "0x1",
  },
];

type FeedProps = {
  user: FeedItemProps;
  isProfile?: boolean;
};

export const Feed = ({ user, isProfile = false }: FeedProps) => {
  const [tweets, setTweets] = useState<IFeedTweet[]>(initTweet);
  const { getSocialMediaContract } = usePostContext();

  const fetchPostsFromBlockchain = async () => {
    const socialMediaContract = getSocialMediaContract();
    const allPosts = await socialMediaContract.allPosts();
    console.log(allPosts);
    // const reformedPosts: IFeedTweet[] = allPosts.forEach((post) => {ipfsLink: post.ipfsLink, address: post.posterAddress})
    const reformedPosts: IFeedTweet[] = allPosts.map((post) => {
      return { ipfs: post.ipfsLink, address: post.posterAddress };
    });
    setTweets(reformedPosts);
  };
  useEffect(() => {
    fetchPostsFromBlockchain();
  }, []);
  return (
    <List
      borderBottom={`1px solid`}
      borderColor={colors.border}
      minWidth="100%"
    >
      {tweets.map((tweet, i) => (
        <FeedItem
          key={`${i}`}
          // avatarSrc={tweet.avatarSrc}
          // content={tweet.content}
          // handle={tweet.handle}
          // name={tweet.name}
          // uuid={tweet.uuid}
          ipfs={tweet.ipfs}
          address={tweet.address}
        />
      ))}
    </List>
  );
};
const FeedItem = ({ ipfs, address }: FeedItemProps) => {
  return (
    <ListItem overflowWrap="anywhere">
      <Box
        boxSizing="content-box"
        borderTop="1px solid"
        borderLeft="1px solid"
        borderRight="1px solid"
        borderColor={colors.border}
        minWidth="80%"
        minHeight={100}
      >
        <Flex padding={5}>
          <Avatar />
          <Stack spacing={0} marginLeft={5}>
            <Stack isInline spacing={3}>
              <Box
                borderWidth="3px"
                borderRadius="lg"
                px={1}
                borderColor="blue.900"
                bgColor="gray.900"
              >
                <Text color="gray.400">{address}</Text>
              </Box>
            </Stack>
            <Box py={5}>
              <Image
                // boxSize={["200px", "300px", "400px"]}
                maxW="90%"
                src={`https://ipfs.io/ipfs/${ipfs}`}
                alt="Dan Abramov"
              />
            </Box>
          </Stack>
        </Flex>
      </Box>
    </ListItem>
  );
};

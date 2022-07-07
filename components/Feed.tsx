import {
  List,
  ListItem,
  Box,
  Stack,
  Text,
  Avatar,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { addNewTweet } from "../components/Tweet";
import colors from "../utils/colors";
// import { fetchUser, createFeedItem, fetchQuote } from "../utils/helpers";
import { useEffect } from "react";
import { FeedItemProps } from "../types";
// import { useStore, api } from "../utils/stores";

// avatarSrc: string;
// name: string;
// handle: string;
// content?: string;
// uuid?: string;
let tweets = [
  {
    avatarSrc: "https://i.pravatar.cc/300",
    name: "Adam",
    handle: "Adam69",
    content: "Yo mum",
    uuid: "2",
  },
  {
    avatarSrc: "https://i.pravatar.cc/300",
    name: "Shrrom",
    handle: "Shroom69",
    content: "Yo mum 69",
    uuid: "3",
  },
];

type FeedProps = {
  user: FeedItemProps;
  isProfile?: boolean;
};

export const Feed = ({ user, isProfile = false }: FeedProps) => {
  return (
    <List
      borderBottom={`1px solid`}
      borderColor={colors.border}
      minWidth="100%"
    >
      {!isProfile
        ? tweets.map((tweet) => (
            <FeedItem
              key={`${tweet.uuid}-${Math.random()}`}
              avatarSrc={tweet.avatarSrc}
              content={tweet.content}
              handle={tweet.handle}
              name={tweet.name}
              uuid={tweet.uuid}
            />
          ))
        : tweets
            .filter((tweet) => tweet.handle === user?.handle)
            .map((tweet) => (
              <FeedItem
                key={`${tweet.uuid}-${Math.random()}`}
                avatarSrc={tweet.avatarSrc}
                content={tweet.content}
                handle={tweet.handle}
                name={tweet.name}
                uuid={tweet.uuid}
              />
            ))}
    </List>
  );
};
const FeedItem = ({ avatarSrc, name, handle, content }: FeedItemProps) => {
  return (
    <ListItem overflowWrap="anywhere">
      <Box
        boxSizing="content-box"
        borderTop="1px solid"
        borderLeft="1px solid"
        borderRight="1px solid"
        borderColor={colors.border}
        minWidth="100%"
        minHeight={100}
      >
        <Flex padding={5}>
          <Avatar name={name} src={avatarSrc} />
          <Stack spacing={0} marginLeft={5}>
            <Stack isInline spacing={3}>
              <Text color={colors.text}>{name}</Text>
              <Text color="gray.400">{handle}</Text>
            </Stack>
            <Text color={colors.text} marginTop={3}>
              {content}
            </Text>
          </Stack>
        </Flex>
      </Box>
    </ListItem>
  );
};

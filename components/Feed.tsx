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
import { FeedItemProps } from "../types";
// import Image from "next/image";
let tweets = [
  {
    avatarSrc: "https://i.pravatar.cc/300",
    name: "Adam",
    handle: "Adam69",
    content:
      "https://images.unsplash.com/photo-1563612116625-3012372fccce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2480&q=80",
    uuid: "2",
  },
  {
    avatarSrc: "https://i.pravatar.cc/300",
    name: "Shrrom",
    handle: "Shroom69",
    content:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2628&q=80",
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
            <Box py={5}>
              <Image
                boxSize={["200px", "300px", "400px"]}
                src={content}
                alt="Dan Abramov"
              />
            </Box>
          </Stack>
        </Flex>
      </Box>
    </ListItem>
  );
};

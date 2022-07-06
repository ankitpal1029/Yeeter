import Head from "next/head";
import { ReactNode } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { Menu } from "../components/Menu";
import { UserLogout } from "../components/UserLogout";
import { TweetModal } from "./Tweet";
import { FeedItemProps } from "../types";

type LayoutProps = {
  user: FeedItemProps;
  children: ReactNode;
};

export const Layout = ({ user, children }: LayoutProps) => {
  return (
    <Flex
      className="main-container"
      justifyContent={{ base: "flex-start", sm: "center" }}
      mt={2}
    >
      <Flex
        className="layout-container"
        justifyContent="center"
        maxW={1200}
        w="100%"
      >
        <VStack
          className="menu-stack"
          display={{ base: "none", sm: "block" }}
          flex={1}
          marginRight={55}
        >
          <Box position="fixed" marginLeft={5}>
            <Menu />
            <TweetModal user={user} />
            <Box pos="fixed" bottom={0}>
              <UserLogout user={user} />
            </Box>
          </Box>
        </VStack>
        <Box flex={3}>
          <Head>
            <title>Social Media</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>{children}</main>
        </Box>
      </Flex>
    </Flex>
  );
};

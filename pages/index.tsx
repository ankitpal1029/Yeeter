import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Container, Flex } from "@chakra-ui/react";
import { Menu } from "../components/Menu";
import { Layout } from "../components/Layout";
import { Tweet } from "../components/Tweet";
import { FeedItemProps } from "../types";
import { Feed } from "../components/Feed";

// export type FeedItemProps = {
//   avatarSrc: string;
//   name: string;
//   handle: string;
//   content?: string;
//   uuid?: string;
// };

const User: FeedItemProps = {
  ipfs: "",
  address: "",
};

const Home: NextPage = () => {
  return (
    <Layout user={User}>
      <Tweet user={User} />
      <Feed user={User} />
    </Layout>
  );
};

export default Home;

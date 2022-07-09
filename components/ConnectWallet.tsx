import { Stack, Avatar, Button, Text } from "@chakra-ui/react";
import colors from "../utils/colors";
import { FeedItemProps } from "../types";
import { usePostContext } from "../context/PostContext";
import { shortAddress } from "../utils/shorten-address";

type ConnectWalletProps = {
  user: FeedItemProps;
};

export const ConnectWallet = ({ user }: ConnectWalletProps) => {
  const { connectWallet, connectedAccount, getSocialMediaContract, isLoading } =
    usePostContext();

  return (
    <Stack marginBottom={2} justifyContent="center">
      <Stack isInline>
        <Avatar src={user.avatarSrc} />
        <Stack>
          <Text color={colors.text}>{user.name}</Text>
          <Text color={colors.text}>{user.handle}</Text>
        </Stack>
      </Stack>
      {connectedAccount ? (
        <Button colorScheme={colors.button}>
          {shortAddress(connectedAccount)}
        </Button>
      ) : (
        <Button onClick={() => connectWallet()} colorScheme={colors.button}>
          Connect Wallet
        </Button>
      )}
    </Stack>
  );
};

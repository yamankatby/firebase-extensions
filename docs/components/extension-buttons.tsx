import { Button, HStack, Tooltip } from "@chakra-ui/react";
import { githubUrl } from "../pages/_app";

export default function ExtensionButtons({
  extensionName,
}: {
  extensionName: string;
}) {
  return (
    <HStack spacing={8} className="not-prose">
      <Button
        size="lg"
        colorScheme="brand"
        as="a"
        href={`https://console.firebase.google.com/project/_/extensions/install?ref=yaman/${extensionName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Install in Console
      </Button>

      <Tooltip label="View Source Code on GitHub" openDelay={600}>
        <Button
          size="lg"
          variant="link"
          as="a"
          colorScheme="brand"
          href={`${githubUrl}/tree/main/packages/${extensionName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </Button>
      </Tooltip>
    </HStack>
  );
}

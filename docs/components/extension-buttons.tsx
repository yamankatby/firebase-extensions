import { Button, HStack, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { githubUrl } from "../pages/_app";

export default function ExtensionButtons({
  extensionName,
  sourceCode = true,
}: {
  extensionName: string;
  sourceCode?: boolean;
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

      {sourceCode ? (
        <Tooltip label="View Source Code on GitHub" openDelay={600}>
          <Button
            size="lg"
            variant="link"
            colorScheme="brand"
            as="a"
            href={`${githubUrl}/tree/main/packages/${extensionName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </Button>
        </Tooltip>
      ) : (
        <Button
          size="lg"
          variant="link"
          colorScheme="brand"
          as={Link}
          href={extensionName}
        >
          Documentation
        </Button>
      )}
    </HStack>
  );
}

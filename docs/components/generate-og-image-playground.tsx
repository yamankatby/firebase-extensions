import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

const fnUrl =
  "https://us-central1-hello-extensions.cloudfunctions.net/ext-generate-og-image-api";

export default function Example() {
  const [width, setWidth] = useState(680);
  const [height, setHeight] = useState(356);
  const [emojiProvider, setEmojiProvider] = useState<"system" | "twemoji">(
    "twemoji"
  );
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [cacheControl, setCacheControl] = useState(
    "public, immutable, no-transform, max-age=31536000"
  );

  const generateUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.set("width", width.toString());
    params.set("height", height.toString());
    params.set("emoji", emojiProvider);
    params.set("format", format);
    params.set("cacheControl", cacheControl);
    return `${fnUrl}?${params.toString()}`;
  }, [width, height, emojiProvider, format, cacheControl]);

  const [url, setUrl] = useState(generateUrl());

  return (
    <div className="not-prose mt-12 bg-gray-100 border w-full aspect-video rounded-lg relative flex items-center justify-center">
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="Configure"
            icon={<Cog6ToothIcon className="w-6" />}
            color="white"
            bgColor="#1967d2"
            _hover={{ bgColor: "#165fc2" }}
            _active={{ bgColor: "#1251a6" }}
            borderRadius={30}
            position="absolute"
            top={8}
            right={-5}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton mt={2.5} />
          <PopoverHeader>Configuration</PopoverHeader>
          <PopoverBody
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              setUrl(generateUrl());
            }}
          >
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Width</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    min={100}
                    max={1200}
                    step={1}
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                  />
                  <InputRightAddon children="px" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Height</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    min={100}
                    max={1200}
                    step={1}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                  />
                  <InputRightAddon children="px" />
                </InputGroup>
              </FormControl>
            </HStack>
            <FormControl mt={4}>
              <FormLabel>Emoji Provider</FormLabel>
              <Select
                value={emojiProvider}
                onChange={(e) => setEmojiProvider(e.target.value as any)}
              >
                <option value="system">
                  System (only for testing on the emulator)
                </option>
                <option value="twemoji">Twemoji</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image Format</FormLabel>
              <RadioGroup value={format} onChange={setFormat as any}>
                <HStack spacing={4}>
                  <Radio value="jpeg">JPEG</Radio>
                  <Radio value="png">PNG</Radio>
                  <Radio value="webp">WebP</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cache-Control header</FormLabel>
              <Input
                value={cacheControl}
                onChange={(e) => setCacheControl(e.target.value)}
              />
            </FormControl>
            <Button mt={4} mb={2} type="submit">
              Generate
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <img src={url} alt="Generated image" />
    </div>
  );
}

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
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
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { Cog6ToothIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import { forwardRef } from "@chakra-ui/react";

const MyTooltip = forwardRef(({ label, ...other }, ref) => (
  <Tooltip label={label} openDelay={600}>
    <IconButton ref={ref} {...(other as any)} />
  </Tooltip>
));

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

  const [title, setTitle] = useState(
    "A Firebase Extension for generating OG images dynamically 🔥"
  );
  const [color, setColor] = useState("#000000");
  const [bgcolor, setBgcolor] = useState("#ffffff");

  const generateUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.set("width", width.toString());
    params.set("height", height.toString());
    params.set("emoji", emojiProvider);
    params.set("format", format);
    params.set("cacheControl", cacheControl);

    params.set("template", "test");

    params.set("title", title);
    params.set("color", color);
    params.set("bgcolor", bgcolor);

    return `${fnUrl}?${params.toString()}`;
  }, [
    width,
    height,
    emojiProvider,
    format,
    cacheControl,
    title,
    color,
    bgcolor,
  ]);

  const [url, setUrl] = useState(generateUrl());

  return (
    <div className="not-prose mt-12 bg-gray-100 border w-full aspect-video rounded-lg relative flex items-center justify-center flex-col">
      <VStack position="absolute" top={8} right={-5} spacing={6}>
        <Popover>
          <PopoverTrigger>
            <MyTooltip
              label="Customize template's parameters"
              aria-label="Params"
              icon={<WrenchIcon className="w-6" />}
              colorScheme="brand"
              borderRadius={30}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton mt={2.5} />
            <PopoverHeader>Params</PopoverHeader>
            <PopoverBody
              as="form"
              onSubmit={(e) => {
                e.preventDefault();
                setUrl(generateUrl());
              }}
            >
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Hello, World!"
                />
                <FormHelperText>You can use Markdown syntax.</FormHelperText>
              </FormControl>
              <HStack mt={4}>
                <FormControl>
                  <FormLabel>Text</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <div
                        className="relative w-5 h-5 rounded-full border"
                        style={{ backgroundColor: color }}
                      >
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </InputLeftElement>
                    <Input
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Background</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <div
                        className="relative w-5 h-5 rounded-full border"
                        style={{ backgroundColor: bgcolor }}
                      >
                        <input
                          type="color"
                          value={bgcolor}
                          onChange={(e) => setBgcolor(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </InputLeftElement>
                    <Input
                      value={bgcolor}
                      onChange={(e) => setBgcolor(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </HStack>
              <Button mt={4} type="submit">
                Generate
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <MyTooltip
              label="Configure output image settings"
              aria-label="Configure"
              icon={<Cog6ToothIcon className="w-6" />}
              colorScheme="brand"
              borderRadius={30}
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
                    <InputRightAddon>px</InputRightAddon>
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
                    <InputRightAddon>px</InputRightAddon>
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
                  <option disabled>Fluent Emoji (coming soon)</option>
                  <option disabled>Fluent Emoji Flat (coming soon)</option>
                  <option disabled>Noto Emoji (coming soon)</option>
                  <option disabled>Blobmoji (coming soon)</option>
                  <option disabled>OpenMoji (coming soon)</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image Format</FormLabel>
                <RadioGroup
                  value={format}
                  onChange={setFormat as any}
                  colorScheme="brand"
                >
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
      </VStack>
      <img src={url} alt="Generated image" />
    </div>
  );
}

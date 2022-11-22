import chrome from "chrome-aws-lambda";

const isDev = process.env.FUNCTIONS_EMULATOR;

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

const getOptions = async (): Promise<Options> => {
  if (isDev) {
    return {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
};

export default getOptions;

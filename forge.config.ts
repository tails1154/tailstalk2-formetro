import { MakerMSIX } from "@electron-forge/maker-msix";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

const APP_NAME = "TailsTalk 2";
const APP_EXECUTABLE = "tailstalk2-metro";
const PUBLISHER = "CN=TAILSTALK2-METRO-DEV";

const signing = process.env.MSIX_CERT_PATH
  ? {
      windowsSignOptions: {
        certificateFile: process.env.MSIX_CERT_PATH,
        certificatePassword: process.env.MSIX_CERT_PASSWORD,
      },
    }
  : {};

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: APP_NAME,
    executableName: APP_EXECUTABLE,
    icon: "assets/desktop/icon",
  },
  rebuildConfig: {},
  makers: [
    new MakerMSIX({
      packageAssets: "assets/appx",
      packageName: "TailsTalk2-Metro",
      manifestVariables: {
        appDisplayName: APP_NAME,
        appExecutable: `${APP_EXECUTABLE}.exe`,
        packageBackgroundColor: "#1e1f22",
        packageDescription: "TailsTalk 2 chat for Windows",
        packageDisplayName: APP_NAME,
        packageIdentity: "Tailstalk2Metro",
        packageMaxOSVersionTested: "10.0.26100.0",
        packageMinOSVersion: "10.0.19041.0",
        packageVersion: "1.0.0.0",
        publisher: PUBLISHER,
        publisherDisplayName: APP_NAME,
        targetArch: "x64",
      },
      ...signing,
    }),
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: "src/main.ts",
          config: "vite.main.config.ts",
          target: "main",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts",
          target: "preload",
        },
      ],
      renderer: [],
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;

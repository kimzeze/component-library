import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
  ],
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  // 기본 스토리 비활성화
  refs: {
    "configure-your-project": { disable: true },
  },
  // Vite 최적화 설정 추가
  viteFinal: (config) => {
    if (config.optimizeDeps) {
      config.optimizeDeps.exclude = [
        ...(config.optimizeDeps.exclude || []),
        "@storybook/blocks",
        "@storybook/addon-docs",
      ];
    } else {
      config.optimizeDeps = {
        exclude: ["@storybook/blocks", "@storybook/addon-docs"],
      };
    }
    return config;
  },
};
export default config;

import React from "react";

export const createMockIcon = (name: string) =>
  function MockIcon() {
    return React.createElement("svg", {
      "data-testid": `icon-${name}`,
    });
  };

export const icons = new Proxy(
  {},
  {
    get: (_target, prop: string) => createMockIcon(String(prop)),
  },
);

export default icons;

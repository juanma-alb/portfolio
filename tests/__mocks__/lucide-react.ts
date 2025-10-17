export const createMockIcon = (name: string) =>
  function MockIcon() {
    return <svg data-testid={`icon-${name}`} />;
  };

export const icons = new Proxy(
  {},
  {
    get: (_, prop: string) => createMockIcon(prop),
  },
);

export default icons;

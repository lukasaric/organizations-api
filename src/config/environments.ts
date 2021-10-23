const environments = [
  'production',
  'development'
] as const;

export type Environment = typeof environments[number];
export default environments;

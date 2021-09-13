const environments = [
  'production',
  'staging',
  'dev',
  'development',
  'dev-local',
  'test'
] as const;

export type Environment = typeof environments[number];
export default environments;

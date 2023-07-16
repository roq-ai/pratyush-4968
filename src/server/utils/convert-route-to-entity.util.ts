const mapping: Record<string, string> = {
  attendances: 'attendance',
  renamedclasses: 'Renamedclass',
  schools: 'school',
  tests: 'test',
  users: 'user',
  videos: 'video',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

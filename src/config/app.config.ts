interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Admin'],
  customerRoles: [],
  tenantRoles: ['Teacher', 'Student', 'Admin', 'Managment', 'Parents'],
  tenantName: 'School',
  applicationName: 'Pratyush',
  addOns: ['file', 'chat', 'notifications'],
};

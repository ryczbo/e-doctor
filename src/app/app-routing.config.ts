export const AppRoutes = {
  DEFAULT: '',
  HOME: 'home',
  REGISTER: 'register',
  LOGIN: 'login',
  REQUEST: 'request',
  EDIT: 'edit',
  404: '**'
};

export const AppRouterLinks = {
  DEFAULT: [AppRoutes.DEFAULT],
  HOME: [AppRoutes.HOME],
  REGISTER: [AppRoutes.REGISTER],
  LOGIN: [AppRoutes.LOGIN],
  REQUEST: [AppRoutes.REQUEST],
  EDIT: [AppRoutes.EDIT],
  404: [AppRoutes['404']]
};

export const AppRouterUrls = {
  DEFAULT: `/${AppRoutes.DEFAULT}`,
  HOME: `/${AppRoutes.HOME}`,
  REGISTER: `/${AppRoutes.REGISTER}`,
  LOGIN: `/${AppRoutes.LOGIN}`,
  REQUEST: `/${AppRoutes.REQUEST}`,
  EDIT: `/${AppRoutes.EDIT}`,
  404: `/${AppRoutes['404']}`
};

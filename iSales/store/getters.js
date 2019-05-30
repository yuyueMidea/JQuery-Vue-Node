const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  localeLanguage: state => state.app.localeLanguage,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  menus: state => state.user.menus,
  setting: state => state.user.setting,
  permissionMenus: state => state.permission.permissionMenus,
  router: state => state.permission.routers,
  routerStatus: state => state.permission.routerStatus,
  menuStatus: state => state.permission.menuStatus,
  errorLogs: state => state.errorLog.logs
}
export default getters

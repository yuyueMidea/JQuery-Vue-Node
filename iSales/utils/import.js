export default function _import(file, viewPath = 'app/views') {
  if (null == file || '' == file) {
    return require(`@/portal/views/errorPage/404.vue`).default
  }

  if (file.substr(0, 1) === '/') {
    file = file.substr(1)
  }

  let filePath = file.substr(0, 1) == '@' ? file.replace('@/', ''):`${viewPath}/${file}`

  if (process.env.NODE_ENV === 'development') {
    try {
      return require(`@/${filePath}.vue`).default
    } catch (err) {
      console.log(err);
      return require(`@/portal/views/errorPage/404.vue`).default
    }
  } else if (process.env.NODE_ENV === 'production') {
    return () => import(`@/${filePath}.vue`)
  }
}

export default (url) => {
  if (url && typeof url === 'string') {
    const pathname = url?.split('.solutions');
    const routes = pathname[1]?.split('/')?.filter((el) => el !== '');
    const result = {};

    if (routes?.length > 1) {
      if (routes.includes('register-course')) {
        routes.forEach((param, paramIndex) => {
          if (param === 'register-course') {
            result['courseToken'] = routes[1];
          } else if (paramIndex === 2) {
            result['courseId'] = routes[2];
          } else if (paramIndex === 3) {
            result['sessionId'] = routes[3];
          }
        });
      } else if (routes.includes('confirm')) {
        const separateIndex = routes[1].indexOf('?');
        if (separateIndex !== -1) {
          result['confirmToken'] = routes[1]?.slice(0, separateIndex);
        } else {
          result['confirmToken'] = routes[1];
        }

        let params;
        if (separateIndex !== -1) {
          const path = routes[1]?.slice(separateIndex + 1);
          params = path?.split('&');
        }

        if (params?.length > 0) {
          params.forEach((param) => {
            const splitParam = param.split('=');
            result[splitParam[0]] = splitParam[1];
          });
        }
      } else if (routes.includes('restore')) {
        const separateIndex = routes[1].indexOf('?');
        if (separateIndex !== -1) {
          result['restoreToken'] = routes[1]?.slice(0, separateIndex);
        } else {
          result['restoreToken'] = routes[1];
        }
      } else {
        for (let i = 0; i < routes?.length; i++) {
          if (routes[i] && routes[i + 1]) {
            result[routes[i]] = routes[i + 1];
          }
          i++;
        }
      }
    } else {
      return null;
    }

    return result;
  }

  return null;
};

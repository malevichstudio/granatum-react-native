import { DEFAULT_LOCALE } from 'app/i18n';
import { getAuthToken } from '../storage';

export const kebabCaseToCamel = (str) =>
  str.replace(/(\/\w)/g, (matches) => matches[1].toUpperCase());

export const hyphenToUnderscore = (str) => str.replace(/-/g, '_');

/**
 * Replace all {id} cases w/ empty string
 * @param {string} name
 * @return {string}
 */
export const modifyName = (name) => name.replace(/({id}\/?)|(\/{id})$/g, '');

export const modifyUrl = (url, id) => url.replace(/{id}/, id);

const getQueryString = (query, forceKey = false) => {
  if (query) {
    return `?${Object.keys(query)
      .map((k) => {
        if (Array.isArray(query[k])) {
          return query[k]
            .map((v) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
        }

        return `${forceKey || encodeURIComponent(k)}=${encodeURIComponent(
          query[k],
        )}`;
      })
      .join('&')}`;
  }
  return '';
};

// @thanks: https://codeburst.io/how-to-call-api-in-a-smart-way-2ca572c6fe86
class API {
  constructor({ url }) {
    // external url is useful for testing
    this.url = url;
    this.endpoints = {};
  }

  /**
   * Create and store a single entity's endpoints
   *
   * If there is a - in the entity.name, then change it
   * to camelCase. E.g
   *
   * myApi.createEntity({ name : 'foo/bar'})
   * myApi.endpoints.fooBar.getAll(...)
   *
   * @param {{ name: string }} entity
   */
  createEntity = (entity) => {
    const modifiedName = entity.id ? modifyName(entity.name) : entity.name;
    const name = `${hyphenToUnderscore(kebabCaseToCamel(modifiedName))}${
      entity.postfix || ''
    }`;
    this.endpoints[name] = this.createBasicCRUDEndpoints(entity);
  };

  createEntities = (arrayOfEntity) => {
    arrayOfEntity.forEach(this.createEntity);
  };

  /**
   * Create the basic endpoints handlers for CRUD operations
   * @params {{ name: string }} entity
   */
  createBasicCRUDEndpoints = ({ name }) => {
    const endpoints = {};
    const resourceURL = `${this.url}/${name}`;

    // get requests w/ id must goes like this:
    // some/path/with/{id}/at/the/middle
    endpoints.get = async ({ id, query } = {}) => {
      const headers = await this.getHeaders();
      return fetch(
        `${id ? modifyUrl(resourceURL, id) : resourceURL}${getQueryString(
          query,
        )}`,
        {
          method: 'GET',
          headers,
          mode: 'cors',
        },
      );
    };

    // endpoints.getAll = ({ query = {} }, config = {}) =>
    //   axios.get(resourceURL, Object.assign({ params: { query }, config }));
    //
    // endpoints.getOne = ({ id }, config = {}) =>
    //   axios.get(`${resourceURL}/${id}`, config);

    endpoints.post = async ({ id, body, isJson = true, query } = {}) =>
      await this.runFetch(
        'POST',
        `${id ? modifyUrl(resourceURL, id) : resourceURL}${getQueryString(
          query,
        )}`,
        body,
        isJson,
      );
    endpoints.put = async ({ urlId, ...payload }) =>
      await this.runFetch(
        'PUT',
        urlId ? modifyUrl(resourceURL, urlId) : resourceURL,
        payload,
      );
    endpoints.patch = async (payload) =>
      await this.runFetch('PATCH', resourceURL, payload);

    endpoints.delete = async ({ id, query, body } = {}) =>
      await this.runFetch(
        'DELETE',
        `${id ? modifyUrl(resourceURL, id) : resourceURL}${getQueryString(
          query,
          'id',
        )}`,
        body,
      );

    return endpoints;
  };

  runFetch = async (method, url, payload, isJson = true) => {
    const headers = await this.getHeaders(isJson);
    return fetch(url, {
      method,
      headers,
      mode: 'cors',
      body: isJson ? JSON.stringify(payload) : payload,
    });
  };

  getHeaders = async (isJson = true) => {
    const accessToken = await getAuthToken();
    const headers = new Headers();

    if (isJson) {
      headers.append('Content-Type', 'application/json');
    }
    headers.append('accept', 'application/json');
    headers.append('Accept-Language', DEFAULT_LOCALE);

    // TODO: check token expiration

    if (typeof accessToken === 'string') {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  };

  downloadFile = async (url) => {
    const headers = new Headers();
    const accessToken = await getAuthToken();
    headers.append(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    if (typeof accessToken === 'string') {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    return fetch(this.url + url, {
      method: 'GET',
      headers,
      mode: 'cors',
    }).then(async (response) => {
      if (!response.ok || response.status !== 200) {
        const json = await response.text();

        if (typeof json === 'string' && json.length) {
          return JSON.parse(json);
        }
        throw new Error(response.statusText);
      }
      return response.blob();
    });
  };
}

export default API;

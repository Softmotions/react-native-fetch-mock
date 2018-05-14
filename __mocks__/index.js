import { Mock } from '../src';

export default {
  '/api/users': ({ params }, response) => {
    const all = [
      {
        name: 'John',
        age: 15,
      },
      {
        name: 'Lily',
        age: 16,
      }
    ];
    let filtered;
    if ('undefined' !== typeof params) {
      filtered = all.filter(item => {
        let result = true;
        const keys = Object.keys(params);
        keys.forEach(key => {
          const param = params[key];

          if (item[key] && item[key] !== param) {
            result = false;
          }
        });

        return result;
      });
    } else {
      filtered = all;
    }

    response.status = 200;
    response.data = filtered;
  },
  '/api/users/mockjs': ({ params }, response) => {
    const all = Mock.mock({
      'list|2': [{
        'id|+1': 1,
        'name': '@first @last',
        'age|18-54': 1,
      }]
    }).list;
    let filtered;
    if ('undefined' !== typeof params) {
      filtered = all.filter(item => {
        let result = true;
        const keys = Object.keys(params);
        keys.forEach(key => {
          const param = params[key];

          if (item[key] && item[key] !== param) {
            result = false;
          }
        });

        return result;
      });
    } else {
      filtered = all;
    }
    response.status = 200;
    response.data = filtered;
  },
  '/api/users/{userId}': ({ urlparams }, response) => {
    response.status = 200;
    response.data = {
      userId: urlparams.userId,
    };
  },
  '/api/users/pru/{userId}': ({ urlparams }, response) => {
    response.data = {
      userId: urlparams.userId,
    };
  },
  'POST /api/users': (request, response) => {
    response.status = 201;
  },
  'PUT /api/users/{userId}': ({ urlparams }, response) => {
    response.status = 204;
    response.data = {
      userId: urlparams.userId,
    };
  }
};

import React from 'react';
import { Router } from 'dva/router';

const cached = {};

function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      name: 'index',
      component: require('./components/app/app'),
      onEnter: () => { location.pathname === '/' ? history.replace('/login') : null },
      getIndexRoute(location, callback) {
        require.ensure([], function (require) {
          callback(null, require('./routes/login'))
        })
      },
      getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
          cb(null, [
            {
              path: 'login',
              name: 'login',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/login'));
                  cb(null, require('./routes/login'));
                });
              }
            },
            {
              path: 'register',
              name: 'register',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/login'));
                  cb(null, require('./routes/register'));
                });
              }
            },
            {
              path: 'forget',
              name: 'forget',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                   registerModel(app, require('./models/login'));
                  cb(null, require('./routes/forget'));
                });
              }
            },
            {
              path: 'agreement',
              name: 'agreement',
              component: require('./components/login/agreement')
            },
            {
              path: 'page',
              name: 'page',
              component: require('./components/app/page'),
              getChildRoutes(partialNextState, cb) {
                  require.ensure([], (require) => {
                    registerModel(app, require('./models/indexPage'));
                    cb(null, [
                      {
                        path: 'indexPage',
                        name: 'indexPage',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/indexPage'));
                            cb(null, require('./routes/indexPage'));
                          });
                        }
                      },
                      {
                        path: 'adList',
                        name: 'adList',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/adList'));
                            cb(null, require('./routes/adList'));
                          });
                        },
                      },
                      {
                        path: 'manageCustomer',
                        name: 'manageCustomer',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/manageCustomer'));
                            cb(null, require('./routes/manageCustomer'));
                          });
                        }
                      },
                      {
                        path: 'editAdvertiser/:id',
                        name: 'editAdvertiser',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/editAdvertiser'));
                            cb(null, require('./routes/editAdvertiser'));
                          });
                        }
                      },
                      {
                        path: 'adData',
                        name: 'adData',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/adData'));
                            cb(null, require('./routes/adData'));
                          });
                        }
                      },
                      {
                        path: 'customerData',
                        name: 'customerData',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/customerData'));
                            cb(null, require('./routes/customerData'));
                          });
                        }
                      },
                      {
                        path: 'financeInfo',
                        name: 'financeInfo',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/financeInfo'));
                            cb(null, require('./routes/financeInfo'));
                          });
                        }
                      },
                      {
                        path: 'financeRecord',
                        name: 'financeRecord',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/financeRecord'));
                            cb(null, require('./routes/financeRecord'));
                          });
                        }
                      },
                      {
                        path: 'allocateBalance',
                        name: 'allocateBalance',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/allocateBalance'));
                            cb(null, require('./routes/allocateBalance'));
                          });
                        }
                      },
                      {
                        path: 'manageBalance',
                        name: 'manageBalance',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/manageBalance'));
                            cb(null, require('./routes/manageBalance'));
                          });
                        }
                      },
                      {
                        path: 'accountInfo',
                        name: 'accountInfo',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/accountInfo'));
                            cb(null, require('./routes/accountInfo'));
                          });
                        }
                      },
                      {
                        path: 'password',
                        name: 'password',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/password'));
                            cb(null, require('./routes/password'));
                          });
                        }
                      },
                      {
                        path: 'manageAccount',
                        name: 'manageAccount',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/manageAccount'));
                            cb(null, require('./routes/manageAccount'));
                          });
                        },
                      },
                      {
                        path: 'createCustomer',
                        name: 'createCustomer',
                        getComponent(nextState, cb) {
                          require.ensure([], (require) => {
                            registerModel(app, require('./models/createCustomer'));
                            cb(null, require('./routes/createCustomer'));
                          });
                        }
                      },
                      {
                        path: 'ad',
                        name: 'ad',
                        getChildRoutes(partialNextState, cb) {
                          require.ensure([], (require) => {
                            cb(null, [
                              {
                                path: 'create',
                                name: 'create',
                                getComponent(nextState, cb) {
                                 require.ensure([], (require) => {
                                  registerModel(app, require('./models/createPlan'));
                                  cb(null, require('./routes/createPlan'));
                                })
                                }
                              },
                              {
                                path: 'detail/:id',
                                name: 'detail',
                                getComponent(nextState, cb) {
                                  require.ensure([], (require) => {
                                    registerModel(app, require('./models/adDetail'));
                                    cb(null, require('./routes/adDetail'));
                                  });
                                }
                              },
                              {
                                path: 'edit/:id',
                                name: 'edit',
                                getComponent(nextState, cb) {
                                  require.ensure([], (require) => {
                                    registerModel(app, require('./models/createPlan'));
                                    cb(null, require('./routes/createPlan'));
                                  });
                                }
                              }
                            ])
                          })
                        }
                      }
                    ])
                  })
                }
            },
            {
              path: '*',
              component: require('./components/404/index')
            }
          ])
        })
      }
    }
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;

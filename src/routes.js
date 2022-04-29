import React, { Suspense, Fragment,lazy} from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./Pages/home/HomePage";
import LoadingScreen from "./components/LoadingScreen";


export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
 
  {
    path: "*",
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: "/",
        component: HomePage,
      },
      {
        exact: true,
        path: "/searchuser",
        component: lazy(() =>
          import("./Pages/home/HomePage/searchuser")
        ),
      },
      {
        exact: true,
        path: "/createaccount",
        component: lazy(() =>
          import("./Pages/home/HomePage/createAccounts")
        ),
      },
     
      {
        exact: true,
        path: "/changeemail",
        component: lazy(() =>
          import("./Pages/home/HomePage/changeEmail")
        ),
      },
      {
        exact: true,
        path: "/account/profil",
        component: lazy(() => import("./Pages/Account/General")),
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

export default routes;
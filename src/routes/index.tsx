import { lazy, Suspense, type FC, type LazyExoticComponent } from "react";
import { type RouteObject } from "react-router-dom";
import { Loader2 } from "lucide-react"

const HomeTemplate = lazy(() => import("@/pages/HomeTemplate"));
const HomePage = lazy(() => import("@/pages/HomeTemplate/HomePage"));
const AuthTemplate = lazy(() => import("@/pages/AuthTemplate"));
const LoginPage = lazy(() => import("@/pages/AuthTemplate/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/AuthTemplate/RegisterPage"));
const CategoryPage = lazy(() => import("@/pages/HomeTemplate/CategoryPage"));
const CourseDetailPage = lazy(() => import("@/pages/HomeTemplate/CourseDetailPage"));

const withSuspense = (Component: LazyExoticComponent<FC>) => {
  return (
    <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          <p className="text-gray-600 text-lg font-medium">
            Đang tải nội dung...
          </p>
        </div>
      </div>
    }
  >
    <Component />
  </Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: withSuspense(HomeTemplate),
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: "danh-muc/:maDanhMuc",
        element: withSuspense(CategoryPage),
      },
      {
        path: "khoa-hoc/:maKhoaHoc",
        element: withSuspense(CourseDetailPage),
      },
    ],
  },
  {
    path: "/auth",
    element: withSuspense(AuthTemplate),
    children: [
      {
        path: "login",
        element: withSuspense(LoginPage),
      },
      {
        path: "register",
        element: withSuspense(RegisterPage),
      }
    ],
  },

  {
    path: "*",
    element: <div>Not Found</div>,
  },
];

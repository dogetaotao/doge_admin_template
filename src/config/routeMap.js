import loadable from "react-loadable"
import loading from "../components/Loading"

const Dashboard = loadable({loader: () => import("../views/dashboard"), loading: loading})
const Doc = loadable({loader: () => import("../views/doc"), loading: loading})
const Guide = loadable({loader: () => import("../views/guide"), loading: loading})
const MixChart = loadable({loader: () => import("../views/charts/mixChart"), loading: loading})
const Line = loadable({loader: () => import("../views/charts/line"), loading: loading})
const KeyBoard = loadable({loader: () => import("../views/charts/keyboard"), loading: loading})
const ExportExcel = loadable({loader: () => import("../views/excel/exportExcel"), loading: loading})
const UploadExcel = loadable({loader: () => import("../views/excel/uploadExcel"), loading: loading})
const MarkDown = loadable({loader: () => import("../views/components-demo/Markdown"), loading: loading})
const RichTextEditor = loadable({loader: () => import("../views/components-demo/richTextEditor"), loading: loading})
const Table = loadable({loader: () => import("../views/table"), loading: loading})
const Zip = loadable({loader: () => import("../views/zip"), loading: loading})
const ShowNotFound = loadable({loader: () => import("../views/404"), loading: loading})
const Permission = loadable({loader: () => import("../views/permission"), loading: loading})
const AdminPage = loadable({loader: () => import("../views/permission/adminPage"), loading: loading})
const EditorPage = loadable({loader: () => import("../views/permission/editorPage"), loading: loading})
const GuestPage = loadable({loader: () => import("../views/permission/guestPage"), loading: loading})
const User = loadable({loader: () => import("../views/user"), loading: loading})
const Nested1 = loadable({loader: () => import("../views/nested/menu1/menu1-1"), loading: loading})
const Nested2 = loadable({loader: () => import("../views/nested/menu1/menu1-2/menu1-2-1"), loading: loading})

export default [
  {path: "dashboard", component: Dashboard, roles: ["admin", "editor", "guest"]},
  {path: "404", component: ShowNotFound, roles: ["admin", "editor", "guest"]},
  {path: "guide", component: Guide, roles: ["admin", "editor", "guest"]},
  {path: "doc", component: Doc, roles: ["admin", "editor", "guest"]},

  {path: "charts/mixchart", component: MixChart, roles: ["admin", "editor"]},
  {path: "charts/line", component: Line, roles: ["admin", "editor"]},
  {path: "charts/keyboard", component: KeyBoard, roles: ["admin", "editor"]},

  {path: "excel/export", component: ExportExcel, roles: ["admin", "editor"]},
  {path: "excel/upload", component: UploadExcel, roles: ["admin", "editor"]},

  {path: "components/markdown", component: MarkDown, roles: ["admin", "editor"]},
  {path: "components/richtexteditor", component: RichTextEditor, roles: ["admin", "editor"]},

  {path: "table", component: Table, roles: ["admin", "editor"]},
  {path: "zip", component: Zip, roles: ["admin", "editor"]},

  {path: "nested/menu1/menu1-1", component: Nested1, roles: ["admin", "editor"]},
  {path: "nested/menu1/menu1-2/menu1-2-1", component: Nested2, roles: ["admin", "editor"]},

  {path: "permission/explanation", component: Permission, roles: ["admin", "editor", "guest"]},
  {path: "permission/adminPage", component: AdminPage, roles: ["admin"]},
  {path: "permission/editorPage", component: EditorPage, roles: ["editor"]},
  {path: "permission/guestPage", component: GuestPage, roles: ["guest"]},
  {path: "user", component: User, roles: ["admin"]},
]

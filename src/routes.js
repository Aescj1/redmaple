import Table from './components/Table.vue'
import Login from './components/Login.vue'
import Workflow from './components/Workflow.vue'
import Geplant from './components/Geplant.vue'
import NgsFormular from './components/NgsFormular.vue'
import Lauf from './components/Lauf.vue'
import Extrahiert from './components/Extrahiert.vue'
import Sequenziert from './components/Sequenziert.vue'
import Admin from'./components/Admin.vue'




export const routes = [
 { path: '/invalid', redirect: '/' },
 { path: '/', component: Login},
 { path: '/table', component: Table},
 { path: '/workflow', component: Workflow},
 { path: '/geplant', component: Geplant},
 { path: '/lauf', component: Lauf},
 { path: '/extrahiert', component: Extrahiert},
 { path: '/sequenziert', component: Sequenziert},
 { path: '/formular', component: NgsFormular},
 { path: '/admin', component: Admin}

];
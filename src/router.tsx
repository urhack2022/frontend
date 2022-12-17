import {createBrowserRouter} from 'react-router-dom'
import { MyUpload } from './screens/upload'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MyUpload />
    },
])


export default router
import { Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { renderProjects } from '../controllers/projects_controller.ts'

const router = new Router()

router.get( '/projects', renderProjects )

export default router
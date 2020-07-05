import { Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { renderIndex } from '../controllers/index_controller.ts'

import { socketHandler } from '../websocket/websocket.ts'

const router = new Router()

// INDEX
router.get( '/', renderIndex )

router.get( '/ws', socketHandler )

// // READ - single element
// router.get('/:goalId', getSingleGoal);
// // CREATE
// router.post('/add-goal', createGoal);
// // UPDATE
// router.post('/update-goal', updateGoal);
// // DELETE
// router.post('/:goalId', deleteGoal);

export default router;
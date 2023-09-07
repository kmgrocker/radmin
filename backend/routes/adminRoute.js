import express from 'express'

import {createAction,getActionById,getAllAction,deleteActionById, updateActionById} from '../controllers/actionController.js'
import { createOrg, deleteOrgById, getAllOrg, getOrgById, updateOrgById } from '../controllers/orgController.js'
import { createuser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/userController.js'
import { createBuisness, deleteBuisnessById, getAllBuisness, getBuisnessById, updateBuisnessById } from '../controllers/buisnessFunctionController.js'
import { createRole, deleteRoleById, getAllRoles, getRoleById, updateRoleById } from '../controllers/roleController.js'

const router = express.Router()

// actions

router.route('/action').post(createAction)
router.route('/action/:id').get(getActionById)
router.route('/actions').get(getAllAction)
router.route('/action/:id').delete(deleteActionById)
router.route('/action/:id').put(updateActionById)

// organizations 
router.route('/org').post(createOrg)
router.route('/org/:id').get(getOrgById)
router.route('/orgs').get(getAllOrg)
router.route('/org/:id').delete(deleteOrgById)
router.route('/org/:id').put(updateOrgById)

// roles
router.route('/role').post(createRole)
router.route('/role/:id').get(getRoleById)
router.route('/roles').get(getAllRoles)
router.route('/role/:id').delete(deleteRoleById)
router.route('/role/:id').put(updateRoleById)

// users
router.route('/user').post(createuser)
router.route('/user/:id').get(getUserById)
router.route('/users').get(getAllUsers)
router.route('/user/:id').delete(deleteUserById)
router.route('/user/:id').put(updateUserById)

// buisness function
router.route('/buisness').post(createBuisness)
router.route('/buisness/:id').get(getBuisnessById)
router.route('/buisness').get(getAllBuisness)
router.route('/buisness/:id').delete(deleteBuisnessById)
router.route('/buisness/:id').put(updateBuisnessById)



export default router
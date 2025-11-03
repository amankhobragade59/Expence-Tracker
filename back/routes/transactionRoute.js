import express from 'express'
import {addTransaction,updateTransaction,deleteTransaction,getTransaction,getOneTransaction} from '../controller/transactionConroller.js'
 const router = express.Router();

 router.get('/',getTransaction);
 router.get('/:id',getOneTransaction);
 router.post('/add',addTransaction);
 router.delete('/delete/:id',deleteTransaction);
 router.put('/update/:id',updateTransaction);

 export default router;
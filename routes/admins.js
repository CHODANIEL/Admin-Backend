const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// 대시보드 통계 (Admin, Staff 모두 접근 가능)
router.get('/stats', protect, authorize('admin', 'staff'), getDashboardStats);

module.exports = router;
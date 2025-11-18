const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    deleteCategory
} = require('../controllers/categoryController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// 1. 조회 (누구나 가능하게 할지, 관리자만 할지 결정)
// 사업자나 유저 앱에서도 목록을 봐야 하므로 보통은 Public으로 둡니다.
// 하지만 여기는 'Admin Backend'이므로 우선 protect를 걸어두겠습니다.
router.get('/', protect, getCategories);

// 2. 생성 (Admin만 가능)
router.post(
    '/',
    protect,
    authorize('admin'),
    createCategory
);

// 3. 삭제 (Admin만 가능)
router.delete(
    '/:id',
    protect,
    authorize('admin'),
    deleteCategory
);

module.exports = router;
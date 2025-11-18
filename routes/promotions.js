const express = require('express');
const router = express.Router();
const {
    createPromotion,
    getAllPromotions,
    deletePromotion
} = require('../controllers/promotionController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// 1. 조회는 로그인 안 해도 가능하게 할지? -> 보통 이벤트 페이지는 누구나 봄
// 하지만 여긴 Admin Backend니까 일단 보호해두겠습니다.
router.get('/', protect, getAllPromotions);

// 2. 생성 및 삭제는 오직 'admin'만 가능
router.post('/', protect, authorize('admin'), createPromotion);
router.delete('/:id', protect, authorize('admin'), deletePromotion);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    createReview,
    getAllReviews,
    toggleReviewVisibility
} = require('../controllers/reviewController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

// 1. (테스트용) 리뷰 생성
router.post('/', authorize('admin'), createReview);

// 2. 리뷰 조회 (CS팀도 봐야 하므로 staff 포함)
router.get('/', authorize('admin', 'staff'), getAllReviews);

// 3. 리뷰 숨김 처리 (관리자 권한)
router.patch('/:id/visibility', authorize('admin'), toggleReviewVisibility);

module.exports = router;
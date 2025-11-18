const express = require('express');
const router = express.Router();
const {
    createBooking,
    getAllBookings,
    updateBookingStatus
} = require('../controllers/bookingController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect); // 아래 모든 라우트는 로그인 필수

// 1. (테스트용) 예약 생성 - Admin만
router.post('/', authorize('admin'), createBooking);

// 2. 전체 예약 조회 - Staff, Admin 모두 가능
router.get('/', authorize('staff', 'admin'), getAllBookings);

// 3. 예약 상태 변경 (취소 등) - Admin만 가능
router.patch('/:id/status', authorize('admin'), updateBookingStatus);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserStatus
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// 모든 라우트에 인증(로그인) 필요
router.use(protect);

// 1. (테스트용) 회원 생성 - Admin만
router.post('/', authorize('admin'), createUser);

// 2. 전체 회원 조회 - Staff, Admin 모두 가능
router.get('/', authorize('staff', 'admin'), getAllUsers);

// 3. 특정 회원 상세 조회 - Staff, Admin 모두 가능
router.get('/:id', authorize('staff', 'admin'), getUserById);

// 4. 회원 상태 변경 (정지) - Admin만 가능 (중요!)
router.patch('/:id/status', authorize('admin'), updateUserStatus);

module.exports = router;
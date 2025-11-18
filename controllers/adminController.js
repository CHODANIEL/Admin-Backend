const User = require('../models/User');
const Partner = require('../models/Partner');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

// 대시보드 통계 데이터 조회
exports.getDashboardStats = async (req, res) => {
    try {
        const [userCount, pendingPartnerCount, bookingCount, reviewCount] = await Promise.all([
            User.countDocuments(), // 전체 유저 수
            Partner.countDocuments({ status: 'pending' }), // 승인 대기중인 파트너 수
            Booking.countDocuments(), // 전체 예약 수
            Review.countDocuments() // 전체 리뷰 수
        ]);

        res.status(200).json({
            userCount,
            pendingPartnerCount,
            bookingCount,
            reviewCount
        });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};
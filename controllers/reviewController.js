const Review = require('../models/Review');

// 1. (테스트용) 리뷰 강제 생성
exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json({ message: '리뷰 작성 성공', review });
    } catch (error) {
        res.status(500).json({ message: '작성 실패', error: error.message });
    }
};

// 2. 전체 리뷰 조회 (필터링: 특정 숙소 리뷰만 보기, 숨긴 리뷰만 보기 등)
exports.getAllReviews = async (req, res) => {
    try {
        const { accommodationId, isVisible } = req.query;
        const filter = {};

        if (accommodationId) filter.accommodation = accommodationId;
        if (isVisible) filter.isVisible = isVisible === 'true'; // 문자열 'true'를 불리언으로 변환

        // 최신순 정렬
        const reviews = await Review.find(filter).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};

// 3. 리뷰 숨김/공개 처리 (관리자 전용)
exports.toggleReviewVisibility = async (req, res) => {
    try {
        const { isVisible, adminComment } = req.body; // true(공개) or false(숨김)

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { isVisible, adminComment },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
        }

        res.status(200).json({
            message: `리뷰 상태가 ${isVisible ? '공개' : '숨김'}로 변경되었습니다.`,
            review
        });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};
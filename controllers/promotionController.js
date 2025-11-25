const Promotion = require('../models/Promotion');

// 1. 프로모션(쿠폰) 생성 - Admin Only
exports.createPromotion = async (req, res) => {
    try {
        const { code } = req.body;

        // 이미 존재하는 쿠폰 코드인지 확인
        if (code) {
            const exists = await Promotion.findOne({ code });
            if (exists) {
                return res.status(400).json({ message: '이미 존재하는 쿠폰 코드입니다.' });
            }
        }

        const promotion = await Promotion.create(req.body);
        res.status(201).json({ message: '프로모션 생성 성공', promotion });
    } catch (error) {
        res.status(500).json({ message: '생성 실패', error: error.message });
    }
};

// 2. 프로모션 목록 조회
exports.getAllPromotions = async (req, res) => {
    try {
        // 활성화된(isActive: true) 것만 보여줄지, 전체 다 보여줄지 결정
        // 관리자는 다 보고 싶을 수 있으니 일단 전체 조회로 둡니다.
        const promotions = await Promotion.find().sort({ createdAt: -1 });
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};

// 3. 프로모션 삭제/비활성화 - Admin Only
exports.deletePromotion = async (req, res) => {
    try {
        await Promotion.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: '프로모션이 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '삭제 실패', error: error.message });
    }
};
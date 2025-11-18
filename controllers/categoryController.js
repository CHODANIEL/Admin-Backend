const Category = require('../models/Category');

// 1. 카테고리 생성 (Admin 전용)
exports.createCategory = async (req, res) => {
    try {
        const { type, name } = req.body;

        // 이미 존재하는지 확인
        const exists = await Category.findOne({ type, name });
        if (exists) {
            return res.status(400).json({ message: `이미 존재하는 ${type}입니다.` });
        }

        const category = await Category.create({ type, name });

        res.status(201).json({
            message: '카테고리가 생성되었습니다.',
            category,
        });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};

// 2. 카테고리 목록 조회 (모두 접근 가능)
// 사용법: /api/categories?type=amenity (편의시설만 조회)
exports.getCategories = async (req, res) => {
    try {
        const query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }

        const categories = await Category.find(query).sort('name'); // 이름순 정렬
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};

// 3. 카테고리 삭제 (Admin 전용)
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);

        res.status(200).json({ message: '카테고리가 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};